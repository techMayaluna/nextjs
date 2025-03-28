"use client";
import Modal from "../shared/Modal";
import ScrollerPicoyPlaca from "./scrollerPicoyPlaca";
import { getDiaHoy } from "../../utils/todayDay";
import useUserStore from "../../stores/userStore";
import dynamic from "next/dynamic";
import { useState } from "react";

function PicoyPlaca() {
  const [showModal, setShowModal] = useState(false);

  const { ciudad } = useUserStore((state) => state);

  const today = getDiaHoy();

  const reglaDeHoy = ciudad?.reglas?.find((regla) => regla.dia === today);


  return (
    <section>
      <h2 className="mb-1">PICO Y PLACA</h2>
      <div className="flex flex-col justify-between bg-primary h-32 p-6 rounded-2xl text-sm">
        <p>
          {" "}
          Pico y placa hoy en <b className="underline">
            {ciudad?.nombre}
          </b> para <b className="underline">particulares</b>
          {reglaDeHoy?.placas.trim()
            ? " es para las placas terminadas en " + reglaDeHoy.placas
            : " no aplica"}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-secondary text-white w-28 h-8 rounded-2xl"
            onClick={() => setShowModal(true)}
          >
            Ver más
          </button>
        </div>
      </div>
      {showModal && (
        <ModalPico ciudad={ciudad} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}

function ModalPico({ onClose, ciudad }) {
  return (
    <Modal className="">
      <h2 className="text-lg font-bold mb-4">PICO Y PLACA</h2>
      <ScrollerPicoyPlaca ciudad={ciudad} />

      {ciudad.nombre === "Pasto" && (
        <a
          href="https://www.pasto.gov.co/images/2025/mar/pico_placa_marzo.jpeg"
          target="_blank"
          className="underline"
          rel="noopener noreferrer"
        >
          Ver Decreto de Pico y Placa en Pasto
        </a>
      )}

      <div className="flex justify-end mt-2">
        <button
          className="bg-secondary text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Regresar
        </button>
      </div>
    </Modal>
  );
}

export default dynamic(() => Promise.resolve(PicoyPlaca), { ssr: false });
