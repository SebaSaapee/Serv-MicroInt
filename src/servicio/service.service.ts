import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { POSTULACION, SERVICE, USER} from 'src/common/models/models';
import { ServiceDTO } from './dto/service.dto';
import { IService } from 'src/common/interface/services.interface';

import { IUser } from 'src/common/interface/user.interface';
import { IPostulacion } from 'src/common/interface/postulacion.interface';


@Injectable()
export class ServiceService {

    constructor(@InjectModel(SERVICE.name) private readonly model:Model<IService>,
    @InjectModel(USER.name) private readonly userModel: Model<IUser>,
    @InjectModel(POSTULACION.name) private readonly postulacionModel: Model<IPostulacion>,
                                                                        ){}


    async create(serviceDTO: ServiceDTO, userId: string): Promise<IService> {
        // Verificar si el usuario existe antes de proceder
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Asociar el ID de usuario al servicio que estás creando
        const newService = new this.model({
            ...serviceDTO,
            user_id: userId, // Asigna el ID del usuario al campo user_id del servicio
            rating: serviceDTO.rating || 0, // Default rating to 0 if not provided
        });

        // Guardar el servicio en la base de datos y retornar el resultado
        return await newService.save();
    }

async findAll(): Promise<IService[]>{
    return await this.model.find()
}

async findOne(id:string): Promise<IService>{
    return await this.model.findById(id);
}
async update(id:string, serviceDTO:ServiceDTO): Promise<IService>{
    const service = serviceDTO;
    return await this.model.findByIdAndUpdate(id, service, {new: true});
}
async delete(id:string){
    await this.model.findByIdAndDelete(id);
    return {status:HttpStatus.OK,msg:'deleted'}
}

async getAvailableHours(serviceId: string, date: Date): Promise<string[]> {
    try {
        console.log(date)
      // Buscar el servicio por su ID
      
      const service = await this.model.findById(serviceId).exec();
      if (!service) {
        throw new Error('Servicio no encontrado');
      }
      
      // Obtener todas las postulaciones para este servicio en la fecha solicitada
      const postulaciones = await this.postulacionModel.find({
        
        servicioId: serviceId,
        fechaSolicitada: { $eq: date }, // Asegúrate de que la fecha se compare correctamente
      }).exec();
      console.log(serviceId)
      // Verificar que se obtengan las postulaciones correctamente
      console.log('Postulaciones encontradas:', postulaciones);

      // Obtener los horarios ocupados de las postulaciones existentes
      const horariosOcupados = postulaciones.map(postulacion => postulacion.horarioSolicitado);
      console.log('Horarios ocupados:', horariosOcupados);

      // Todos los horarios disponibles (ejemplo)
      const todosLosHorarios = ['09:00', '10:00', '11:00', '12:00', '13:00']; // Ejemplo de todos los horarios disponibles
      
      // Filtrar los horarios disponibles
      const horariosDisponibles = todosLosHorarios.filter(horario => !horariosOcupados.includes(horario));

      console.log('Horarios disponibles:', horariosDisponibles);

      return horariosDisponibles;
    } catch (error) {
      throw new Error(`Error al obtener los horarios disponibles: ${error.message}`);
    }
  }


  async findTopRequested(): Promise<IService[]> {
    return await this.model.find().sort({ contadorSolicitudes: -1 }).limit(3).exec();
}


 async getTotalSales(servicioId: string): Promise<number> {
    try {
      const postulaciones = await this.postulacionModel.find({ servicioId: servicioId }).exec();

      let totalSales = 0;

      for (const postulacion of postulaciones) {
        const service = await this.model.findById(postulacion.servicioId).exec();
        if (service) {
          totalSales += service.precio;
        }
      }

      return totalSales;
    } catch (error) {
      throw new Error(`Error al calcular las ventas totales: ${error.message}`);
    }
  }


  async getMonthlySales(servicioId: string): Promise<{ month: number, total: number }[]> {
    try {
        // Buscar todas las postulaciones para el servicio dado
        const postulaciones = await this.postulacionModel.find({ servicioId: servicioId }).exec();

        // Crear un objeto para almacenar las ventas mensuales
        const monthlySales = {};

        for (const postulacion of postulaciones) {
            const service = await this.model.findById(postulacion.servicioId).exec();
            if (service) {
                const month = new Date(postulacion.fechaSolicitada).getMonth() + 1; // Obtener el mes de la fecha solicitada (getMonth() es 0-indexado)
                
                if (!monthlySales[month]) {
                    monthlySales[month] = 0;
                }

                // Sumar el precio del servicio a la venta mensual correspondiente
                monthlySales[month] += service.precio;
            }
        }
        // Convertir el objeto de ventas mensuales en un array
        const monthlySalesArray = Object.keys(monthlySales).map(month => ({
            month: parseInt(month, 10),
            total: monthlySales[month]
        }));

        return monthlySalesArray;
    } catch (error) {
        throw new Error(`Error al calcular las ventas mensuales: ${error.message}`);
    }
}

async getAnnualSales(servicioId: string): Promise<{ year: number, total: number }[]> {
  try {
      // Buscar todas las postulaciones para el servicio dado
      const postulaciones = await this.postulacionModel.find({ servicioId }).exec();

      // Crear un objeto para almacenar las ventas anuales
      const annualSales = {};

      for (const postulacion of postulaciones) {
          // Obtener el servicio asociado a la postulación
          const service = await this.model.findById(postulacion.servicioId).exec();
          if (service) {
              const year = new Date(postulacion.fechaSolicitada).getFullYear(); // Obtener el año de la fecha solicitada

              if (!annualSales[year]) {
                  annualSales[year] = 0;
              }

              annualSales[year] += service.precio;
          }
      }

      // Convertir el objeto annualSales en un array de objetos
      return Object.keys(annualSales).map(year => ({
          year: parseInt(year, 10),
          total: annualSales[year]
      }));
  } catch (error) {
      throw new Error(`Error al calcular las ventas anuales: ${error.message}`);
  }
}

async getTopServices(user_id: string): Promise<IService[]> {
  return await this.model.find({ user_id }).sort({ contadorSolicitudes: -1 }).limit(2).exec();
}
}
