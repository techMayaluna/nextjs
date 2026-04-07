import { cache } from "react";
import { cookies } from "next/headers";
import { connectDB } from "./mongoose";
import User from "@/models/users";
import Insurance from "@/models/insurances";
import PlateRestriction from "@/models/plateRestrictions";
import { companiasSeguros } from "./insuranceCompaniesList";

export function getAuthCookie() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) return null;
  try {
    const parsed = JSON.parse(userCookie.value);
    return parsed?.userId ? parsed : null;
  } catch {
    return null;
  }
}

export const getServerUser = cache(async () => {
  const auth = getAuthCookie();
  if (!auth?.userId) return null;

  await connectDB();
  const user = await User.findById(auth.userId).lean();
  if (!user) return null;

  const ciudad = await PlateRestriction.findOne({ _id: user.ciudad }).lean();

  return JSON.parse(
    JSON.stringify({ ...user, ciudad, password: undefined })
  );
});

export const getServerSeguros = cache(async (userId) => {
  if (!userId) return [];
  await connectDB();
  const insurances = await Insurance.find({ idUser: userId }).lean();

  const enriched = insurances.map((seguro) => {
    const companiaSeguro = companiasSeguros.find(
      (c) => c.nombre === seguro.companiaAseguradora
    );
    return { ...seguro, asistencia: companiaSeguro?.asistencia };
  });

  return JSON.parse(JSON.stringify(enriched));
});
