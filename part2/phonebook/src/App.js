import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
  })
},[])

  const addInfo = (event) => {
    event.preventDefault()
    const nameList = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    if (persons.reduce((start,persons) => ((newName === persons.name)||start) ? true:false,false)) {
      setNewName('')
      setNewNumber('')
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(nameList))
      setNewName('')
      setNewNumber('')
      
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
      <Persons persons = {persons} searchName = {searchName}/>
    
    </div>
  )
}

export default App