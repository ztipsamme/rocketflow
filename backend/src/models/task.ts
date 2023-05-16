import { Model, Sequelize, DataTypes } from 'sequelize'
export default class Task extends Model {
    public id?: number
    public name!: string
    public birthdate?: Date
    public country?: string
}
export const TaskMap = (sequelize: Sequelize) => {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
            },
            birthdate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'Tasks',
            timestamps: false,
        }
    )
    Task.sync()
}
