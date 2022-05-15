import React from 'react'

const Persons = ({persons, searchName, removePerson}) => {
    return (
    persons
    .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    .map(person => <p key = {person.id}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>Delete</button></p>)
    )
}

export default Persons