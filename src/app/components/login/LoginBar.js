"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import useUserStore from "../../stores/userStore";
import { useRouter } from "next/navigation";

export default function LoginBar() {
  const { login, nombre } = useUserStore();

  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const router = useRouter();

  const userIdRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nombre) {
      router.push("/home");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (!acceptedPolicies) {
      setError("Debes aceptar las políticas de privacidad para continuar");
      return;
    } else {
      setLoading(true);

      const userid = userIdRef.current.value;
      const password = passwordRef.current.value;
      e.preventDefault();

      login(userid, password)
        .then((res) => {
          console.log(res);
          if (res != undefined) {
            router.push("/home");
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <main className="">
      <div className="mt-10	justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6 flex flex-col items-center"
          action="#"
          method="POST"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Documento de identidad
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="text"
                name="email"
                autoComplete="email"
                ref={userIdRef}
                required
                placeholder="Documento de identidad"
                className={`block w-80 rounded-2xl border-2 pt-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-secondary sm:text-sm sm:leading-6 ${
                  error ? "border-red-600" : ""
                }`}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  required
                  placeholder="Contraseña"
                  className={`block w-80 rounded-2xl border-2 pt-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-secondary sm:text-sm sm:leading-6 ${
                    error ? "border-red-600" : ""
                  }`}
                />
              </div>
            </div>

            <div className="mt-3">
              <input
                type="radio"
                id="accept"
                name="privacy"
                value="accept"
                checked={acceptedPolicies}
                onChange={() => setAcceptedPolicies(!acceptedPolicies)}
              />
              <label
                htmlFor="accept"
                className="text-sm font-medium leading-6 ml-1 text-gray-900"
              >
                Acepto las{" "}
                <Link href="/politica" className="underline">
                  políticas de privacidad
                </Link>
              </label>
              <br />
            </div>
          </div>

          {error && (
            <p className="text-center text-sm text-gray-500">
              <span className=" text-sm text-red-500">
                Usuario o contraseña incorrectos. <br />
                Por favor intente de nuevamente.
              </span>
            </p>
          )}

          <button
            type="submit"
            className="flex w-80 justify-center rounded-2xl bg-tertiary hover:bg-tertiaryHover  px-6 py-2.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={handleClick}
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
              "Entrar"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link
            href="/forgotpass"
            className="font-semibold leading-6 underline"
          >
            Olvidé mi contraseña
          </Link>
        </p>
      </div>
    </main>
  );
}
