"use client";
import useUserStore from "../../../stores/userStore";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

const SeguroIndividual = ({ params }) => {
  const router = useRouter();

  const { seguros, rol, placaConductor } = useUserStore((state) => state);

  const [seguro, setSeguro] = useState({
    seguro: "",
    asistencia: "",
  });

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const seguroEncontrado =
      seguros.find((seguro) => seguro._id === params.id) || null;
    if (seguroEncontrado) {
      console.log(seguroEncontrado);

      setSeguro({
        ...seguroEncontrado,
      });
    } else {
      router.push("/home");
    }
  }, [seguros, params.id]);

  const downloadPdf = async () => {
    try {
      const response = await axios.get(
        `/api/download/poliza.pdf?url=${seguro.documentos[0]}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "poliza.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the pdf file", error);
    }
  };

  return (
    <section className="pb-52">
      <h2 className="text-center">MIS SEGUROS</h2>
      <div className="bg-primary py-4 px-4 rounded-2xl">
        <h2 className="font-bold pb-4 text-xl text-center">
          {seguro.tipoPoliza}
        </h2>
        <section className="grid grid-cols-2">
          <p className="text-left">Póliza No.</p>
          <p className="text-right">{seguro.nombrePoliza}</p>
        </section>{" "}
        <section className="grid grid-cols-2">
          <p className="text-left">Tipo Póliza</p>
          <p className="text-right">{seguro.tipoPoliza}</p>
        </section>{" "}
        <section className="grid grid-cols-2">
          <p className="text-left">Aseguradora</p>
          <p className="text-right">{seguro.companiaAseguradora}</p>
        </section>{" "}
        <section className="grid grid-cols-2">
          <p className="text-left">Fecha Inicio</p>
          <p className="text-right">
            {seguro.fechaInicial && !isNaN(new Date(seguro.fechaInicial))
              ? new Date(
                  new Date(seguro.fechaInicial).getTime() + 86400000
                ).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Fecha no disponible"}
          </p>
        </section>
        <section className="grid grid-cols-2">
          <p className="text-left">Fecha Vencimiento</p>
          <p className="text-right">
            {seguro.fechaVencimiento &&
            !isNaN(new Date(seguro.fechaVencimiento))
              ? new Date(
                  new Date(seguro.fechaVencimiento).getTime() + 86400000
                ).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Fecha no disponible"}
          </p>
        </section>
        <section className="grid grid-cols-2">
          <p className="text-left">Asistencia</p>
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
              <p className="text-left">Placa</p>
              <p className="text-right">{seguro.placaVehiculo}</p>
            </section>
            <section className="grid grid-cols-2">
              <p className="text-left">Extintor Vence</p>
              <p className="text-right">
                {seguro.fechaVencimientoExtintor
                  ? !isNaN(new Date(seguro.fechaVencimientoExtintor))
                    ? new Date(
                        seguro.fechaVencimientoExtintor
                      ).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Fecha no disponible"
                  : "Fecha no disponible"}
              </p>
            </section>
            <section className="grid grid-cols-2">
              <p className="text-left">RTM Vence</p>
              <p className="text-right">
                {!isNaN(new Date(seguro.fechaVencimientoTecnomecanica))
                  ? new Date(
                      seguro.fechaVencimientoTecnomecanica
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Fecha no disponible"}
              </p>
            </section>
          </>
        ) : null}
      </div>

      <div className="bg-primary py-4 px-4 mt-4 rounded-2xl">
        <h2 className="font-bold pb-4 text-xl">Documentos</h2>

        {seguro?.documentos?.[0] ? (
          <section className="grid grid-cols-2">
            <p className="text-left">Poliza</p>
            <a
              href={seguro.documentos[0]}
              onClick={() => setIsDownloading(true)}
              target="_blank"
              className="text-right underline"
            >
              Visualizar
            </a>
          </section>
        ) : (
          <p>No hay documentos adjuntos</p>
        )}
      </div>

      {isDownloading ? (
        <p className="text-center mt-2">
          Si la descarga de tu documento no fue exitosa,{" "}
          <span className="underline" onClick={downloadPdf}>
            haz click aquí para intentarlo de nuevo.
          </span>
        </p>
      ) : null}

      {seguro?.vehiculos?.length > 0 ? (
        <div className="bg-primary py-4 px-4 mt-4 rounded-2xl">
          <h2 className="font-bold pb-4 text-xl">Vehiculos y Vencimientos </h2>
          {seguro?.vehiculos?.length > 1 ? (
            rol === "conductor" ? (
              <Table
                data={
                  seguro.vehiculos.find(
                    (seguro) => seguro.placa === placaConductor
                  )
                    ? [
                        seguro.vehiculos.find(
                          (seguro) => seguro.placa === placaConductor
                        ),
                      ]
                    : []
                }
              />
            ) : (
              <Table data={seguro.vehiculos} />
            )
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
      <tr>
        <th>Placa</th>
        <th>Tecnomecánica</th>
        <th>Extintor</th>
        <th>Tarjeta de operación</th>
        <th>SOAT</th>
      </tr>
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
          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
            {vehiculo.SOAT}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SeguroIndividual;
