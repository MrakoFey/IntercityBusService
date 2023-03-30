import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {BusesService} from "./buses.service";
import {CreateBusDto} from "./dto/create-bus.dto";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";

@Controller('buses')
export class BusesController {

    constructor(private busesService:BusesService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createBus(@Body() dto:CreateBusDto) {
        return this.busesService.createBus(dto)
    }

    @Get()
    getAllBus() {
        return this.busesService.getAllBus()
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    destroyBus(@Param('id') id:string) {
        return this.busesService.deleteBus(id)
    }
}
