import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export default new Sequelize({
    dialect: 'postgres',
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    username: process.env.PGUSER,
})
