import { useState } from "react";
import useUserStore from "../../../stores/userStore";
import { generateCode } from "@/app/utils/todayDay";

function IdSend({ send }) {
  const { sendEmailForgotPass } = useUserStore();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const code = generateCode();
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const sendEmailCode = () => {
    setLoading(true);
    console.log(code)
    
    sendEmailForgotPass(email, code)

      .then((res) => {
        send({
          type: "START",
          idChangePass: code,
          idUser: res._id,
          email: res.email,
        });
      })

      
      .catch((error) => {
        //TODO HANDLE ERROR
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="mx-5">
      <h3 className="text-xl text-center font-bold mb-10 leading-9 tracking-tight text-gray-900">
        Ingresa el correo electronico registrado en tu cuenta{" "}
      </h3>

      <div className="flex flex-col	items-center">
        <div>
          <p className="text-left">Correo electrónico</p>
          <input
            type="email"
            onChange={handleInputChange}
            value={email}
            className="block my-2 w-80 rounded-md border-0 pt-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          onClick={sendEmailCode}
          className="flex w-80 justify-center rounded-2xl bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
            "Ingresar"
          )}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
}

export default IdSend;
