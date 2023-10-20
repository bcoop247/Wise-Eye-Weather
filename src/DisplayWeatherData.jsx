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
      {/* <p>{dayData.weather[index].icon}</p> */}
      <img src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`} alt='Weather Icon' />
      <p className='text-center'>Temperature {Math.floor((dayData.temp.max - 273.15) * 9/5 + 32)}&deg; / {Math.floor((dayData.temp.min - 273.15) * 9/5 + 32)}&deg;</p>
      {/* <p>Humidity: {dayData.humidity}</p> */}
      {/* Add more properties as needed */} 
    </div>
    
  ))
) : (
  <p>Weather data is not available.</p>
)}

      

  </div>
  
  
  </>
)
}
export default DisplayWeatherData;