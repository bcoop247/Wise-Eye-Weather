import {useState, useEffect} from 'react'
import DisplayWeatherData from './DisplayWeatherData';

const Search = () => {
  const [userQuery, setUserQuery] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [submittedSearch, setSubmittedSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch(userQuery);
    console.log(userQuery);
    }

useEffect(() => {
  if(submittedSearch){
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${submittedSearch}&limit=5&appid=83b8d01295497d35b3d864c1dbac5fc7`)
  .then(response => response.json())
  .then(result => setLocationData(result))
  .catch((error) => console.error('Error Fetching Data', error));
  }    
}, [submittedSearch]);
// console.log(locationData);


  return (
    <>
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
      <input type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} />
      <input type="submit" />
      </form>
    </div>
   <br />
    <div className="d-flex justify-content-center">
    
    <ul>      
      {locationData.map((location, index) => <li style={{listStyleType: "none", cursor: "pointer"}} key={index} onClick={() => { setSelectedLocation(location) }} >{location.name} {location.state && <span> {location.state}</span>}
      {location.country && <span> ({location.country})</span>}
      </li>) }
    </ul>
    
    </div>

    <div className='container d-flex justify-content-center align-items-center'>
    <p className='text-center'>Search Engine is very flexible. Here's how it works: <br /> To make it more precise put the city's name, comma, 2-letter country code. You will get all proper cities in chosen country.
    The order is important - the first is city name then comma then country. Example - London, GB or New York, US.</p>
    </div>
    {selectedLocation && <DisplayWeatherData selectedLocation={selectedLocation} />}
    
    </>
  )
}
export default Search;