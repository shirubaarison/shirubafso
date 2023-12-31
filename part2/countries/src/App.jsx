import { useState, useEffect } from 'react'
import countrieServices from './services/Countries'
import Search from './components/Search'
import View from './components/View'

const App = () => {
  // Countries
  const [countries, setNewCountries] = useState([])
  const [countriesToShow, setNewCountriesToShow] = useState([])
  
  // Fetch ALL countries json
  useEffect(() => {
    console.log("effect")
    countrieServices
    .getAll()
    .then(countries => {
      setNewCountries(countries)
    })
  }, [])

  // Search
  const [search, setNewSearch] = useState('')
  
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  // Update countries to show
  useEffect(() => {
    setNewCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <div>
      <Search searchValue={search} handleSearch={handleNewSearch} />
      {search && <View countries={countriesToShow} />}
    </div>
  )
}

export default App
