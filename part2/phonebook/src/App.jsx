import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p key={person}>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    // console.log("persons", persons)
    if (persons.filter(e => e.name === newName).length > 0) {
      window.alert(` ${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const newObj = {
      name: newName
    }

    setPersons(persons.concat(newObj))
    setNewName('')
  }

  const handleNewPerson = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map(person => 
        <Person key={person.name} person={person} />
        )}
    
    </div>
  )
}

export default App