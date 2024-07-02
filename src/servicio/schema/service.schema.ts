import * as mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
  }
);

export const ServiceSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    contacto: { type: String, required: true },
    fotos: [{ type: String }],
    rating: { type: Number, default: 0  },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contadorSolicitudes: { type: Number, default: 0 },
    reviews: [ReviewSchema] // Campo para almacenar las reviews
  },
  { timestamps: true }
);

ServiceSchema.index({ nombre: 1 }, { unique: true });