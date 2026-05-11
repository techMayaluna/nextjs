import { redirect } from "next/navigation";
import { getAuthCookie, getServerUser } from "../utils/serverData";
import MenuSuperior from "../components/shared/menuSuperior";
import MenuInferior from "../components/shared/menuInferior";

export default async function LayoutHome({ children }) {
  const auth = getAuthCookie();
  if (!auth) redirect("/");

  const user = await getServerUser();
  if (!user) redirect("/");

  return (
    <div className="flex justify-center h-screen">
      <div className="max-w-screen-sm w-full relative">
        <MenuSuperior user={user} />
        <section className="mx-8 my-4">{children}</section>
      </div>
    </div>
  );
}
