"use client";
import useUserStore from "../../../stores/userStore";
import { useState, useEffect } from "react";
import { companiasSeguros } from "../../../utils/insuranceCompaniesList";

import { useRouter } from "next/navigation";

const SeguroIndividual = ({ params }) => {
  const router = useRouter();

  const { seguros } = useUserStore((state) => state);

  const [seguro, setSeguro] = useState({
    seguro: "",
    asistencia: "",
  });

  useEffect(() => {
    const seguroEncontrado =
      seguros.find((seguro) => seguro._id === params.id) || null;
    if (seguroEncontrado) {
      console.log(seguroEncontrado);
      const companiaSeguro = companiasSeguros.find(
        (compania) => compania.nombre === seguroEncontrado.companiaAseguradora
      );
      setSeguro({
        ...seguroEncontrado,
        asistencia: companiaSeguro ? companiaSeguro.asistencia : undefined,
      });
    } else {
      router.push("/home");
    }
  }, [seguros, params.id]);

  return (
    <section className="pb-52">
      <div className="bg-primary py-4 px-4 rounded-2xl">
        <h2 className="font-bold pb-4 text-xl">Información General</h2>
        <section className="grid grid-cols-2">
          <p className="text-left">Nombre Póliza</p>
          <p className="text-right">{seguro.nombrePoliza}</p>
        </section>{" "}
        <section className="grid grid-cols-2">
          <p className="text-left">Tipo Póliza</p>
          <p className="text-right">{seguro.tipoPoliza}</p>
        </section>{" "}
        <section className="grid grid-cols-2">
          <p className="text-left">Compañia Aseguradora</p>
          <p className="text-right">{seguro.companiaAseguradora}</p>
        </section>{" "}
        <section className="grid grid-cols-2">
          <p className="text-left">Asistencia Aseguradora</p>
          <a
            className="text-right underline"
            href={
              "" + seguro.asistencia?.length < 4
                ? `tel:%23${seguro.asistencia}`
                : `tel:${seguro.asistencia}`
            }
          >
            {seguro.asistencia?.length < 4 && "#"}
            {seguro.asistencia}
          </a>
        </section>{" "}
        {seguro.placaVehiculo ? (
          <>
            <section className="grid grid-cols-2">
              <p className="text-left">Placa Vehículo</p>
              <p className="text-right">{seguro.placaVehiculo}</p>
            </section>
            <section className="grid grid-cols-2">
              <p className="text-left">Vencimiento Extintor</p>
              <p className="text-right">
                {!isNaN(new Date(seguro.fechaVencimientoExtintor))
                  ? new Date(seguro.fechaVencimientoExtintor)
                      .toISOString()
                      .split("T")[0]
                  : "Fecha no disponible"}
              </p>
            </section>
            <section className="grid grid-cols-2">
              <p className="text-left">Vencimiento Revisión Tecnomecánica</p>
              <p className="text-right">
                {!isNaN(new Date(seguro.fechaVencimientoTecnomecanica))
                  ? new Date(seguro.fechaVencimientoTecnomecanica)
                      .toISOString()
                      .split("T")[0]
                  : "Fecha no disponible"}
              </p>
            </section>
          </>
        ) : null}
        <section className="grid grid-cols-2">
          <p className="text-left">Fecha Inicio</p>
          <p className="text-right">
            {seguro.fechaInicial && !isNaN(new Date(seguro.fechaInicial))
              ? new Date(seguro.fechaInicial).toISOString().split("T")[0]
              : "Fecha no disponible"}
          </p>
        </section>
        <section className="grid grid-cols-2">
          <p className="text-left">Fecha Vencimiento</p>
          <p className="text-right">
            {seguro.fechaVencimiento &&
            !isNaN(new Date(seguro.fechaVencimiento))
              ? new Date(seguro.fechaVencimiento).toISOString().split("T")[0]
              : "Fecha no disponible"}
          </p>
        </section>
      </div>

      <div className="bg-primary py-4 px-4 mt-4 rounded-2xl">
        <h2 className="font-bold pb-4 text-xl">Documentos</h2>

        {seguro?.documentos?.[0] ? (
          <section className="grid grid-cols-2">
            <p className="text-left">Poliza</p>
            <a
              href={seguro?.documentos?.[0]}
              target="_blank"
              className="text-right underline"
            >
              Visualizar
            </a>{" "}
          </section>
        ) : (
          <p>No hay documentos adjuntos</p>
        )}
      </div>

      {seguro?.vehiculos?.length > 0 ? (
        <div className="bg-primary py-4 px-4 mt-4 rounded-2xl">
          <h2 className="font-bold pb-4 text-xl">Vehiculos y Vencimientos </h2>
          {seguro?.vehiculos?.length > 1 ? (
            <Table data={seguro?.vehiculos} />
          ) : (
            <p className="text-center">
              No hay vehiculos registrados, pide la plantilla del excel con la
              información y envialo al area de asistencia!
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
};

const Table = ({ data }) => (
  <table className="min-w-full divide-y divide-gray-200 mb-4">
    <thead className="">
      <th>Placa</th>
      <th>Tecnomecánica</th>
      <th>Extintor</th>
      <th>Tarjeta de operación</th>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data?.map((vehiculo) => (
        <tr key={vehiculo.placa}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
            {vehiculo.placa}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
            {vehiculo.vencimientoTecnomecanica}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
            {vehiculo.vencimientoExtintor}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
            {vehiculo.vencimientoTarjetaOperacion}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SeguroIndividual;
