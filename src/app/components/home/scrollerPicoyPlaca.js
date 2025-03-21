import { useState } from "react";
import { getDiaHoy } from "../../utils/todayDay";

export default function ScrollerPicoyPlaca({ ciudad }) {
  const [ciudadScroller, setCiudadScroller] = useState(ciudad);

  let diaHoy = getDiaHoy();

  console.log("ciudadScroller", ciudadScroller);

  return (
    <div className="flex flex-col text-center">
      Prepara tu semana en <>{ciudad.nombre}</>
      <div className="mb-2">
        {ciudadScroller.reglas?.map((regla) => (
          <div
            key={regla.dia}
            className={`flex justify-between ${
              regla.dia === diaHoy ? "font-bold" : ""
            }`}
          >
            <span>{regla.dia}</span>
            <span>
              {Array.isArray(regla.placas)
                ? regla.placas.join("-")
                : regla.placas}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
