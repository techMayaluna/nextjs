import { useState } from "react";

function IdVerificaction({ send, context }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSend = () => {
    if (verificationCode !== context.idChangePass) return setError(true);
    send({ type: "CONTINUE" });
  };

  return (
    <div className="mx-5">
      <h3 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
        Ingresa el código enviado a su correo{" "}
      </h3>
      <div className="">
        Código de recuperación
        <input
          type="text"
          className="block w-80 my-2 rounded-md border-0 pt-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleInputChange}
          value={verificationCode}
        />
        <button
          onClick={handleSend}
          className="flex w-80 justify-center rounded-2xl bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          type="submit"
        >
          Ingresar
        </button>
      </div>
      {error ? <p>El código ingresado no es correcto</p> : null}
    </div>
  );
}

export default IdVerificaction;
