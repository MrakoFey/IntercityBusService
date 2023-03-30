import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePassengersDto} from "../passengers/dto/create-passengers.dto";
import {PassengersService} from "../passengers/passengers.service";
import * as bcrypt from 'bcryptjs'
import {Passengers} from "../passengers/passengers.model";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private PassengerService:PassengersService,private jwtService:JwtService) {
    }

    async login(passengerDto:CreatePassengersDto) {
        const passenger = await this.validatePassenger(passengerDto)
        return this.generateToken(passenger)
    }
    async registration(passengerDto: CreatePassengersDto) {
        const candidate = await this.PassengerService.getPassengerByLogin(passengerDto.login);
        if (candidate) {
            throw new HttpException('Пользователя с таким Login`om существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(passengerDto.password, 5);
        const passenger = await this.PassengerService.createPassenger({...passengerDto, password: hashPassword})
        return this.generateToken(passenger)
    }

    private async generateToken(passenger: Passengers) {
        const payload = {login: passenger.login, id: passenger.id, name: passenger.name, surname: passenger.surname}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validatePassenger(passengerDto: CreatePassengersDto) {
        const passenger = await this.PassengerService.getPassengerByLogin(passengerDto.login)
        const passwordValidate = await bcrypt.compare(passengerDto.password,passenger.password)
        if(passwordValidate && passenger){
            return passenger;
        }
        throw new HttpException('Не верный логин либо пароль',HttpStatus.FORBIDDEN)
    }
}
