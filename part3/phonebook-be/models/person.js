const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB

console.log('Connecting to url')

function phoneValidate(n) {
    return  /\d{3}-\d{3}-\d{4}/
}

mongoose.connect(url)
    .then(result => {
        console.log("CONNECTED")
    })
    .catch(err => {
        console.log("FAILED connecting to DB", err.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        require:true,
    },
    number: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        minLength: 8,
        required: true
    }
})
    
personSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)