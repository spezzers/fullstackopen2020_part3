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


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})



const port = 3001

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})