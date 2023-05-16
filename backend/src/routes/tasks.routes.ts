import express from 'express'
import Task, { TaskMap } from '../models/task.js'
import database from '../database.js'
const router = express.Router()

// GET - tasks
router.get('/', async (req, res) => {
    TaskMap(database)
    const result = await Task.findAll()
    res.status(200).json({ tasks: result })
})

export default router
