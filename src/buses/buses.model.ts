import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Trail} from "../trail/trail.model";


interface BusesCreationAttrs {
    busName:string;
    capacity:string;
}

@Table({tableName:'buses'})
export class Buses extends Model<Buses,BusesCreationAttrs> {
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    busName:string;

    @Column({type:DataType.INTEGER, allowNull:false})
    capacity:number;

    @HasMany(() => Trail)
    trails: Trail[];
}