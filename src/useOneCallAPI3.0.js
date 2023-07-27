import { useEffect, useState } from "react";
import { toSring } from "./utilities";
import { apiKey } from "./utilities";

export const useOneCallAPI_3_0 = (cordinates) => {

    const [forecastsData, setForecastData] = useState(null);

    useEffect(() => {
        if(cordinates){
            const lat = cordinates.lat;
            const lon = cordinates.lon;
            fetch(
              `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alert&units=metric&lang=vi&appid=${toSring(apiKey)}`
            )
              .then((res) => {
                if(res.status == 200){
                    return res.json();
                    
                }else{
                    return null;
                }
              }).then(data => {
                if(data){
                    setForecastData(data);
                }
              }) 
              .catch((error) => {
                console.error(error);
              });
        }
    }, [cordinates]);

    return forecastsData;
}