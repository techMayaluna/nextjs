"use client";
import useUserStore from "../../stores/userStore";
import { useEffect } from "react";
import Modal from "./Modal";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const MenuSuperior = ({ user }) => {
  const router = useRouter();
  const { error } = useUserStore((state) => state);

  const goBack = () => {
    router.back();
  };

  const isBirthday = () => {
    if (!user?.fechaNacimiento) return false;
    const birthDate = new Date(user.fechaNacimiento);
    const currentDate = new Date();
    return (
      birthDate.getDate() === currentDate.getDate() &&
      birthDate.getMonth() === currentDate.getMonth()
    );
  };

  const nameSection = isBirthday() ? (
    <h3 className="uppercase">¡Feliz cumpleaños {user?.nombre}!</h3>
  ) : (
    <h3 className="uppercase">¡Bienvenido {user?.nombre}!</h3>
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
          <div className="flex justify-start">
            <button
              onClick={goBack}
              className="w-[45px] h-[45px] bg-gray-200 rounded-xl flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293l-1.414-1.414L4.586 12l6.707 6.707z"
                />
              </svg>
            </button>
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

export default MenuSuperior;
