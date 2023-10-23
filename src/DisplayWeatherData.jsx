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
  const toggleMoreWeatherData = (index) => {
    setShowMoreWeatherData(!showMoreWeatherData);
    setIndex(index);
  }

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

<h1>{eightDates[index]}</h1>
<p>{weatherData.daily[index].feels_like.day}</p>
<p>{weatherData.daily[index].summary}</p>


</div>)}
  
  
  </>
)
}
export default DisplayWeatherData;