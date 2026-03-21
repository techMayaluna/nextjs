import { getServerUser } from "@/app/utils/serverData";
import FormMandarEmail from "../../components/reportar/FormMandarEmail";

export default async function ReportarCaso({ searchParams }) {
  const user = await getServerUser();

  return (
    <section className="pb-28">
      <FormMandarEmail params={searchParams} user={user} />
    </section>
  );
}
