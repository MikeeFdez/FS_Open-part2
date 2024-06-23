import { useEffect, useState } from 'react'
// import './App.css'
import { Filter } from './components/Filter'
import { Country } from './components/Country'
import countryService from './services/country'
import country from './services/country'


function App() {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(allCountries => setCountries(allCountries))
  }, [])
  
  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  const handleFilter = (event) => {
    const filterCountry = event.target.value
    setFilterCountry(filterCountry)
  }

  const handleClick = (countrySelected) => {
    setFilterCountry(countrySelected.name.common)
  }

  return (
    <div>
      <h2>Countries Finder</h2>
      Find the country: <Filter value={filterCountry} onChange={handleFilter}/>
      {countriesToShow.length === 1
        ? countriesToShow.map((c, i) => 
          <Country 
          key={i}
          country={c}/>
        )
        : countriesToShow.length <= 10
          ? countriesToShow.map((country, i) => 
            <p key={i}>{country.name.common} <button onClick={() => handleClick(country)}>Show</button></p>)
          : <p>Give more information on the filter please.</p>
      }
      
    </div>
  )
}

export default App
