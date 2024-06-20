import NavAction from "./navAction";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import CallInsurance from "./callInsurance";



export default function MenuInferior() {

  const cookiesStore = cookies()

  const user = cookiesStore.get("user");


  return (
    <div className="flex justify-center h-20 fixed inset-x-0 bottom-2">
      <footer className="bg-secondary flex gap-1 sm:gap-2 items-center pl-2 max-w-screen-sm w-11/12 h-20 rounded-2xl">
        <NavAction href="/home"></NavAction>
        <NavAction href="/home/user"></NavAction>
        <LogoutButton />

        <div className="circulo rounded-full flex flex-col items-center justify-center">
          <CallInsurance/>
        </div>
      </footer>
    </div>
  );
}
