import Link from "next/link";
import Navbar from "../components/LandingPage/Navbar";

export default function page() {
  return (
    <main className="relative z-0 bg-background">
      <Navbar atHome={false} />
      <section className="mt-[5rem] flex flex-col justify-center gap-y-4">
        <div className="sm:px-16 px-6 sm:py-16 py-10 max-w-6xl mx-auto space-y-3">
          <h2 className="text-header text-[2rem] font-bold">
            Politica - Terminos y Condiciones
          </h2>
          <p>
            De acuerdo a lo establecido en la Ley Estatutaria 1581 de 2012 y en
            el Decreto 1377 de 2013, se informa a todas las personas cuyos datos
            personales se encuentran en las bases de datos de MAYA LUNA SEGUROS
            COMPAÑÍA LTDA., que estos se han recopilado para el desarrollo de
            diversos procedimientos relacionados directamente con su objeto
            social.
          </p>
          <p>
            El uso y manejo de los mismos, se efectúa bajo estrictos estándares
            de responsabilidad, dentro de los cuales está el respeto al debido
            proceso y a la protección de la información. Los datos registrados
            en nuestras bases de datos son entre otros, los siguientes: número
            de identificación, número de placas del vehículo, número de licencia
            de tránsito, imagen, edad, teléfonos, correo electrónico, lugar de
            circulación del vehículo y dirección, y para el tratamiento de los
            datos comerciales, dentro de las finalidades comunicadas en el
            Manual de Políticas para la Protección y Tratamiento de Datos
            Personales.
          </p>
          <div className="text-end">
            <Link
              href="/"
              className="mt-5 py-3 px-6 w-full sm:w-1/4 font-bold uppercase text-sm text-background rounded-2xl bg-button hover:bg-button/80 transition-all duration-150"
            >
              Aceptar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
