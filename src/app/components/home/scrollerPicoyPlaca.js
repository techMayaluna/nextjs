import { getDiaHoy } from "../../utils/todayDay";

export default function ScrollerPicoyPlaca({ ciudad }) {
  let diaHoy = getDiaHoy();

  return (
    <div className="flex flex-col text-center">
      Prepara tu semana en <>{ciudad?.nombre}</>
      <div className="mb-2">
        {ciudad?.reglas?.map((regla) => (
          <div
            key={regla.dia}
            className={`flex justify-between ${
              regla.dia === diaHoy ? "font-bold" : ""
            }`}
          >
            <span>{regla.dia}</span>
            <span>{regla.placas ? regla.placas : "No aplica"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
