import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phonebookService from './services/phonebookservice'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersonList => {
        setPersons(initialPersonList)
      })
},[])

  const addInfo = (event) => {
    event.preventDefault()
    const nameList = {
      name: newName,
      //id: persons.length + 1,
      number: newNumber
    }

    if (persons.reduce((start,persons) => ((newName === persons.name)||start) ? true:false,false)) {
      const personToUpdate = persons.filter(person => person.name === newName)
      if (personToUpdate[0].number !== newNumber){
        if (window.confirm(`${personToUpdate[0].name} is already added to phonebook, replace the old number with a new one?`)){
          phonebookService
          .update(personToUpdate[0].id, nameList)
          .then(updated => {
            setPersons(persons.map(person => person.id != personToUpdate[0].id ? person : updated))
            setNewName('')
            setNewNumber('')
          })
        }
      }
      else{
      setNewName('')
      setNewNumber('')
      window.alert(`${newName} and is already added to phonebook`)
      }
    }
    else{
    phonebookService
      .create(nameList)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      
    }
  }
  const removePerson = (id) => {
    const personToRemove = persons.filter(person => person.id === id)
    console.log(personToRemove)
    if (window.confirm(`Delete ${personToRemove[0].name}?`)){
      phonebookService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id != id))
      })
    }
  }


  const handleSearch = (event) => setSearch(event.target.value)
  

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  

  const handleNameChange = (event) => setNewName(event.target.value)
  

  return (
    <div onSubmit={addInfo}>
      <h2>Phonebook</h2>
      
      <Filter searchName ={searchName} handleSearch ={handleSearch}/>

      <h2>Add a new</h2>
      <PersonForm  newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons = {persons} searchName = {searchName} removePerson = {removePerson}/>
    
    </div>
  )
}

export default App