
export interface IPostulacion extends Document {
  servicioId: string;
  usuarioId: string;
  mensaje: string;
  fechaSolicitada: string;
  horarioSolicitado: string;
}