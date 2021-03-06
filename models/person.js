const mongoose = require('mongoose')
require('mongoose-unique-validator')
/*global process*/
const url = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('successfully connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {type: String, minlength: 3, unique: true, required: true},
	number: {type: String, minlength: 8, required: true}
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)