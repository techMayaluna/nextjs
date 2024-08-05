import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  nombre: String,
  numeroDeIdentificacion: String,
  correoElectronico: String,
  numeroDeContacto: String,
  direccionDeResidencia: String,
  ciudad: String,
  placaDelVehiculo: String,
  fechaDeReporte: Date,
  tipoDeAccidente: String,
  ubicacion: String,
  numeroDeHeridos: String,
  comoOcurrio: String,
  nombreTestigo: String,
  numeroTestigo: String,
  images: [String]
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;