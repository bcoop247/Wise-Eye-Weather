import {useState, useEffect} from 'react'
import DisplayWeatherData from './DisplayWeatherData';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [locationResults, setLocationResults] = useState([]);
  const [showLocationList, setShowLocationList] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    setShowLocationList(true);

  }
  useEffect(() => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${submittedQuery}&limit=5&appid=83b8d01295497d35b3d864c1dbac5fc7`)
    .then(response => response.json())
    .then(results => setLocationResults(results))
    .catch((error) => console.error('Error Fetching Data', error));

  }, [submittedQuery]);
console.log(locationResults);

  const handleLocationClick = (location) => {
    setShowLocationList(false);
    setSelectedLocation(location);

  }


 return(
  <>
  <div className='mb-3 d-flex justify-content-center'>
  <form onSubmit={handleSubmit} className='d-flex'>
  <input type='text'
  onChange={(e) => setSearchQuery(e.target.value)}
  value={searchQuery} />
  <input type="submit" className='btn btn-primary' value="Search" />
  </form>
  </div>
  <br />


{showLocationList && locationResults && locationResults.length > 0 && (
<div className='d-flex justify-content-center'>
  <ul>
  {locationResults.map((location, index) => (
  <li key={index} onClick={() => handleLocationClick(location)} style={{listStyleType: "none", cursor: "pointer"}}> {location.name} {location.state && <span> {location.state}</span>}{location.country && <span>({location.country})</span>}</li>
  ))}
</ul>
</div>
)}
{selectedLocation && <DisplayWeatherData selectedLocation={selectedLocation} />}
  

  </>
  )
}
export default Search;