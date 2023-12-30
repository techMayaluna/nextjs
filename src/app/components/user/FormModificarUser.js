"use client";
import useUserStore from "../../stores/userStore";
import dynamic from "next/dynamic";


function FormModificarUser() {
  const {
    nombre,
    identificacion,
    ciudad,
    celular,
    fechaVencimientoLicencia,
    fechaNacimiento,
    direccion,
    email,
    rol,
  } = useUserStore((state) => ({
    nombre: state.nombre,
    identificacion: state.identificacion,
    ciudad: state.ciudad,
    celular: state.celular,
    fechaVencimientoLicencia: state.fechaVencimientoLicencia,
    fechaNacimiento: state.fechaNacimiento,
    direccion: state.direccion,
    email: state.email,
    rol: state.rol,
    _id: state._id,
  }));

  return (
    <>
      <section className="pb-28">
        <div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nombre Completo:
          </label>
          <input
            type="text"
            name="nombre"
            readOnly
            value={nombre}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Jose Luis "
          />
        </div>

        <div className="flex w-full gap-2">
          <div className="w-full flex flex-col">
            <label>Identificación:</label>
            <input
              type="number"
              name="identificacion"
              readOnly
              value={identificacion}
              className="appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="123456789"
            />
          </div>

          <div className="w-full flex flex-col">
            <label>Ciudad:</label>
            <select
              className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="ciudad"
              value={ciudad}
            >
              <option value={ciudad}>{ciudad}</option>
            </select>
          </div>
        </div>

        <div>
          <label>Número de Celular:</label>
          <input
            type="tel"
            name="celular"
            readOnly
            value={celular}
            className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="123456789"
          />
        </div>
        <div>
          <div className="flex w-full gap-2">
            <div className="w-full flex flex-col">
              <label className="whitespace-nowrap">Vencimiento Licencia:</label>
              <input
                type="date"
                name="vencimientoLicencia"
                readOnly
                value={fechaVencimientoLicencia?.split("T")[0] || ""}
                className="appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="123456789"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Fecha Nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                readOnly
                value={fechaNacimiento?.split("T")[0] || ""}
                className="appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="123456789"
              />
            </div>
          </div>
          <label>Dirección de Residencia:</label>
          <input
            type="text"
            name="direccion"
            readOnly
            value={direccion}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Calle 5 N° 38 - 25 "
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            readOnly
            value={email}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="emaya@mayalunaseguros.com"
          />
        </div>

        <article>
          Si deseas cambiar algún dato personal, por favor comunícate con la
          administración
        </article>
      </section>
    </>
  );
}

export default dynamic(() => Promise.resolve(FormModificarUser), { ssr: false });
