import { useForecasts } from "./appContext";
import { getForeignDate, getIconLink } from "./utilities";
import useReverseGeocoding from "./useReverseGeocoding";
import { useEffect, useState } from "react";

export default function CurrentForecasts() {

  const [time, setTime] = useState({
    hour: 0,
    miniutes: 0,
    seconds: 0,
  });

  const forecastsData = useForecasts();
  const cityName = useReverseGeocoding(forecastsData.lat, forecastsData.lon);
  const offset = forecastsData.timezone_offset;
  const current = forecastsData.current;
  const temp = Math.floor(current.temp);
  const hour = time.hour;
  const miniutes = time.miniutes.toString().padStart(2,"0");
  const seconds = time.seconds.toString().padStart(2,"0");
  const iconLink = getIconLink(current.weather[0].icon);
  const description = current.weather[0].description;
  const feelsLike = current.feels_like;
  const mainStatus = current.weather[0].main;

  useEffect(() => {

    const intervalId = setInterval(updateTime, 1000);

    function updateTime() {
      const currentTimeInSeconds = Math.round(Date.now() / 1000);
      const now = getForeignDate(currentTimeInSeconds, offset);
      setTime(t => {
          return ({
            hour: now.getHours(),
            miniutes: now.getMinutes(),
            seconds: now.getSeconds(),
          });
      });
    }

    return () => {
      clearInterval(intervalId);
    };

  }, [offset]);

  return (
    <div className="current-container">
      <h2 className="current__title">Thời tiết hiện tại</h2>
      <div className="current__essential">
        <div className="current__essential__staus">
          <img className="current__icon" src={iconLink} alt={mainStatus} />
          <p className="current__description">{description}</p>
        </div>
        <div className="current__essential__now">
          <label className="current__time">
            {`${hour}:${miniutes}:${seconds}`}{" "}
            <span style={{ fontSize: "0.8rem" }}>{"(giờ địa phương)"}</span>
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
            Feels like*{" "}
            <span>
              {Math.floor(feelsLike)}
              <span>&#8451;</span>
            </span>
          </label>
        </div>
      </div>
      <div className="current__info"></div>
    </div>
  );
}
