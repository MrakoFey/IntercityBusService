import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {TrailService} from "./trail.service";
import {CreateTrailDto} from "./dto/create-trail.dto";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";

@Controller('trail')
export class TrailController {

    constructor(private trailService:TrailService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createTrail(@Body() trailDto:CreateTrailDto) {
        return this.trailService.createTrail(trailDto)
    }
    @Get()
    getAllTrail() {
        return this.trailService.getAllTrail()
    }
}
