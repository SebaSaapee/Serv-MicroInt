import { Document } from 'mongoose';



export interface IService extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  contacto: string;
  fotos: string[]; // Array de URLs de las fotos
  user_id: string;
  rating: number;
  contadorSolicitudes: number;
 
}

