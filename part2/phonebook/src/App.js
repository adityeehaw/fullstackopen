import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './index.css'
import phonebookService from './services/phonebookservice'
import NotificationSuccess from './components/NotificationSuccess'
import NotificationError from './components/NotificationError'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
            setPersons(persons.map(person => person.id !== personToUpdate[0].id ? person : updated))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setPersons(persons.filter(person => person.name !== newName))
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
        setSuccessMessage(
          `Added ${nameList.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        // console.log("error:",error)
        // console.log('error.response:',error.response)
        // console.log('error.response.data:',error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        // setNewName('')
        // setNewNumber('')
      })
      
      
    }
  }
  const removePerson = (id) => {
    const personToRemove = persons.filter(person => person.id === id)
    if (window.confirm(`Delete ${personToRemove[0].name}?`)){
      phonebookService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setSuccessMessage(
          `${personToRemove[0].name} has been removed successfully`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${personToRemove[0].name} has already been removed from server`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }


  const handleSearch = (event) => setSearch(event.target.value)
  

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  

  const handleNameChange = (event) => setNewName(event.target.value)
  

  return (
    <div onSubmit={addInfo}>
      <h2>Phonebook</h2>
      <NotificationSuccess successMessage = {successMessage}/>
      <NotificationError errorMessage={errorMessage} />

      <Filter searchName ={searchName} handleSearch ={handleSearch}/>

      <h2>Add a new</h2>
      <PersonForm  newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons = {persons} searchName = {searchName} removePerson = {removePerson}/>
    
    </div>
  )
}

export default App