
const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		return res.status(404).send(`${error.message}`)
	}
	if (error.name === 'MongoError') {
		return res.status(400).send(`${error.keyValue.name} is already in the database`)
	}
	
	next(error)
}



module.exports = errorHandler