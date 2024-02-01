import PicoyPlaca from "../components/home/PicoyPlaca.js";
import MisSeguros from "../components/home/MisSeguros.js";
import { cookies } from "next/headers";
import { fetchUserData, fetchInsurance } from "../utils/todayDay.js";

export default async function Home() {

  const cookiesStore = cookies()
  const user = cookiesStore.get("user");
  const usuario = await fetchUserData(user.value);
  const seguros = await fetchInsurance(user.value);

  console.log(seguros)


  return (
    <main className="pb-20">
      <PicoyPlaca ciudad={usuario.ciudad} />
      <MisSeguros seguros={seguros} />
    </main>
  );
}



