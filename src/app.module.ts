import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { PassengersModule } from './passengers/passengers.module';
import {Passengers} from "./passengers/passengers.model";
import { BusesModule } from './buses/buses.module';
import {Buses} from "./buses/buses.model";
import { TrailModule } from './trail/trail.module';
import {Trail} from "./trail/trail.model";
import { AuthModule } from './auth/auth.module';
import {PassengersTrail} from "./passengers/passengers-trail";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Passengers,Buses,Trail,PassengersTrail],
      autoLoadModels:true
    }),
    PassengersModule,
    BusesModule,
    TrailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
