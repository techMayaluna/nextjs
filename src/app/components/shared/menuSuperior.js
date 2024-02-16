"use client";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "../../stores/userStore";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Modal from "./Modal";
import { usePathname, useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const MenuSuperior = () => {
  const router = useRouter();

  const {
    nombre,
    error,
    updateGeo,
    fechaNacimiento,
    getUser,
    identificacion,
    seguros,
    getSeguros,
  } = useUserStore((state) => state);

  useEffect(() => {
    if (!identificacion) {
      router.push("/login");
    }

    getUser(identificacion);

    updateGeo();

    console.log(seguros);

    const hoy = new Date();
    const diasAviso = 10; // Número de días antes del vencimiento para mostrar el aviso

    seguros.forEach((seguro) => {
      const fechaVencimiento = new Date(seguro.fechaVencimiento);
      const diasRestantes = Math.ceil(
        (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24)
      );

      console.log(diasRestantes);
      if (diasRestantes <= diasAviso) {
        toast.info(`El seguro de ${seguro.tipoPoliza} está a punto de vencer`);
      }
    });
  }, []);

  const goBack = () => {
    router.back();
  };

  const isBirthday = () => {
    const birthDate = new Date(fechaNacimiento);
    const currentDate = new Date();

    return (
      birthDate.getDate() === currentDate.getDate() &&
      birthDate.getMonth() === currentDate.getMonth()
    );
  };

  return (
    <>
      <div className="flex justify-between mr-8 ml-8 mt-8">
        {usePathname() === "/home" ? (
          isBirthday() ? (
            <h3>¡Feliz cumpleaños {nombre}!</h3>
          ) : (
            <h3>¡Bienvenido {nombre}!</h3>
          )
        ) : (
          <div onClick={goBack} className="uppercase">
            Regresar
          </div>
        )}

        <Link href="/home">
          <Image
            className="w-auto h-auto"
            src="/logomayaluna.jpg"
            width={80}
            height={80}
            alt="logoMayaluna"
          />
        </Link>
      </div>
      {error ? <ModalError /> : ""}

      <Toaster position="top-center" duration="1500" />
    </>
  );
};

function ModalError() {
  const { updateGeo } = useUserStore();

  useEffect(() => {
    updateGeo();
  }, []);

  return (
    <Modal>
      <h3 className="text-md text-left font-bold mb-4">
        Es necsario que actives la ubicación para poder continuar
      </h3>
      <p>
        Si has denegado el acceso a la ubicación, por favor ve a la
        configuración de tu navegador y permite el acceso a la ubicación para
        este sitio.
      </p>
    </Modal>
  );
}

export default dynamic(() => Promise.resolve(MenuSuperior), { ssr: false });
