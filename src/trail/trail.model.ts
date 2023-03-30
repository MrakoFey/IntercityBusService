import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Buses} from "../buses/buses.model";
import {Passengers} from "../passengers/passengers.model";
import {PassengersTrail} from "../passengers/passengers-trail";

interface trailCreationAttrs{
    nameTrail: string;
    pointA: string;
    pointB: string;
    capacityTrail: number;
    busesId: number;
}
@Table({tableName:'trail'})
export class Trail extends Model<Trail,trailCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    nameTrail: string;

    @Column({type: DataType.STRING, allowNull: false})
    pointA: string;

    @Column({type: DataType.STRING, allowNull: false})
    pointB: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    capacityTrail: number;

    @ForeignKey(() => Buses)
    @Column({type:DataType.INTEGER})
    busesId:number;

    @BelongsTo(() => Buses)
    buses: Buses;

    @BelongsToMany(() => Passengers,() =>PassengersTrail)
    passengers: Passengers;
}