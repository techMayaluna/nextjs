import { redirect } from "next/navigation";
import { getAuthCookie, getServerSeguros } from "@/app/utils/serverData";
import SeguroDetail from "./SeguroDetail";

export default async function SeguroIndividualPage({ params }) {
  const auth = getAuthCookie();
  const seguros = await getServerSeguros(auth?.userId);

  const seguro = seguros.find((s) => s._id === params.id);
  if (!seguro) redirect("/home");

  return (
    <SeguroDetail
      seguro={seguro}
      rol={auth?.rol}
      placaConductor={auth?.placaConductor}
    />
  );
}
