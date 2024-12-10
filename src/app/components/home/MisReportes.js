"use client";
import ActionSection from "./ActionSection";
import { useState } from "react";
import Modal from "../shared/Modal";
import Link from "next/link";

export default function MisReportes({ seguros, placaConductor, rol }) {
  const [showModal2, setShowModal2] = useState(false);
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);

  const hasAutoInsurance =
    seguros?.some((seguro) => seguro.tipoPoliza.includes("Autos")) ||
    seguros[0]?.vehiculos;
  const autoInsurances = seguros?.filter(
    (seguro) =>
      seguro.tipoPoliza.includes("Autos") || seguro.tipoPoliza.includes("SOAT")
  );
  const autoInsurancesUnicos = autoInsurances.reduce(
    (acc, seguro) => {
      if (!acc.placas.has(seguro.placaVehiculo)) {
        acc.placas.add(seguro.placaVehiculo);
        acc.seguros.push(seguro);
      }
      return acc;
    },
    { placas: new Set(), seguros: [] }
  ).seguros;

  const handleModalClick = () => {
    if (hasAutoInsurance) {
      setShowVehiculoModal(true);
    } else {
      setShowModal2(true);
    }
  };

  const displayInspection = () => {
    if (!rol === "conductor") {
      return null;
    } else {
      return (
        <ActionSection
          src="inspeccion"
          text="Generar Inspección"
          onClick={handleModalClick}
        />
      );
    }
  };

  return (
    <>
      <section className="py-6">
        <h2 className="mb-1">MIS REPORTES</h2>
        <div className="flex justify-start gap-4 bg-primary h-fit p-6 rounded-2xl text-sm">
          <ActionSection
            src="reportar"
            text="Generar reporte"
            onClick={handleModalClick}
          />

          {displayInspection()}
        </div>
      </section>

      {showVehiculoModal && (
        <ModalVehiculoTipo
          seguros={autoInsurancesUnicos}
          placaConductor={placaConductor}
          rol={rol}
          onClose={() => setShowVehiculoModal(false)}
        />
      )}

      {showModal2 && (
        <ModalNoAutoInsurance onClose={() => setShowModal2(false)} />
      )}
    </>
  );
}

function ModalVehiculoTipo({ seguros, onClose, placaConductor, rol }) {
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  const handleVehiculoClick = (id) => {
    setSelectedVehiculo(id);
  };

  return (
    <Modal>
      <div className="flex justify-end">
        <p onClick={onClose}>X</p>
      </div>
      {!selectedVehiculo ? (
        <>
          <h2 className="text-md text-center font-bold mb-2">
            Selecciona el vehículo
          </h2>
          <div className="flex overflow-x-auto gap-5 pb-4">
            {rol === "Individual" ? (
              <>
                {seguros.map((seguro) => (
                  <div
                    className="flex flex-shrink-0 flex-col justify-center items-center bg-secondary w-20 h-20 p-1 text-white rounded-2xl text-sm"
                    key={seguro._id}
                    onClick={() => handleVehiculoClick(seguro.placaVehiculo)}
                  >
                    {seguro.placaVehiculo}
                  </div>
                ))}
              </>
            ) : (
              <div
                className="flex flex-shrink-0 flex-col justify-center items-center bg-secondary w-20 h-20 p-1 text-white rounded-2xl text-sm"
                onClick={() => handleVehiculoClick(placaConductor)}
              >
                {placaConductor}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-md text-center font-bold mb-2">
            ¿Qué tipo de reporte desea generar?
          </h2>
          <p className="text-sm text-center mb-2 text-lighttext">
            Los accidentes gravados tienen lesionados implicados, los simples
            son solo daños materiales.
          </p>

          <div className="flex justify-around">
            <Link
              className="bg-secondary w-24 text-white px-4 py-2 rounded-lg text-center"
              href={`/home/reportar?tipo=Agravado&placa=${selectedVehiculo}`}
            >
              Agravado
            </Link>
            <Link
              className="bg-secondary w-24 text-white px-4 py-2 rounded-lg text-center"
              href={`/home/reportar?tipo=Simple&placa=${selectedVehiculo}`}
            >
              Simple
            </Link>
          </div>
        </>
      )}
    </Modal>
  );
}

function ModalNoAutoInsurance({ onClose }) {
  return (
    <Modal>
      <div className="modal-content">
        <h2>No tienes seguros de vehículo, contacta con nuestros asesores</h2>
        <div className="text-end mt-4">
          <button
            className="bg-secondary w-24 text-white px-4 py-2 rounded-lg text-center"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
