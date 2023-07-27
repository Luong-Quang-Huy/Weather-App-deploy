import { useEffect, useState } from "react";
import { toSring } from "./utilities";
import {apiKey} from "./utilities";

export default function useReverseGeocoding(lat, lon){
    const [cityName, setCityName] = useState(null);

    useEffect(() => {
        fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${toSring(apiKey)}`
        ).then(res => {
            if(res.status == 200){
                return res.json();
            }else{
                return null;
            }
        }).then(data => {
            if(data){
                const city_name = data[0].name;
                setCityName(city_name);
            }
        }).catch(error => console.error(error));
        console.log("api fetch occured");
    }, [lat, lon]);

    return cityName;
}