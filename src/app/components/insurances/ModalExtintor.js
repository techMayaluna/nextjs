import Modal from "../shared/Modal";

import { useState } from "react";

export default function ModalExtintor({ seguro, onClose, onUpdate }) {
  const [fechaVencimiento, setFechaVencimiento] = useState(
    seguro.fechaVencimientoExtintor
      ? new Date(seguro.fechaVencimientoExtintor).toISOString().split("T")[0]
      : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess();

    if (!fechaVencimiento) {
      setError("Por favor selecciona una fecha de vencimiento");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/seguros/update-extintor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: seguro._id,
          fechaVencimiento: new Date(fechaVencimiento).toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Error al actualizar la fecha de vencimiento"
        );
      }

      setSuccess("Fecha de vencimiento actualizada correctamente");
      onUpdate(data.data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error al actualizar la fecha de vencimiento");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Actualizar Vencimiento</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p>{success}</p>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="fechaVencimiento" className="block mb-2">
            Fecha de Vencimiento del Extintor{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="fechaVencimiento"
            value={fechaVencimiento}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
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
            className={`px-4 py-2 bg-tertiary text-white rounded-lg flex items-center justify-center min-w-[120px] ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Actualizando...
              </>
            ) : (
              "Actualizar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
