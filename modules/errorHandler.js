
const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		console.log('ERROR!!', error.message)
		return res.status(400).send(`${error.message}`)
	}
	if (error.name === 'MongoError') {
		return res.status(400).send(`${error.keyValue.name} is already in the database`)
	}
	
	next(error)
}



module.exports = errorHandler