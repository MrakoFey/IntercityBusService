import {forwardRef, Module} from '@nestjs/common';
import { TrailController } from './trail.controller';
import { TrailService } from './trail.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Trail} from "./trail.model";
import {AuthModule} from "../auth/auth.module";
import {Passengers} from "../passengers/passengers.model";
import {Buses} from "../buses/buses.model";
import {PassengersTrail} from "../passengers/passengers-trail";

@Module({
  controllers: [TrailController],
  providers: [TrailService],
  imports: [
      SequelizeModule.forFeature([Trail,Passengers,Buses,PassengersTrail]),
      forwardRef(() => AuthModule)
  ],
    exports: [TrailService]

})
export class TrailModule {}
