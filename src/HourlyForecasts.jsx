
import { useEffect } from "react";
import { useForecasts } from "./appContext";
import { getIconLink } from "./utilities";
import { getForeignDate } from "./utilities";

export default function HourlyForecasts(){

    const forecastsData = useForecasts();
    const hourly24h = forecastsData ? forecastsData.hourly.slice(0,24) : [];
    const hourlyElements = hourly24h.map((hourlyItemData, index) => {
        return <li 
        key={index}
        >
            <HourlyForecastItem hourlyItemData={hourlyItemData} />
        </li>
    });

    return <div className="hourly-container">
        <h2 className="hourly-container__heading">Dự báo thời tiết trong 24h tới</h2>
        <ul className="hourly-list">
                {hourlyElements}
            </ul>
        </div>;
}

const HourlyForecastItem = ({hourlyItemData}) => {

    const temp = Math.floor(hourlyItemData.temp);
    const description = hourlyItemData.weather[0].description;
    const iconLink = getIconLink(hourlyItemData.weather[0].icon);
    let sun_moon_state = undefined;
    let time = undefined;

    (() => {

      const forecastsData = useForecasts();
      const offset = forecastsData.timezone_offset;
      const date = getForeignDate(hourlyItemData.dt,offset);
      const now = getForeignDate(forecastsData.current.dt, offset)
      const sunRise = getForeignDate(forecastsData.current.sunrise, offset);
      const sunSet = getForeignDate(forecastsData.current.sunset, offset);
      const moonRise = getForeignDate(forecastsData.current.moonrise, offset);
      const moonSet = getForeignDate(forecastsData.current.moonset, offset);
        
      if(date.getHours() == sunRise.getHours()) sun_moon_state = "Sun rise";
      if(date.getHours() == sunSet.getHours()) sun_moon_state = "Sun set";
      if(date.getHours() == moonRise.getHours()) sun_moon_state = "Moon rise";
      if(date.getHours() == moonSet.getHours()) sun_moon_state = "Moon set";

      if(sun_moon_state){
          time = `${date.getHours()}:${date.getMinutes()}`;
      }else{
          time = `${date.getHours()}:00`;
      }

      if(now.getHours() == date.getHours()){
        time = "Now";
      } 
      
    })();

    return (
      <div className="hourly-item">
        <img className="hourly-item__icon" src={iconLink} alt={hourlyItemData.weather.main}/>
        <span className="hourly-item__temp">
          {temp}
          <span>&#8451;</span>
        </span>
        <p className="hourly-item__description">{description}</p>
        <span className="hourly-item__time">{time}</span>
        {sun_moon_state && (
          <label className="hourly-item__sun-moon-state">
            {sun_moon_state}
          </label>
        )}
      </div>
    );
}