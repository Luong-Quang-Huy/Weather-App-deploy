import { useState} from "react";
import { useCordinatesDispatch } from "./appContext";
import { toSring } from "./utilities";
import { apiKey } from "./utilities";

export default function SearchLocation(){

    const [input, setInput] = useState('');
    const dispatch = useCordinatesDispatch();
    const [requestStatus, setRequestStatus] = useState('');
    const [isFetching, setISFetching] = useState(false);

    const handleInputChange= (e) => {
        setInput(e.target.value);
    }

    const handleSearch = () => {
        if(input.trim() !== ''){
            setRequestStatus('Đang fetch data, lâu phết...');
            setISFetching(true);
            fetchCordinatesByLocation(input);
        }else{
            setRequestStatus('input invalid');
        }
    }

    const fetchCordinatesByLocation = (cityName) => {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${toSring(apiKey)}`
      )
        .then((res) => {
          setISFetching(false);
          if (res.status == 200) {
            setRequestStatus('');
            setInput('');
            return res.json();
          } else {
            setRequestStatus(`${res.status}:${res.statusText}`);
            return null;
          }
        })
        .then((data) => {
          if (data) {
            dispatch({
                type: 'update',
                lat: data[0].lat,
                lon: data[0].lon
            });
          }
        })
        .catch((e) => console.error(e));
    };

    return (
      <div>
        <h2 className="search__heading">
          Dự báo thời tiết tại tỉnh, thành phố (toàn cầu)
        </h2>
        <div className="search-container">
          <div className="search__controller">
            <input
              className="search__input"
              type="text"
              value={input}
              placeholder="Tỉnh, thành phố,..."
              onChange={handleInputChange}
            />
            <button
              className={
                isFetching
                  ? "search__button search__button--processing"
                  : "search__button search__button--default"
              }
              onClick={handleSearch}
              disabled={isFetching}
            >
              {isFetching ? "processing..." : "Dự báo"}
            </button>
          </div>
          {requestStatus !== "" ? (
            <p className="search__request-error">*{requestStatus}*</p>
          ) : null}
        </div>
      </div>
    );

}
  