import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreatePassengersDto} from "../passengers/dto/create-passengers.dto";


@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {
    }

    @Post('/login')
    login(@Body() passengerDto:CreatePassengersDto) {
        return this.authService.login(passengerDto)
    }
    @Post('/registration')
    registration(@Body() userDto: CreatePassengersDto) {
        return this.authService.registration(userDto)
    }

}
