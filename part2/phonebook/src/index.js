import React, { useState,  useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Notification from './component/Notification'

import personService from './services/persons'
import './index.css'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newInfo, setNewInfo] = useState({
    name: "",
    number: ""
  })
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessrMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    setSuccessrMessage(null)
    setErrorMessage(null)
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      
  }, [])
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
        let answer = window.confirm(`${newInfo.name} is already added to phonebook, replace the old number with a new one?`);
        const person = persons.find(n => n.name === newInfo.name)
        const changedInfo = { ...person, number: newInfo.number}
        if(answer === true){
          personService
              .update(changedInfo.id, changedInfo)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== changedInfo.id ? person : returnedPerson))
                setSuccessrMessage(`User ${newInfo.name} has changed number to: ${newInfo.number}`)
                setTimeout(() => {
                  setSuccessrMessage(null)
                }, 5000)
               
              })
              .catch(error => {
                console.log('test' ,error)
                setPersons(persons.filter(person => person.id !== changedInfo.id))
                setErrorMessage(`Information of ${newInfo.name} has already been removed from server`)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              }) 
        }  
      } 
      else{
        const personObject = {
          name: newInfo.name,
          number: newInfo.number
        } 
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewInfo('')
            setSuccessrMessage(`Added ${newInfo.name}`)
            setTimeout(() => {
              setSuccessrMessage(null)
            }, 5000)
    
          })
          
        
      }
    }
  }
  const removedPerson = id => {
    const person = persons.find(person => person.id === id)
    const deletedPerson = { ...person}

    personService
      .deleteId(id, deletedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson).filter(value => Object.keys(value).length !== 0))
      })
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success_message={successMessage} error_message={errorMessage}/>
      <Filter  value={filterName} onChange={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm values={newInfo} onChange={handleChange} onSubmit={addPerson} />  
      <h2>Numbers</h2>
      {persons
        .filter( contact =>contact.name.toLowerCase().includes(filterName)) 
        .map((contact, i) => 
          <Persons
            key={i}
            person={contact} 
            removedPerson={() => {if (window.confirm(`Delete ${contact.name} ?`)) removedPerson(contact.id)}}
          />
      )}
        
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)