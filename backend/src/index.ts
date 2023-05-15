import cors from 'cors'
import express from 'express'
import path from 'path'

const app = express()

app.use(cors())

app.get('/api', (_request, response) => {
    response.send({ hello: 'World' })
})

app.use(express.static(path.join(path.resolve(), 'public')))

app.listen(3000, () => {
    console.log('Redo på http://localhost:3000/')
})
