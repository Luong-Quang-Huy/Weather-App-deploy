import { useForecasts } from "./appContext";
import { getForeignDate, getIconLink } from "./utilities";
import useReverseGeocoding from "./useReverseGeocoding";


export default function CurrentForecasts(){
    const forecastsData = useForecasts();
    let cityName = undefined;
    if(forecastsData){
        cityName = useReverseGeocoding(forecastsData.lat, forecastsData.lon);
        const current = forecastsData.current;
        const now = getForeignDate(
          current.dt,
          forecastsData.timezone_offset
        );
        const temp = Math.floor(current.temp);
        const hour = now.getHours();
        const miniutes = now.getMinutes();
        const iconLink = getIconLink(current.weather[0].icon);
        const description = current.weather[0].description;
        const feelsLike = current.feels_like;
        const mainStatus = current.weather[0].main;
        return (
          <div className="current-container">
            <h2 className="current__title">Thời tiết hiện tại</h2>
            <div className="current__essential">
              <div className="current__essential__staus">
                <img
                  className="current__icon"
                  src={iconLink}
                  alt={mainStatus}
                />
                <p className="current__description">{description}</p>
              </div>
              <div className="current__essential__now">
                <label className="current__time">{`${hour}:${miniutes.toString().padStart(2,"0")}`}
                {' '}
                  <span style={{fontSize: "0.8rem"}}>{'(giờ địa phương)'}</span>
                </label>
                <label className="current__temp">
                  {Math.floor(temp)}
                  <span>&#8451;</span>
                </label>
                {cityName ? (
                  <label className="current__city">{cityName}</label>
                ) : (
                  <label className="current__city--loading">loading...</label>
                )}
                <label className="current__feels-like">
                  Feels like*{' '} 
                  <span>{Math.floor(feelsLike)}
                  <span>&#8451;</span></span>
                  </label>
              </div>
            </div>
            <div className="current__info"></div>
          </div>
        );

    }else{
        return <></>;
    }
}