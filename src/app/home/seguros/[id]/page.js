"use client";
import useUserStore from "../../../stores/userStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import ModalExtintor from "../../../components/insurances/ModalExtintor";

const SeguroIndividual = ({ params }) => {
  const router = useRouter();
  const { seguros, rol, placaConductor } = useUserStore((state) => state);
  const [seguro, setSeguro] = useState({
    seguro: "",
    asistencia: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const seguroEncontrado =
      seguros.find((seguro) => seguro._id === params.id) || null;
    if (seguroEncontrado) {
      setSeguro(seguroEncontrado);
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
      <h2 className="text-center mb-4">MIS SEGUROS</h2>
      <div className="bg-primary py-4 px-4 rounded-2xl">
        <h2 className="font-bold pb-4 text-xl text-center">
          {seguro.tipoPoliza}
        </h2>
        <section className="grid grid-cols-2">
          <p className="text-left">Póliza No.</p>
          <p className="text-right">{seguro.nombrePoliza}</p>
        </section>
        <section className="grid grid-cols-2">
          <p className="text-left">Tipo Póliza</p>
          <p className="text-right">{seguro.tipoPoliza}</p>
        </section>
        <section className="grid grid-cols-2">
          <p className="text-left">Aseguradora</p>
          <p className="text-right">{seguro.companiaAseguradora}</p>
        </section>
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
              seguro.asistencia?.length < 4
                ? `tel:%23${seguro.asistencia}`
                : `tel:${seguro.asistencia}`
            }
          >
            {seguro.asistencia?.length < 4 && "#"}
            {seguro.asistencia}
          </a>
        </section>
        {seguro.placaVehiculo ? (
          <>
            <section className="grid grid-cols-2">
              <p className="text-left">Placa</p>
              <p className="text-right">{seguro.placaVehiculo}</p>
            </section>
            <section className="grid grid-cols-2 items-center">
              <p className="text-left">Extintor Vence</p>
              <div className="text-right">
                <span>
                  {seguro.fechaVencimientoExtintor &&
                  !isNaN(new Date(seguro.fechaVencimientoExtintor))
                    ? new Date(
                        new Date(seguro.fechaVencimientoExtintor).getTime() +
                          86400000
                      ).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No disponible"}
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="ml-2 text-sm underline"
                >
                  Editar
                </button>
              </div>
            </section>
            <section className="grid grid-cols-2">
              <p className="text-left">RTM Vence</p>
              <p className="text-right">
                {seguro.fechaVencimientoTecnomecanica &&
                !isNaN(new Date(seguro.fechaVencimientoTecnomecanica))
                  ? new Date(
                      new Date(seguro.fechaVencimientoTecnomecanica).getTime() +
                        86400000
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

        {seguro?.documentos?.[0] ? (
          <>
            <div className="mt-4 w-full h-96">
              <iframe
                src={seguro.documentos[0]}
                className="w-full h-full border rounded-lg"
                title="Vista previa de la póliza"
              />
            </div>
            <div className="text-center mt-4">
              <Link href={seguro.documentos[0]} target="_blank">
                {" "}
                <button className="bg-tertiary hover:bg-tertiaryHover text-white px-4 py-2 rounded-lg">
                  Ver archivo
                </button>
              </Link>
            </div>
          </>
        ) : null}
      </div>

      {isDownloading ? (
        <p className="text-center mt-2">
          Iniciando descarga... Si no funciona,{" "}
          <span className="underline" onClick={downloadPdf}>
            intenta de nuevo.
          </span>
        </p>
      ) : null}

      {showModal && (
        <ModalExtintor
          seguro={seguro}
          onClose={() => setShowModal(false)}
          onUpdate={() => (window.location.href = "/home/seguros/")}
        />
      )}

      {seguro?.vehiculos?.length > 0 ? (
        <div className="mt-4 border-t border-gray-300 pt-4">
          <h2 className="font-bold pb-4 text-xl">Vehículos y Vencimientos</h2>
          {seguro?.vehiculos?.length > 0 ? (
            rol === "conductor" ? (
              <Table
                data={
                  seguro.vehiculos.find((v) => v.placa === placaConductor)
                    ? [seguro.vehiculos.find((v) => v.placa === placaConductor)]
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
