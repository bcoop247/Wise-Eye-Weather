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

  return (
    <>
    <div className="mb-3 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className='d-flex'>
      <input type="text" value={userQuery} className='form-control' onChange={(e) => setUserQuery(e.target.value)} />
      <input type="submit" className='btn btn-primary' value="Search" />
      </form>
    </div>
   <br />
    <div className="d-flex justify-content-center">
    
    <ul>
      {submittedSearch && (<h5 className='containter custom-h5'>Select Your Location</h5>)}
      
      {locationData.map((location, index) => <li style={{listStyleType: "none", cursor: "pointer"}} key={index} onClick={() => { setSelectedLocation(location) }} >{location.name} {location.state && <span> {location.state}</span>}
      {location.country && <span> ({location.country})</span>}
      </li>) }
    </ul>
    
    </div>

    {selectedLocation && <DisplayWeatherData selectedLocation={selectedLocation} />}
    
    </>
  )
}
export default Search;