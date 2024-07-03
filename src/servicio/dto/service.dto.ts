
import { IsNotEmpty, IsString } from "class-validator";


export class ServiceDTO{
    
    readonly nombre: string;
    readonly descripcion: string;
    readonly precio: number;
    readonly contacto: string;
    readonly fotos: string[];
    readonly user_id: string;
    readonly rating: number;
    readonly reviews: ReviewDTO[]
    
}

export class ReviewDTO {
    readonly userId: string;
    readonly rating: number;
    readonly comentario: string;
    readonly fecha: Date;
}
export class ChatDTO{
    readonly _id?:string;
    readonly userId:string;
    readonly nombreUsuario: string;
   
    readonly mensajeU :string;
    
    readonly prestadorServicio?: string;
   
    readonly respuesta?: string;
    readonly fecha: Date;
}