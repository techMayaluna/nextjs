"use client";
import Modal from "../shared/Modal";
import ScrollerPicoyPlaca from "./scrollerPicoyPlaca";
import { aplicaONo } from "../../utils/todayDay";
import dynamic from "next/dynamic";
import { useState } from "react";

function PicoyPlaca({ciudad}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <section>
      <h2 className="mb-1">PICO Y PLACA</h2>
      <div className="flex flex-col justify-between bg-primary h-32 p-6 rounded-2xl text-sm">
        <p>
          {" "}
          El pico y placa hoy en <b className="underline">{ciudad}</b> para{" "}
          <b className="underline">particulares</b>
          {aplicaONo(ciudad) === "No aplica" ? (
            <span> no aplica</span>
          ) : (
            <span>
              {" "}
              es <b className="">{aplicaONo(ciudad)}</b>
            </span>
          )}
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
      <div className="flex justify-end">
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
