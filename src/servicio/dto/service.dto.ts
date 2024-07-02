
import { IsNotEmpty, IsString } from "class-validator";


export class ServiceDTO{
    
    readonly nombre: string;
    readonly descripcion: string;
    readonly precio: number;
    readonly contacto: string;
    readonly fotos: string[];
    readonly user_id: string;
    readonly rating: number;
    
    
    

}