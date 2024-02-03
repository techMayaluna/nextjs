import PicoyPlaca from "../components/home/PicoyPlaca.js";
import MisSeguros from "../components/home/MisSeguros.js";
import { cookies } from "next/headers";
import { fetchUserData, fetchInsurance } from "../utils/todayDay.js";

export default async function Home() {

  return (
    <main className="pb-20">
      <PicoyPlaca/>
      <MisSeguros/>
    </main>
  );
}



