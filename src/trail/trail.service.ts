import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Trail} from "./trail.model";
import {CreateTrailDto} from "./dto/create-trail.dto";

@Injectable()
export class TrailService {

    constructor(@InjectModel(Trail) private TrailList: typeof Trail) {
    }

    async createTrail(dto:CreateTrailDto) {
        try{return await this.TrailList.create(dto)
        }catch (e) {
            throw new HttpException(`Маршрут не создан: ${e}`,HttpStatus.BAD_REQUEST)
        }

    }
    async getAllTrail() {
        return await this.TrailList.findAll();
    }
    async getOneByName(nameTrail:string) {
        try{
        const trail = await this.TrailList.findOne({where:{nameTrail}})
        return trail;
        }
        catch (e){
            throw new HttpException(`Ошибка поиска маршрута: ${e}`,400)
        }
    }
}
