import { useState } from "react";
import Link from "next/link";
import useUserStore from "../../../stores/userStore";
import Modal from "../../shared/Modal";

function ChangePassword({ context }) {
  const { changePassword } = useUserStore();

  const { idUser, email } = context;


  console.log(email)

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [passwords, setPasswords] = useState({
    password: "",
    newPass: "",
  });

  const sendEmailCode = () => {
    setLoading(true);
    if (passwords.password != passwords.newPass) {
      console.log("no coinciden");
      setError(true);
      setLoading(false);
      return;
    }

    changePassword(passwords.password, idUser, email)
      .then((res) => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      });
  };

 
  const handleInputChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="mx-5">
        <h3 className="text-center text-2xl font-bold leading-9 mb-5 tracking-tight text-gray-900">
          Ingresa su nueva contraseña y verifiquela
        </h3>
        <div className="flex flex-col	items-center">
          <div>
            <p>Nueva contraseña</p>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              value={passwords.password}
              className="block w-80 my-2 rounded-md border-0 pt-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex flex-col	items-center">
          <div>
            <p>Verificar contraseña</p>
            <input
              type="password"
              name="newPass"
              onChange={handleInputChange}
              value={passwords.newPass}
              className="block w-80 my-2 rounded-md border-0 pt-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="flex w-80 justify-center rounded-2xl bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={sendEmailCode}
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3a9 9 0 1 0 9 9"
                />
              </svg>
            ) : (
              "Cambiar contraseña"
            )}
          </button>
        {error ? <p>Las contraseñas no coinciden</p> : null}{" "}
        </div>
      </div>

      {success ? <ModalChangePassword /> : ""}
    </>
  );
}
const ModalChangePassword = () => {
  return (
    <Modal>
      <h2 className="text-xl">Contraseña modificada con éxito!</h2>
      <div className="text-end">
        <Link href="/login">
          <button className="shadow bg-secondary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Aceptar
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default ChangePassword;
