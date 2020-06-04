const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const person_name =  process.argv[3]
const person_number =  process.argv[4]

const url =
  `mongodb+srv://taka:${password}@cluster0-cdoxc.mongodb.net/person?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: person_name,
    number: person_number
})
person.save().then(result => {
  console.log(`added ${person_name} number ${person_number} to phonebook`)
  mongoose.connection.close()
})

Person.find({}).then(result => {
    console.log("phonebook:")
    
    result.forEach(function(person, idx, array){
        
        if(person.name !== undefined && person.number !== undefined){
            console.log(`${person.name} ${person.number}`)
        }
      
    })
    mongoose.connection.close()
})