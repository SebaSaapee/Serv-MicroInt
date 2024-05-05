import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { ProductosMSG } from 'src/common/constants';
import {MessagePattern, Payload} from '@nestjs/microservices'


@Controller()
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @MessagePattern(ProductosMSG.CREATE)
    create(@Payload() productDTO:ProductDTO){
        return this.productService.create(productDTO);    
    }
    @MessagePattern(ProductosMSG.FIND_ALL)
    findAll(){
        return this.productService.findAll();
    }
    @MessagePattern(ProductosMSG.FIND_ONE)
    findOne(@Payload() id:string){
        return this.productService.findOne(id);
    }

    @MessagePattern(ProductosMSG.UPDATE)
    update(@Payload() payload){
        return this.productService.update(payload.id,payload.productDTO);
    }

    @MessagePattern(ProductosMSG.DELETE)
    delete(@Payload() id:string){
        return this.productService.delete(id);
    }



}
