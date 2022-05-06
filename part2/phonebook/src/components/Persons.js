import React from 'react';

const Persons = ({personList}) => {
    return (
    personList.map(person => <p key = {person.id}>{person.name} {person.number}</p>)
    )
}

export default Persons