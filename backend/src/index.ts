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

app.delete('/api/', async (req, res) => {
  //Hämtar alla existerande rader i tabellen
  const getTask = (await client.query(`SELECT * FROM Tasks;`)).rows

  //kollar om någon av raderna matchar id:t som angets
  getTask.find(({ id }) => id === req.body.id)

  //Ta bort raden som matchar id:t
  await client.query('DELETE FROM Tasks WHERE id= $1', [req.body.id])

  res.send()
})
// Går igenom det igen
app.put('/api/', async (req, res) => {
  const getTask = (await client.query(`SELECT * FROM Tasks;`)).rows

  getTask.find(({ task }) => task === req.body.task)

  await client.query('PUT FROM Tasks WHERE task= $1', [req.body.task])



  res.send()
})




app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})
