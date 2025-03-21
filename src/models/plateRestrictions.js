import { Schema, model, models } from "mongoose";

const plateRestrictionSchema = new Schema({
  nombre: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  reglas: [
    {
      dia: { type: String, required: true },
      placas: { type: String, default: " " },
    },
  ],
});

const PlateRestriction =
  models.PlateRestriction || model("PlateRestriction", plateRestrictionSchema);

export default PlateRestriction;

// //  {
//   nombre: "Medellín",
//   reglas: [
//     {
//       dia: "Lunes",
//       placas: ["7", "1"],
//     },
//     {
//       dia: "Martes",
//       placas: ["3", "0"],
//     },
//     {
//       dia: "Miércoles",
//       placas: ["4", "6"],
//     },
//     {
//       dia: "Jueves",
//       placas: ["5", "9"],
//     },
//     {
//       dia: "Viernes",
//       placas: ["8", "2"],
//     },
//     {
//       dia: "Sábado",
//       placas: "No aplica",
//     },
//     {
//       dia: "Domingo",
//       placas: "No aplica",
//     },
//   ],
// },
