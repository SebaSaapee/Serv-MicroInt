
import { IsNotEmpty, IsString } from "class-validator";

export class ProductDTO{
    
    readonly nombre: string;
   
    readonly descripcion: string;
  
    readonly precio: string;
}