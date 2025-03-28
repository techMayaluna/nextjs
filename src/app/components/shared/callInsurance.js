"use client";
import useUserStore from "@/app/stores/userStore";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CallInsurance({}) {
  const pathname = usePathname();

  const parts = pathname.split("/"); // Divide el pathname en partes
  const id = parts[parts.length - 1]; // Obtiene la última parte, que es el ID

  const { seguros } = useUserStore((state) => state);

  const numberToCall1 =
    id === "home"
      ? seguros[0]?.asistencia
      : seguros.find((seguro) => seguro._id === id)?.asistencia;

  const numberToCall2 =
    numberToCall1?.length < 4
      ? `tel:%23${numberToCall1}`
      : `tel:${numberToCall1}`;


  return (
    <a
      href={numberToCall2}
      className="bg-yellowCall w-20 h-20 rounded-full flex items-center justify-center"
    >
      <Image
        alt="Llamada emergencia"
        src="/call.png"
        width={40}
        height={40}
      ></Image>
    </a>
  );
}
