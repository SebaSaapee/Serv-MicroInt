import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SERVICE} from 'src/common/models/models';
import { ServiceDTO } from './dto/service.dto';
import { IService } from 'src/common/interface/services.interface';


@Injectable()
export class ServiceService {

    constructor(@InjectModel(SERVICE.name) private readonly model:Model<IService>){}


async create(serviceDTO:ServiceDTO): Promise<IService>{
    const newUser = new this.model(serviceDTO);
    return await newUser.save()    
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


}
