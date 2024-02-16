import Image from "next/image";
import Link from "next/link";

const NotFound = () => {

    return (

        <main className="w-screen h-screen bg-gradient-to-t from-gradientGreen to-white">
            <Image
                className="mx-auto mb-14 mt-6"
                src="/logomayaluna.jpg"

                width={150}
                height={150}
                alt="logoMayaluna"
            />

            <h3 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Página no encontrada
            </h3>


            <div className="grid place-items-center mt-5">           
                <p className="mb-5">
                    La página que buscas no existe
                </p>
                 <Link href="/">
                <button
                    className="flex w-80 justify-center rounded-2xl bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    Regresar al inicio
                </button>
            </Link>
            </div>
        </main>

    );
};

export default NotFound;

