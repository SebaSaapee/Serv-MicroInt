import * as mongoose from 'mongoose';

export const PostulacionSchema = new mongoose.Schema(
  {
    servicioId: { type: String, required: true },
    usuarioId: { type: String, required: true },
    mensaje: { type: String, required: true },
    fechaSolicitada: { type: String, required: true },
    horarioSolicitado: { type: String, required: true },
  },
  { timestamps: true },
);

