import { useEffect , useState } from 'react'
import { ForeCastsProvider } from './appContext';
import HourlyForecasts from './HourlyForecasts';
import DailyForecasts from './DailyForecasts';
import CurrentForecasts from './CurrentForecasts';
import SearchLocation from './SearchLocation';
import './App.css'

function App() {

    const [cordinates, setCordinates] = useState(null);

    useEffect(() => {
        if("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            setCordinates({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          });
        }
    },[]);

  if(cordinates){
    return (
      <div className="app">
        <ForeCastsProvider initialCordinates={cordinates}>
          <div className='wrapper'>
            <CurrentForecasts />
            <SearchLocation />
          </div>
          <HourlyForecasts />
          <DailyForecasts />
        </ForeCastsProvider>
      </div>
    );
  }else{
    return <h2 className='app__alert'>Đang lấy vị trí, đợi tí...</h2>
  }
}

export default App
