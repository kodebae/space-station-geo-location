import './App.css'
import Header from './Components/Header'
import Map from './Components/Map/Map'

function App() {
 


  return (
    <div className="App">
      <Header />
      <Map /> 
    </div>
  );
}

export default App;

/**
 *? The dependency array basically tells the "useEffect" hook to "only trigger when the dependency array changes".  
 *? Deconstructed elements from the props are being consumed to locate the iss and pinpoint the location on the map. 
 *? ParseFloat api returns a string so the string must be parsed in order to display the decimal numbers for the longitude and latitude.
 */