import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Passengers} from "./passengers.model";
import {CreatePassengersDto} from "./dto/create-passengers.dto";
import {BuyTicketsDto} from "./dto/buy-tickets.dto";
import {TrailService} from "../trail/trail.service";


@Injectable()
export class PassengersService {

    constructor(@InjectModel(Passengers) private PassengersList: typeof Passengers,private trailService:TrailService) {
    }

    async createPassenger(dto: CreatePassengersDto) {
        try{
            return await this.PassengersList.create(dto);
        }
        catch (e) {
            throw new HttpException(`Пользователь не создался: ${e}`,HttpStatus.BAD_REQUEST)
        }
    }

    async getAllPassengers() {
        return await this.PassengersList.findAll({include:{all:true}});
    }

    async getPassengerByLogin(login:string) {
        return await this.PassengersList.findOne({where: {login},include: {all: true}})
    }

    async buyTicket(dto:BuyTicketsDto) {
        try{
        const passenger = await this.PassengersList.findByPk(dto.passengerId)
        const trail = await this.trailService.getOneByName(dto.nameTrail)
        if(trail && passenger){
            if(trail.capacityTrail > 0)
            {
                trail.capacityTrail = trail.capacityTrail - 1
                await passenger.$add('trails', trail.id)
                await trail.save();
                return dto
            }
            throw new HttpException('На данный маршрут мест нет!', HttpStatus.NOT_FOUND);
        }
            throw new HttpException('Пассажир либо маршрут не найдены',400)
        }catch (e) {
            throw new HttpException(`Что-то не так с покупкой: ${e}`,400)
        }
    }
}
