import Search from "./Search";

const HomePage = () => {

  return (
    <>
    <div className='container d-flex justify-content-center align-items-center'>
      <h1 className='text-center'>Wise Eye Weather</h1>
      
    </div>
    <p className=' container text-center'>Search Engine is very flexible. Here's how it works: <br /> To make it more precise put the city's name, comma, 2-letter country code. You will get all proper cities in chosen country.
    <br/><strong>The order is important</strong> - the first is city name then comma then country. Example - London, GB or New York, US.</p>
    <Search />
    </>
  )
}
export default HomePage;