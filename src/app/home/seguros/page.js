import { getAuthCookie, getServerSeguros } from "@/app/utils/serverData";
import InsuranceList from "@/app/components/insurances/InsuranceList";

export default async function SegurosPage() {
  const auth = getAuthCookie();
  const seguros = await getServerSeguros(auth?.userId);

  return (
    <div className="pb-36">
      <h2 className="pb-2 text-center">MIS SEGUROS</h2>
      <InsuranceList seguros={seguros} />
    </div>
  );
}
