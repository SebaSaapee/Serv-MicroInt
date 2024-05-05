import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRODUCT } from 'src/common/models/models';
import { ProductDTO } from './dto/product.dto';
import { IProduct } from 'src/common/interface/product.interface';


@Injectable()
export class ProductService {

    constructor(@InjectModel(PRODUCT.name) private readonly model:Model<IProduct>){}


async create(productDTO:ProductDTO): Promise<IProduct>{
    const newUser = new this.model(productDTO);
    return await newUser.save()    
}

async findAll(): Promise<IProduct[]>{
    return await this.model.find()
}

async findOne(id:string): Promise<IProduct>{
    return await this.model.findById(id);
}
async update(id:string, productDTO:ProductDTO): Promise<IProduct>{
    const product = productDTO;
    return await this.model.findByIdAndUpdate(id, product, {new: true});
}
async delete(id:string){
    await this.model.findByIdAndDelete(id);
    return {status:HttpStatus.OK,msg:'deleted'}
}


}
