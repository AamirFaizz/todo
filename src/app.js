

const express = require('express')
const noteModel = require('./model/note.model')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())


const notes = []

app.post('/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: 'note create',
        note
    })
})

app.get('/notes', async (req, res) => {
    const note = await noteModel.find()

    res.status(200).json({
        message: 'note fetch',
        note
    })
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: 'note delete'
    })
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id
    const { title } = req.body

    await noteModel.findByIdAndUpdate(id, { title })

    res.status(200).json({
        message: 'note update'
    })
})

app.use('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app