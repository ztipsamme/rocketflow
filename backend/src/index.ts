import dotenv from 'dotenv'
import pg from 'pg'
import cors from 'cors'
import express from 'express'
import path from 'path'
const port = process.env.PORT || 8080
const app = express()
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.json())

dotenv.config()

const client = new pg.Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
})

client.connect()

//
// const TasksTable = (
//     await client.query(`CREATE TABLE Tasks (
//   id uuid DEFAULT uuid_generate_v4 (),
//   task TEXT NOT NULL,
//   created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );`)
// ).rows

app.use(cors())

app.get('/api', async (req, res) => {
    const addTask = (await client.query(`SELECT * FROM Tasks;`)).rows
    res.send(addTask)
})

app.post('/api', async (req, res) => {
    const addTask = (
        await client.query(`INSERT INTO Tasks (task) VALUES ($1)`, [
            req.body.task,
        ])
    ).rows
    res.send(req.body.task)
})

app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})
