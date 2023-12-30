import { useState, useEffect } from 'react'
import Person from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])  

  useEffect(() => {
    personsService
      .getAll()
      .then(person => {
        setPersons(person)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const peopleToShow = '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handlewNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name === newName).length > 0) {
      if (window.confirm(` ${newName} is already added to phonebook. Replace the old number with a new one?`))
      {
        const personF = persons.find(n => n.name === newName)
        const changedPerson = {...personF, number: newNumber }

        personsService
          .update(personF.id, changedPerson)
          .then(response => {
          setPersons(persons.map(person => person.id === personF.id ? response : person))
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`delete ${person.name}?`)) {
      personsService
        .deleteObj(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handlewNewNumber={handlewNewNumber}/>
      <h3>Numbers</h3>
      {peopleToShow.map(person => 
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>
      )}
    </div>
  )
}

export default App