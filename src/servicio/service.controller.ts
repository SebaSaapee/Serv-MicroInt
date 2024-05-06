import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDTO } from './dto/service.dto';
import { ServicesMSG } from 'src/common/constants';
import {MessagePattern, Payload} from '@nestjs/microservices'


@Controller()
export class ServiceController {
    constructor(private readonly serviceService:ServiceService){}

    @MessagePattern(ServicesMSG.CREATE)
    create(@Payload() serviceDTO:ServiceDTO){
        return this.serviceService.create(serviceDTO);    
    }
    @MessagePattern(ServicesMSG.FIND_ALL)
    findAll(){
        return this.serviceService.findAll();
    }
    @MessagePattern(ServicesMSG.FIND_ONE)
    findOne(@Payload() id:string){
        return this.serviceService.findOne(id);
    }

    @MessagePattern(ServicesMSG.UPDATE)
    update(@Payload() payload){
        return this.serviceService.update(payload.id,payload.productDTO);
    }

    @MessagePattern(ServicesMSG.DELETE)
    delete(@Payload() id:string){
        return this.serviceService.delete(id);
    }



}
