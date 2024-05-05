import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT } from 'src/common/models/models';
import { ProductSchema } from './schema/product.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name:PRODUCT.name,
      useFactory:()=>ProductSchema
      }
    ])

  ],
  controllers: [ProductController],
  providers: [ProductService],
  })
export class ProductModule {}
