import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p key={person}>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      number: newNumber
    }

    setPersons(persons.concat(newObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNewPerson = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlewNewNumber = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => 
        <Person key={person.name} person={person}/>
        )}
    </div>
  )
}

export default App