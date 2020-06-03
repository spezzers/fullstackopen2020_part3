
const errorHandler = (error, req, res, next) => {
	// console.log('error:', error)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (error === 'noPerson') {
		return res.status(404).send({ error: 'No such person on record' })
	}
	if (error === 'noName') {
		return res.status(400).json({ error: 'missing name' })
	}
	if (error === 'noNumber') {
		return res.status(400).json({ error: 'missing number' })
	}
	if (error === 'notUnique') {
		return res.status(400).json({ error: 'name must be unique' })
	}
	next(error)
}



module.exports = errorHandler