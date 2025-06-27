"use client";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "../../stores/userStore";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Modal from "./Modal";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const MenuSuperior = () => {
  const router = useRouter();

  const { nombre, error, fechaNacimiento, getUser, identificacion } =
    useUserStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();

      if (!identificacion) {
        router.push("/login");
      }
    };

    fetchData();
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

  const nameSection = isBirthday() ? (
    <h3 className="uppercase">¡Feliz cumpleaños {nombre}!</h3>
  ) : (
    <h3 className="uppercase">¡Bienvenido {nombre}!</h3>
  );

  return (
    <>
      <div className="text-center mr-8 ml-8 mt-8">
        {usePathname() === "/home" ? (
          <div className="space-y-2">
            <div className="flex justify-end">
              <LogoutButton />
            </div>
            {nameSection}
          </div>
        ) : (
          <div onClick={goBack} className="uppercase">
            Regresar
          </div>
        )}
      </div>
      {error ? <ModalError /> : ""}
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
        este sitio. Luego recarga la página.
      </p>
    </Modal>
  );
}

export default dynamic(() => Promise.resolve(MenuSuperior), { ssr: false });
