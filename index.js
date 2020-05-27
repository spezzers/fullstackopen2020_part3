const express = require('express')
const app = express()



let persons = [
    {
        name: "Bobby Mason",
        number: "01213555678",
        id: 1
    },
    {
        name: "Carl Slazenger",
        number: "0784321376",
        id: 2
    },
    {
        name: "Tonya Garrison",
        number: "07312957410",
        id: 3
    },
    {
        name: "Betty Edwards",
        number: "07533747598",
        id: 4
    },
    {
        name: "Gordon Goodie",
        number: "07759157826",
        id: 5
    },
    {
        name: "Melinda Fencely",
        number: "07435195229",
        id: 6
    },
]
const port = 3001

const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`


app.get('/', (req, res) => {
    res.send(`<h1>Phonebook</h1>
    <ul>
        <li>
            <a target="_blank" href="http://localhost:${port}/info">Info</a>
        </li>
        <li>
            <a target="_blank" href="http://localhost:${port}/api/persons">Persons</a>
        </li>
    </ul>
            `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    res.send(info)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end(console.log("no person found"))
})




app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})