import NavAction from "./navAction";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import call from "../../../../public/call.png";
import { cookies } from "next/headers";

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
          <a
            href="tel:123"
            className="bg-yellowCall w-20 h-20 rounded-full flex items-center justify-center"
          >
            <Image
              alt="Llamada emergencia"
              src={call}
              width={40}
              height={40}
            ></Image>
          </a>
        </div>
      </footer>
    </div>
  );
}
