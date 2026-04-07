"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CallInsurance({ seguros }) {
  const pathname = usePathname();

  const parts = pathname.split("/"); // Divide el pathname en partes
  const id = parts[parts.length - 1]; // Obtiene la última parte, que es el ID

  const numberToCall1 =
    !seguros?.length
      ? undefined
      : id === "home"
      ? seguros[0]?.asistencia
      : seguros.find((seguro) => seguro._id === id)?.asistencia;

  const numberToCall2 = numberToCall1
    ? numberToCall1.length < 4
      ? `tel:%23${numberToCall1}`
      : `tel:${numberToCall1}`
    : null;

  return (
    <a
      href={numberToCall2 ?? undefined}
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
