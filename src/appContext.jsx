import { createContext, useContext, useReducer } from "react";
import { useOneCallAPI_3_0 } from "./useOneCallAPI3.0";

const ForecastsContext = createContext(null);
const CordinatesDispatch = createContext(null);

export const useForecasts = () => {
    return useContext(ForecastsContext);
}

export const useCordinatesDispatch = () => {
    return useContext(CordinatesDispatch);
}


export const ForeCastsProvider = ({initialCordinates, children}) => {
  const [cordinates, dispatch] = useReducer(cordinatesReducer, initialCordinates);
  const forecastsData = useOneCallAPI_3_0(cordinates);

  return (
    <ForecastsContext.Provider value={forecastsData}>
      <CordinatesDispatch.Provider value={dispatch}>
        {children}
      </CordinatesDispatch.Provider>
    </ForecastsContext.Provider>
  );
}

const cordinatesReducer =  (state, action) => {
    switch(action.type){
        case 'update': {
            return ({
                lat: action.lat,
                lon: action.lon
            });
        }
        default: {
            throw Error('Unknow action-', action.type);
        }
    }
}