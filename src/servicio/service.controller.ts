import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ChatDTO, ReviewDTO, ServiceDTO } from './dto/service.dto';
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
    update(@Payload() payload: { id: string, serviceDTO: ServiceDTO }) {
        return this.serviceService.update(payload.id, payload.serviceDTO);
    }

    @MessagePattern(ServicesMSG.DELETE)
    delete(@Payload() id:string){
        return this.serviceService.delete(id);
    }

    @MessagePattern(ServicesMSG.GET_AVAILABLE_HOURS)
    async getAvailableHours(@Payload() payload: { serviceId: string, date: Date }) {
        const { serviceId, date } = payload;
        return this.serviceService.getAvailableHours(serviceId, date);
    }
    @MessagePattern(ServicesMSG.FIND_TOP_REQUESTED)
    async findTopRequested() {
        return this.serviceService.findTopRequested();
    }
    @MessagePattern(ServicesMSG.GET_TOTAL_SALES)
    async getTotalSales(@Payload() servicioId: string) {
        return this.serviceService.getTotalSales(servicioId);
    }

    @MessagePattern(ServicesMSG.GET_MONTHLY_SALES)
    async getMonthlySales(@Payload() servicioId: string) {
        return this.serviceService.getMonthlySales(servicioId);
    }

    @MessagePattern(ServicesMSG.GET_ANNUAL_SALES)
    async getAnnualSales(@Payload() servicioId: string) {
        return this.serviceService.getAnnualSales(servicioId);
    }

    @MessagePattern(ServicesMSG.GET_TOP_SERVICES)
    async getTopServices(@Payload() userId: string) {
        return this.serviceService.getTopServices(userId);
    }

    @MessagePattern(ServicesMSG.ADD_REVIEW)
    async addReview(@Payload() payload: { serviceId: string, reviewDTO: ReviewDTO , usuarioId:string}) {
        const { serviceId, reviewDTO , usuarioId } = payload;

        try {
            const updatedService = await this.serviceService.addReview(serviceId, reviewDTO,usuarioId);
            return { message: 'Review added successfully', service: updatedService };
        } catch (error) {
            this.logger.error(`Error adding review: ${error.message}`);
            throw error; // Propagate the error to handle it properly
        }
    }

    @MessagePattern(ServicesMSG.FIND_BY_USER)
    findByUser(@Payload() userId: string) {
        return this.serviceService.findByUser(userId);
    }


    @MessagePattern(ServicesMSG.GET_REVIEWS)
     getReviews(@Payload() serviceId: string) {
        return this.serviceService.getReviews(serviceId);
    }

    @MessagePattern(ServicesMSG.ADD_CHAT_MESSAGE)
    async addChat(@Payload() payload: { serviceId: string, chatDTO: ChatDTO , userId:string}) {
        
        const { serviceId, chatDTO , userId } = payload;
        console.log(payload)
        try {
            const updatedService = await this.serviceService.addChat(serviceId, chatDTO,userId);
            return { message: 'message added successfully', service: updatedService };
        } catch (error) {
            this.logger.error(`Error adding chat: ${error.message}`);
            throw error; // Propagate the error to handle it properly
        }
    }
    @MessagePattern(ServicesMSG.GET_CHATS)
     getChats(@Payload() serviceId: string) {
        return this.serviceService.getChats(serviceId);
    }

    @MessagePattern(ServicesMSG.UPDATE_CHAT)
  async updateChat(@Payload() payload: { serviceId: string, chatId: string, chatDTO: ChatDTO }) {
    const { serviceId, chatId, chatDTO } = payload;
    try {
      const updatedService = await this.serviceService.updateChat(serviceId, chatId, chatDTO);
      return { message: 'Chat updated successfully', service: updatedService };
    } catch (error) {
      this.logger.error(`Error updating chat: ${error.message}`);
      throw error;
    }
  }

}


