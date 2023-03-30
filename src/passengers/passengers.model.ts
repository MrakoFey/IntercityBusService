import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Trail} from "../trail/trail.model";
import {PassengersTrail} from "./passengers-trail";

interface PassengersCreationAttrs{
    login:string;
    password:string;
    name:string;
    surname:string;
}

@Table({tableName:'passengers'})
export class Passengers extends Model<Passengers,PassengersCreationAttrs> {
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    login:string;

    @Column({type:DataType.STRING, allowNull:false})
    password:string;

    @Column({type:DataType.STRING, allowNull:false})
    name:string;

    @Column({type:DataType.STRING, allowNull:false})
    surname:string;

    @BelongsToMany(() => Trail,() => PassengersTrail)
    trails: Trail[];
}