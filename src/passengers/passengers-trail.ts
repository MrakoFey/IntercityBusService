import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Passengers} from "./passengers.model";
import {Trail} from "../trail/trail.model";


@Table({tableName:'passengers_trail', createdAt:false, updatedAt:false})
export class PassengersTrail extends Model<PassengersTrail> {
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ForeignKey(()=>Passengers)
    @Column({type:DataType.INTEGER})
    passengersId:number;

    @ForeignKey(()=>Trail)
    @Column({type:DataType.INTEGER})
    trailId:number;

}