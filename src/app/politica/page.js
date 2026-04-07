import Link from "next/link";

export default function page() {
  return (
    <main className="min-h-screen w-screen bg-[linear-gradient(to_top,theme(colors.gradientGreen)_0%,theme(colors.gradientGreen)_20%,theme(colors.white)_70%,theme(colors.white)_100%)] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-center text-2xl font-bold text-header">
          Política de Privacidad
        </h2>
        <p className="text-sm text-gray-700">
          De acuerdo a lo establecido en la Ley Estatutaria 1581 de 2012 y en
          el Decreto 1377 de 2013, se informa a todas las personas cuyos datos
          personales se encuentran en las bases de datos de MAYA LUNA SEGUROS
          COMPAÑÍA LTDA., que estos se han recopilado para el desarrollo de
          diversos procedimientos relacionados directamente con su objeto
          social.
        </p>
        <p className="text-sm text-gray-700">
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
        <Link
          href="/"
          className="block w-full text-center py-2.5 font-semibold text-white rounded-2xl bg-tertiary hover:bg-tertiaryHover transition-all duration-150"
        >
          Aceptar
        </Link>
      </div>
    </main>
  );
}
