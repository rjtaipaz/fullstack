import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, handleShown}) =>{
 

  return(
    <li>
      {country.name.common}
      <button onClick={() => handleShown(country)} >Show</button>
    </li>
  )
}
const Language = ({value}) => {

  return(
    <li>
      {value}
    </li>
  )
}
const CountryDetails = ({country}) => {

console.log(Object.entries(country.languages).map(([key, value]) => value))


  return(
<li>
  <h1>{country.name.common}</h1>
  <p>Capital: {country.capital} </p>
  <p>Area: {country.area}</p>
  <p>Languages:</p>
  <ul>{Object.entries(country.languages).map(([key, value]) => <Language key={key} value={value}/>)}</ul>
  <img src={country.flags.png} alt="flag"/>
</li>

  )
}

const Countries = ({countriesToShow, handleShown}) => 
{
  console.log('näytettävät maat',countriesToShow)
  if (countriesToShow.length < 10 && countriesToShow.length > 1) {
  return(
    <ul>
    {countriesToShow.map(country => <Country key={country.name.official} country={country} handleShown={handleShown}/>)}
  </ul>
  )
  } else if (countriesToShow.length === 1) {
    
    return (
      <ul>
        {countriesToShow.map(country => <CountryDetails key={country.name.official} country={country}/>)}
      </ul>
    )
  }
  else { return (<div>Specify another filter</div>)}
}

const Search = ({filter, handleFilterChange}) => {
  return (
    <div> Search: <input value={filter} onChange={handleFilterChange}/></div>
  )
}
  
const App = (props) => {

const [countries, setCountries] = useState([])
const [filter, setNewFilter] = useState('')
const [found, setFound] = useState(true)


const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}

useEffect(hook, [])
console.log('render', countries.length, 'notes')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setFound(true)
    console.log(found)
    console.log(countries.filter(country => country.name.common === setNewFilter))
  }

  const handleShown = (country) => {
    setNewFilter(country.name.common)
  }

  const countriesToShow = found
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries

  

  return (
    <div>
      <h1>Maiden tiedot</h1>
      <Search filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} handleShown={handleShown}/>
    </div>
  )

}

export default App