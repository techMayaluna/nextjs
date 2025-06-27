import Modal from "../shared/Modal";

import { useState } from "react";

export default function ModalExtintor({ seguro, onClose, onUpdate }) {
  const [fechaVencimiento, setFechaVencimiento] = useState(
    seguro.fechaVencimientoExtintor
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(fechaVencimiento);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Actualizar Vencimiento</h2>
        <div className="mb-4">
          <label htmlFor="fechaVencimiento" className="block mb-2">
            Fecha de Vencimiento del Extintor
          </label>
          <input
            type="date"
            id="fechaVencimiento"
            value={fechaVencimiento}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 text-gray-500 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-tertiary text-white rounded-lg"
          >
            Actualizar
          </button>
        </div>
      </form>
    </Modal>
  );
}
