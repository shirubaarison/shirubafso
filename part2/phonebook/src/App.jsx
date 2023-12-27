import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p key={person}>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    // console.log("persons", persons)
    if (persons.filter(e => e.name === newName).length > 0) {
      window.alert(` ${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const newObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(newObj))
    setNewName('')
    setNewNumber('')
  }

  const peopleToShow = '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handlewNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleNewFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlewNewNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map(person => 
        <Person key={person.id} person={person}/>
        )}
    </div>
  )
}

export default App