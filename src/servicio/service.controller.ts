import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDTO } from './dto/service.dto';
import { ServicesMSG } from 'src/common/constants';
import {MessagePattern, Payload} from '@nestjs/microservices'



@Controller()
export class ServiceController {
    private readonly logger = new Logger(ServiceController.name);
    constructor(private readonly serviceService:ServiceService){}

    @MessagePattern(ServicesMSG.CREATE)
    async create(@Payload() payload: { serviceDTO: ServiceDTO, userId: string }) {
        const { serviceDTO, userId } = payload;

        try {
            const createdService = await this.serviceService.create(serviceDTO, userId);
            return { message: 'Service created successfully', service: createdService };
        } catch (error) {
            this.logger.error(`Error creating service: ${error.message}`);
            throw error; // Propagate the error to handle it properly
        }
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
