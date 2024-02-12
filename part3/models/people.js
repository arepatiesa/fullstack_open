const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb+srv://carlosmosorio:hfayfiyh95@cluster0.limedqo.mongodb.net/phonebook?retryWrites=true&w=majority`

console.log('Connecting to', url);

mongoose.set('strictQuery', false)
mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
})

let validNumber = (number) => {
    return /^\d{2,3}-\d+$/.test(number)
} 

let custom = [validNumber, "Invalid phonenumber"]

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: custom,
        required: true,
    },
})

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('People', peopleSchema)