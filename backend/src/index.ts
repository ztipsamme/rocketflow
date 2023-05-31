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
// `CREATE TABLE Tasks ( id uuid DEFAULT uuid_generate_v4 (), title TEXT NOT NULL, description TEXT, status INTEGER DEFAULT 0, created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );`

// ({
// {
//     id: '97eb9ef5-4a95-48d8-a028-46194eea8ac3',
//     title: 'Styleguide guide handover',
//     description:
//         'Send Figma file to developers and give full access to edit the file.',
//     status: 0,
//     created: '2023-05-19T18:06:58.307Z',
// },
// {
//     id: '0249703a-d55d-42ee-8d0c-22afe013990d',
//     title: 'Choose fonts',
//     description: 'Choose one font for headers, body and label.',
//     status: 0,
//     created: '2023-05-19T18:08:40.008Z',
// },
// {
//     id: 'c8c00f3e-534a-411b-b3b9-4600aa389aa4',
//     title: 'Create ad',
//     description: 'Design the ad details describes in the word file.',
//     status: 0,
//     created: '2023-05-19T18:09:12.347Z',
// },
// {
//     id: '2251f5a6-7f0e-4cb0-80b6-e28e06b1dbd3',
//     title: 'Collect data',
//     description: 'Collect survey data from all sources.',
//     status: 0,
//     created: '2023-05-19T18:09:42.499Z',
// },
// {
//     id: '65814db8-bf92-405b-ab26-130ad1b08c72',
//     title: 'Send skiss',
//     description: 'Send the skiss to President.',
//     status: 0,
//     created: '2023-05-19T18:10:02.479Z',
// },
// {
//     id: 'c60beb04-c4ff-41d1-b0fd-d2e4e2a1d05d',
//     title: 'Check emails',
//     description: 'Send mails to Adrian and Jenna. Answer mails.',
//     status: 0,
//     created: '2023-05-19T18:10:31.323Z',
// })

app.use(cors())

app.get('/api/get-tasks', async (req, res) => {
    try {
        const getTask = (await client.query(`SELECT * FROM Tasks;`)).rows
        res.status(200).send(getTask)
    } catch (error) {
        res.status(400).send({ Error: error })
    }
})

app.get('/api/get-task-status', async (req, res) => {
    const status = Number(req.query.status)

    try {
        if (
            Object.keys(req.query).length !== 1 ||
            status === undefined ||
            status < 0 ||
            status > 3
        )
            throw new SyntaxError('Invalid')

        const getToDo = (
            await client.query(`SELECT * FROM Tasks WHERE status=$1`, [status])
        ).rows
        res.status(200).send(getToDo)
    } catch (error: any) {
        res.status(400).send({ Error: error.message })
    }
})

app.post('/api/add-task', async (req, res) => {
    try {
        console.log(req.body.title + ' ' + req.body.description)
        await client.query(
            `INSERT INTO Tasks (title, description) VALUES ($1, $2)`,
            [req.body.title, req.body.description]
        )
        res.status(200).send('Added ' + req.body)
    } catch (error) {
        res.status(400).send({ Error: error })
    }
})

app.put('/api/update-task-info', async (req, res) => {
    try {
        const getTasks = (await client.query(`SELECT * FROM Tasks;`)).rows

        getTasks.find(({ id }) => id === req.body.id)

        await client.query(
            'UPDATE Tasks SET title=$1, description=$2 WHERE id=$3',
            [req.body.title, req.body.description, req.body.id]
        )

        res.status(200).send({ message: 'Changes ' + req.body.id })
    } catch (error) {
        res.status(400).send({ Error: error, Req: req.body })
    }
})

app.put('/api/update-task-status', async (req, res) => {
    try {
        const getTasks = (await client.query(`SELECT * FROM Tasks;`)).rows

        getTasks.find(({ id }) => id === req.body.id)

        await client.query('UPDATE Tasks SET status=$1 WHERE id=$2', [
            req.body.status,
            req.body.id,
        ])

        res.status(200).send({ message: 'Changes ' + req.body.id })
    } catch (error) {
        res.status(400).send({ Error: error })
    }
})

app.delete('/api/delete-task', async (req, res) => {
    try {
        const getTasks = (await client.query(`SELECT * FROM Tasks;`)).rows

        getTasks.find(({ id }) => id === req.body.id)

        await client.query('DELETE FROM Tasks WHERE id= $1', [req.body.id])

        res.status(200).send({ message: 'Deleted ' + req.body.id })
    } catch (error) {
        res.status(400).send({ Error: error })
    }
})

app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})
