import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const client = new pg.Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
})

client.connect()

const TasksTable = (
    await client.query(`CREATE TABLE Tasks (
  id uuid DEFAULT uuid_generate_v4 (),
  task TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`)
).rows
