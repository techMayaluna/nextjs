import { redirect } from "next/navigation";
import { getAuthCookie, getServerUser, getServerSeguros } from "@/app/utils/serverData";
import SeguroDetail from "./SeguroDetail";

export default async function SeguroIndividualPage({ params }) {
  const auth = getAuthCookie();
  const [user, seguros] = await Promise.all([
    getServerUser(),
    getServerSeguros(auth?.userId),
  ]);

  const seguro = seguros.find((s) => s._id === params.id);
  if (!seguro) redirect("/home");

  const rol = auth?.placaConductor ? "conductor" : user?.rol;

  return (
    <SeguroDetail
      seguro={seguro}
      rol={rol}
      placaConductor={auth?.placaConductor}
    />
  );
}
