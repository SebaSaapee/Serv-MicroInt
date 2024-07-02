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
  reviews: IReview[];
}
interface IReview {
  userId: string; // ID del usuario que deja la review
  rating: number; // Puntuación de 1 a 5 estrellas
  comentario: string; // Comentario opcional
  fecha: Date; // Fecha en que se dejó la review
}
