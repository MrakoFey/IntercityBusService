import { Module } from '@nestjs/common';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Buses} from "./buses.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [BusesController],
  providers: [BusesService],
  imports: [
      SequelizeModule.forFeature([Buses]),
      AuthModule,
      JwtModule
  ]

})
export class BusesModule {}
