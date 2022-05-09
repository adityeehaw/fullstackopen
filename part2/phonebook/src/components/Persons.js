import React from 'react';

const Persons = ({persons, searchName}) => {
    return (
    persons
    .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    .map(person => <p key = {person.id}>{person.name} {person.number}</p>)
    )
}

export default Persons