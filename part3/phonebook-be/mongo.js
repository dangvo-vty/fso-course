const mongoose = require('mongoose')

var arg = process.argv

if (arg.length < 3 )  {
    return console.log('must provide password')
}

const password = arg[2]
const name = arg[3]
const number = arg[4]


async function run() {
    try {
        await mongoose.connect(url,clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("CONNECTED TO DATABASE")
    } finally {
        console.log('')
    }}

run().catch(console.dir);




if (name && number) {
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number: ${number} to phonebook`)
        mongoose.connection.close()
    })
}

if (arg.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        });
        mongoose.connection.close()

    })
}