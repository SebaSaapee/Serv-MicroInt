import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { POSTULACION, SERVICE, USER } from 'src/common/models/models';
import { ServiceSchema } from './schema/service.schema';
import { UserSchema } from './schema/user.schema';
import { PostulacionSchema } from './schema/postulacion.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name:SERVICE.name,
      useFactory:()=>ServiceSchema
      },
      {
        name: USER.name, // Nombre del modelo de usuario
        useFactory: () => UserSchema,
    }, {
      name: POSTULACION.name, // Nombre del modelo de postulacion
      useFactory: () => PostulacionSchema,
  }
    ])

  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  })
export class ServiceModule {}
