import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Buses} from "./buses.model";
import {CreateBusDto} from "./dto/create-bus.dto";

@Injectable()
export class BusesService {

    constructor(@InjectModel(Buses) private BusesList: typeof Buses) {
    }

    async createBus(dto:CreateBusDto) {
        try {
            return await this.BusesList.create(dto)
        }catch (e) {
            throw new HttpException(`Автобус не создаётся :) ну или смотри че выдаёт ${e} понял???`,HttpStatus.NOT_FOUND)
        }

    }
    async getAllBus() {
        return await this.BusesList.findAll({include:{all:true}})
    }
    async deleteBus(id) {
        try
        {
            const bus = await this.BusesList.findByPk(id)
            await bus.destroy()
            return `Автобус с id:${id} удалён!!!`
        }catch (e) {
            throw new HttpException(`Автобус не удаляется :) ну или смотри че выдаёт ${e}  понял???`,HttpStatus.NOT_FOUND)
        }
    }
}
