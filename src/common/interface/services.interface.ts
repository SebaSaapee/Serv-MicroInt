export interface IService extends Document{
    nombre: string;
    descripcion: string;
    precio: string;
    contacto: string;
    fotos: string[]; // Array de URLs de las fotos
 }