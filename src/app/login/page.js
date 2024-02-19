import LoginBar from "../components/login/LoginBar";
import Image from "next/image";

export default function Login() {
  return (
    <main className="w-screen h-screen bg-gradient-to-t from-gradientGreen to-white">
      <Image
        className="mx-auto mb-14 mt-6"
        src="/logomayaluna.jpg"

        width={150}
        height={150}
        alt="logoMayaluna"
      />

      <h3 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        ¡Bienvenido de Nuevo!
      </h3>
      <LoginBar />
    </main>
  );
}
