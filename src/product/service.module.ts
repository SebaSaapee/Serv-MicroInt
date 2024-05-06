import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SERVICE } from 'src/common/models/models';
import { ServiceSchema } from './schema/service.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name:SERVICE.name,
      useFactory:()=>ServiceSchema
      }
    ])

  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  })
export class ServiceModule {}
