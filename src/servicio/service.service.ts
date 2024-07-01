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
}
