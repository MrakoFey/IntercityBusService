import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { PassengersService } from './passengers.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Passengers} from "./passengers.model";
import {TrailModule} from "../trail/trail.module";
import {Trail} from "../trail/trail.model";
import {PassengersTrail} from "./passengers-trail";

@Module({
  controllers: [PassengersController],
  providers: [PassengersService],
  imports:[
    SequelizeModule.forFeature([Passengers,Trail,PassengersTrail]),
      TrailModule
  ],
  exports: [PassengersService]
})
export class PassengersModule {}
