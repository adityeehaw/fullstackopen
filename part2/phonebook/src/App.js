import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')
  const [personList, setPersonList] = useState(persons)

  const addInfo = (event) => {
    event.preventDefault()
    const nameList = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    if (persons.reduce((start,persons) => newName === persons.name ? true:false,false)) {
      setNewName('')
      setNewNumber('')
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(nameList))
      setPersonList(persons.concat(nameList))
      setNewName('')
      setNewNumber('')
      
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const some = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersonList(some)
  }

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  

  const handleNameChange = (event) => setNewName(event.target.value)
  

  return (
    <div onSubmit={addInfo}>
      <h2>Phonebook</h2>
      
      <Filter searchName ={searchName} handleSearch ={handleSearch}/>

      <h2>Add a new</h2>
      <PersonForm  newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personList = {personList}/>
    
    </div>
  )
}

export default App