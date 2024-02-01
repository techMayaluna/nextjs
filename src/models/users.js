import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipoPersona: {
    type: String,
    required: true,
  },
  tipoDocumento: {
    type: String,
    required: true,
  },
  identificacion: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
  },
  fechaVencimientoLicencia: {
    type: Date,
  },
  rol: {
    type: String,
    enum: ["Individual", "Colectivo", "admin"],
    default: "Individual",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  documentos: {
    type: [String],
    default: [],
  },
});

const User = models.User || model("User", userSchema);

export default User;
