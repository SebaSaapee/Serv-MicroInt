import * as mongoose from 'mongoose';



export const ServiceSchema = new mongoose.Schema(
  {
      nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        precio: { type: String, required: true },
        contacto: { type: String, required: true },
        fotos: [{ type: String }],
        rating: { type: Number, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        contadorSolicitudes: { type: Number, default: 0 },
   
  },
  { timestamps: true }
);

ServiceSchema.index({ nombre: 1 }, { unique: true });