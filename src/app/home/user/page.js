import { getServerUser } from "@/app/utils/serverData";
import FormModificarUser from "@/app/components/user/FormModificarUser";

export default async function UserPage() {
  const user = await getServerUser();

  return (
    <section>
      <FormModificarUser user={user} />
    </section>
  );
}
