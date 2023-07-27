import { useForecasts} from "./appContext";
import { getIconLink } from "./utilities";
import { getForeignDate } from "./utilities";

export default function DailyForecasts(){
    const forecastsData = useForecasts();
    const daily = forecastsData.daily;
    const dailyForecastsElement = daily.map((dailyItemData, index) => <li key={index}><DailyForecastsItem dailyItemData={dailyItemData}/></li>);
    return <div className="daily-container">
        <h2>Dự báo thời tiết trong {daily.length} ngày tới</h2>
        <ul className="daily-list">
            {dailyForecastsElement}
        </ul>
    </div>;

}

const DailyForecastsItem = ({dailyItemData}) => {
    let weekDay = undefined;
    const iconLink = getIconLink(dailyItemData.weather[0].icon);
    const mainStatus = dailyItemData.weather[0].main;
    const minTemp = Math.floor(dailyItemData.temp.min);
    const maxTemp = Math.floor(dailyItemData.temp.max);
    const dayTemp = dailyItemData.temp.day;

    (() => {

        const forecastsData = useForecasts();
        const offset = forecastsData.timezone_offset;
        const thatDate = getForeignDate(dailyItemData.dt, offset);
        const now = getForeignDate(forecastsData.current.dt, offset);
        const dayNum = thatDate.getDay(); 

        switch (dayNum) {
          case 0:{
            weekDay = "Chủ nhật";
            break;
          }
          case 1:{
            weekDay = "Thứ hai";
            break;
          }
          case 2:{
            weekDay = "Thứ ba";
            break;
          }
          case 3:{
            weekDay = "Thứ tư";
            break;
          }
          case 4:{
            weekDay = "Thứ năm";
            break;
          }
          case 5:{
            weekDay = "Thứ sáu";
            break;
          }
          case 6:{
            weekDay = "Thứ bảy";
            break;
          }
            
          default:{
            throw Error('Unknow week day');
          }     
        }

        if(thatDate.getDate() === now.getDate()) weekDay = 'Hôm nay';

    })();

    return (
      <div className="daily-item">
        <label className="daily-item__weekday">{weekDay}</label>
        <div className="daily-item__day-state">
          <img className="daily-item__day-state__icon" src={iconLink} alt={mainStatus} />
          <span className="daily-item__day-state__main-status">{mainStatus}</span>
        </div>
        <div className="daily-item__temp">
          <label>
            {minTemp}
            <span>&#8451;</span>
          </label>
          <div className="daily-item__temperature-gradient"></div>
          <label>
            {maxTemp}
            <span>&#8451;</span>
          </label>
        </div>
      </div>
    );
}