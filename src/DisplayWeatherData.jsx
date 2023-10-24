import {useState, useEffect} from 'react'
import './styles.css'


const DisplayWeatherData = ({ selectedLocation }) => {
  const [weatherData, setWeatherData] = useState({});
  const eightDates = [];
  const currDate = new Date();
  
  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(currDate.getDate() + i);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  
    // Remove commas from the formattedDate
    const dateWithoutCommas = formattedDate.replace(/,/g, '');
  
    eightDates.push(dateWithoutCommas);
  }

  const shortDates = [];

for (let i = 0; i < 8; i++) {
  const date = new Date();
  date.setDate(currDate.getDate() + i);
  
  // Get the day and month
  const day = date.toLocaleDateString('en-US', { day: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });

  // Combine day and month
  const formattedDate = `${month} ${day}`;

  shortDates.push(formattedDate);
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

  const [showMoreWeatherData, setShowMoreWeatherData] = useState(false);
  const [index, setIndex] = useState(null);
  const [sunriseTimeStamp, setSunriseTimestamp] = useState(null);
  const [sunsetTimeStamp, setSunsetTimestamp] = useState(null);
  const [moonRiseTimeStamp, setMoonRiseTimestamp] = useState(null);
  const [moonSetTimeStamp, setMoonSetTimestamp] = useState(null);
  const toggleMoreWeatherData = (index) => {
    setShowMoreWeatherData(!showMoreWeatherData);
    setIndex(index);
    setSunriseTimestamp(weatherData.daily[index].sunrise);
    setSunsetTimestamp(weatherData.daily[index].sunset);

  }
  const sunriseTime = new Date(sunriseTimeStamp * 1000);
  const sunriseHours = sunriseTime.getUTCHours();
  const sunriseMinutes = sunriseTime.getUTCMinutes();
 
  const sunsetTime = new Date(sunsetTimeStamp * 1000);
  const sunsetHours = sunsetTime.getUTCHours();
  const sunsetMinutes = sunsetTime.getUTCMinutes();

return (
  <>
  <div className='container border-primary d-flex justify-content-center align-items-center'>
  <p>
    {selectedLocation.name} {selectedLocation.state && <span> {selectedLocation.state} </span>}
    {selectedLocation.country && <span> ({selectedLocation.country}) </span>}
  </p>
  </div>
 
  <div className='container border-primary d-flex justify-content-center align-items-center'>
 
{weatherData && weatherData.daily && Array.isArray(weatherData.daily) ? (
  weatherData.daily.map((dayData, index) => (
    <div key={index} id='eightDayForecast'>
      <p className='text-center'>{eightDates[index]}</p>
      <img src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`} alt='Weather Icon' />
      <p className='text-center'>Temperature {Math.floor((dayData.temp.max - 273.15) * 9/5 + 32)}&deg; / {Math.floor((dayData.temp.min - 273.15) * 9/5 + 32)}&deg;</p>
      {/* <p>Humidity: {dayData.humidity}</p> */}
      {/* Add more properties as needed */}
      <div className='d-flex justify-content-center'> 
      <svg onClick={() => toggleMoreWeatherData(index)} id="showMoreWeatherDataIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square" viewBox="0 0 16 16">
      <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
      </svg>
      </div>
    </div>    
  ))
) : (
  <p>Weather data is not available.</p>
)}

</div>
{index != null && showMoreWeatherData && (<div id="showMoreWeatherDataDiv" className='container border-primary justify-content-center align-items-center'> 

<p className='text-center'>{eightDates[index]}</p>
<p className='text-center'>Today will have {weatherData.daily[index].weather[0].description}. </p>
<p className='text-center'>Humidity {weatherData.daily[index].humidity}% | UV Index {weatherData.daily[index].uvi} | Rain {weatherData.daily[index].pop * 100}% | Cloud Coverage {weatherData.daily[index].clouds}%</p>

<div className="row">
    <div className="col-md-6">
      <p className='text-center'>Day</p>
      <p className='text-center'>{Math.floor((weatherData.daily[index].temp.max - 273.15) * 9/5 + 32)}&deg; | <em>Feels Like</em> {Math.floor((weatherData.daily[index].feels_like.day - 273.15) * 9/5 + 32)}&deg; </p>
      
    </div>
    <div className="col-md-6">
      
      <p className='text-center'>NIGHT {Math.floor((weatherData.daily[index].temp.min - 273.15) * 9/5 + 32)}&deg;</p>
      <p>Other data for NIGHT</p>
    </div>
  </div>

</div>)}

  
  
  </>
)
}
export default DisplayWeatherData;