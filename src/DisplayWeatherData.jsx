import {useState, useEffect} from 'react'
import './styles.css'


const DisplayWeatherData = ({ selectedLocation }) => {
  const [weatherData, setWeatherData] = useState({});
  const eightDates = [];
  const currDate = new Date();

  for (let i = 0; i < 8; i++){
    const date = new Date();
    date.setDate(currDate.getDate() + i);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    eightDates.push(formattedDate);
  }

  useEffect(() => {
    if(selectedLocation){
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=83b8d01295497d35b3d864c1dbac5fc7`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    .catch((error) => console.error('Error Fetching Weather Data', error));
    }
  }, [])

  console.log(weatherData);

return (
  <>
 
  <div className='container border-primary d-flex justify-content-center align-items-center' id="8-day-forecast">
    <p>
    {selectedLocation.name} {selectedLocation.state && <span> {selectedLocation.state} </span>}
    {selectedLocation.country && <span> ({selectedLocation.country}) <br /> 
    
    <ul>
        {eightDates.map((date, index) => (
          <li key={index}> {date}  </li>
         
        ))}
      </ul> </span>}
      </p>

  </div>
  
  </>
)
}
export default DisplayWeatherData;