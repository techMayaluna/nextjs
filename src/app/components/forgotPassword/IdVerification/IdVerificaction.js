import { useState } from "react";

function IdVerificaction({ send, context }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (Number(verificationCode) !== context.idChangePass)
        return setError(true);
      send({ type: "CONTINUE" });
    }, 1000);
  };

  return (
    <div className="mx-5">
      <h3 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
        Ingresa el código enviado a su número de celular{" "}
      </h3>

      <div className="flex flex-col	items-center">
        <div>
          <p>Código de recuperación</p>
          <input
            type="text"
            className="block w-80 my-2 rounded-md border-0 pt-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleInputChange}
            value={verificationCode}
          />
        </div>
        <button
          onClick={handleSend}
          className="flex w-80 justify-center rounded-2xl bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          type="submit"
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
        {error ? <p className="text-red-500">El código ingresado no es correcto</p> : null}
      </div>
    </div>
  );
}

export default IdVerificaction;
