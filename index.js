const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')
app.use(express.static('build'))
app.use(cors())
morgan.token('reqBody', (req, res) => JSON.stringify(req.body))
app.use(express.json())
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :reqBody'
	)
)

/////// VARIABLES & FUNCTIONS //////////////

let persons = [
	// {
	// 	name: 'Bobby Mason',
	// 	number: '01213555678',
	// 	id: 1
	// },
	// {
	// 	name: 'Carl Slazenger',
	// 	number: '0784321376',
	// 	id: 2
	// },
	// {
	// 	name: 'Tonya Garrison',
	// 	number: '07312957410',
	// 	id: 3
	// },
	// {
	// 	name: 'Betty Edwards',
	// 	number: '07533747598',
	// 	id: 4
	// },
	// {
	// 	name: 'Gordon Goodie',
	// 	number: '07759157826',
	// 	id: 5
	// },
	// {
	// 	name: 'Melinda Fencely',
	// 	number: '07435195229',
	// 	id: 6
	// }
]

const info = `<p>Phonebook has info for ${
	persons.length
} people</p><p>${new Date()}</p>`

// const generateId = () => {
// 	return Math.floor(Math.random() * 10000000000)
// }

/////   R E Q U E S T S   //////////////////////

// _______________ root _______________

app.get('/', (req, res) => {
	res.send(`<h1>Phonebook</h1>
    <ul>
	<li>
	<a href="/info">Info</a>
	</li>
	<li>
	<a href="/api/persons">Persons</a>
	</li>
    </ul>
	`)
})

// _______________ /info _______________

app.get('/info', (req, res) => {
	return res.send(info)
})

// _______________ /api/persons _______________

app.get('/api/persons', (req, res) => {
	Person.find({}).then(people => {
		res.json(people)
		persons = JSON.parse(JSON.stringify(people))
	})
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body
	if (!body.name) {
		next('noName')
	} else if (!body.number) {
		next('noNumber')
	} else if (persons.map(p => p.name).includes(body.name)) {
		next('notUnique')
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})
	person.save().then(savedPerson => {
		res.json(savedPerson)
	})
})

// _______________ /api/persons/:id _______________

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				return res.json(person)
			} else {
				next('noPerson')
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndUpdate(req.body.id, req.body, { new: true })
		.then(result => {
			res.json(result)
		})
		.catch(error => next(error))
})

//===========================================

const errorHandler = require('./modules/errorHandler')
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`)
})
