import { Model, Sequelize, DataTypes } from 'sequelize'
export default class Task extends Model {
    public id?: number
    public task?: string
    public created?: string
}
export const TaskMap = (sequelize: Sequelize) => {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            task: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            created: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: new Date().getDate(),
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
