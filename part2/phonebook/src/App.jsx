import axios from 'axios'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
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
      window.alert(` ${newName} is already added to phonebook`)
      setNewName('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handlewNewNumber={handlewNewNumber}/>
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} />
    </div>
  )
}

export default App