import { useState, useEffect } from 'react'
import Countrysearch from './components/countrysearch'
import axios from 'axios'

const App = () => {
  const [searchName, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
  })
},[])

  return(
    <div>
      find countries: <input value ={searchName}
                             onChange = {(event) => setSearch(event.target.value)}/>
      
      <Countrysearch searchName = {searchName} countries = {countries} setSearch = {setSearch}/>

    </div>


  )
}


export default App
