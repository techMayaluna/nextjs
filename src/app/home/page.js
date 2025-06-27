import PicoyPlaca from "../components/home/PicoyPlaca.js";
import MisSeguros from "../components/home/MisSeguros.js";
import MenuInferior from "../components/shared/menuInferior";

export default async function Home() {
  return (
    <main className="pb-20">
      <PicoyPlaca />
      <MisSeguros />
      <MenuInferior />
    </main>
  );
}
