import express from 'express'
import bodyParser from 'body-parser'
import tasksRoutes from './routes/tasks.routes.js'
const port = process.env.PORT || 8080
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/tasks', tasksRoutes)

app.get('/api', async (req, res) => {
    res.status(200).json({
        message: 'Hello World',
    })
})

app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})
