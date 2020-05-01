import React, { useState} from 'react'
import ReactDOM from 'react-dom'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]) 
  const [ newInfo, setNewInfo] = useState({
    name: "",
    number: ""
  })
  const [filterName, setFilterName] = useState('')

  const handleFilter = (newValue)=> {
    setFilterName(newValue)  
    
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setNewInfo({
      ...newInfo,
      [event.target.name]: value
    });
  }
  const addPerson = (event) => {
    event.preventDefault()
    if(newInfo.name !== undefined){
      if(persons.some(person => person.name === newInfo.name)){
        alert(`${newInfo.name} is already added to phonebook`);
      } 
      else{
        const personObject = {
          name: newInfo.name,
          number: newInfo.number
        } 
        setPersons(persons.concat(personObject))
        setNewInfo('')
      }
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  value={filterName} onChange={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm values={newInfo} onChange={handleChange} onSubmit={addPerson} />  
      <h2>Numbers</h2>
      <Persons person={persons} filter={filterName}/>
        
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)