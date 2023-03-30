import {Body, Controller, Get, Post} from '@nestjs/common';
import {PassengersService} from "./passengers.service";
import {CreatePassengersDto} from "./dto/create-passengers.dto";
import {BuyTicketsDto} from "./dto/buy-tickets.dto";

@Controller('passengers')
export class PassengersController {

    constructor(private PassengerService:PassengersService) {}

    @Post()
    createPassenger(@Body() passengerDto: CreatePassengersDto) {
        return this.PassengerService.createPassenger(passengerDto)
    }
    @Get()
    getAllPassengers() {
        return this.PassengerService.getAllPassengers()
    }
    @Get('/one')
    getOneByLogin(@Body() passengerDto: CreatePassengersDto) {
        return this.PassengerService.getPassengerByLogin(passengerDto.login)
    }

    @Post('/buyTicket')
    buyTicket(@Body() dto: BuyTicketsDto) {
        return this.PassengerService.buyTicket(dto)
    }


}
