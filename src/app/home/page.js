import { getAuthCookie, getServerUser, getServerSeguros } from "../utils/serverData";
import PicoyPlaca from "../components/home/PicoyPlaca.js";
import MisSeguros from "../components/home/MisSeguros.js";
import MenuInferior from "../components/shared/menuInferior";

export default async function Home() {
  const auth = getAuthCookie();
  const [user, seguros] = await Promise.all([
    getServerUser(),
    getServerSeguros(auth?.userId),
  ]);

  const rol = auth?.placaConductor ? "conductor" : user?.rol;

  return (
    <main className="pb-20">
      <PicoyPlaca ciudad={user?.ciudad} />
      <MisSeguros
        seguros={seguros}
        rol={rol}
        placaConductor={auth?.placaConductor}
      />
      <MenuInferior seguros={seguros} />
    </main>
  );
}
