import React from "react";
import ico from "../utils/ico";

interface IInfo {
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        humidity: number
    }
    dt_txt: string,
    weather: {icon: string, description: string}[],
    wind: {speed: number, deg: number}
}

interface IProps {
    data: any
}

export default ({data}: IProps ) => {
    const { main, dt_txt, weather, wind }: IInfo = data;

    /*const dateObj = new Date(data.dt * 1000);
    const date = dateObj.getDate()+"."+dateObj.getMonth();
    const time = dateObj.getHours()+":00";*/

    //dt_txt: "2020-04-17 03:00:00"
    const time = dt_txt.split(" ")[1].split(":")[0]+":"+dt_txt.split(" ")[1].split(":")[1];

    /*
    Утро 9
    День 15
    Вечер 21
    Ночь 3
    */
    const icon = 'http://openweathermap.org/img/wn/' + weather[0].icon + ".png";
    const description = weather[0].description;
    const avTemp = Math.floor((main.temp - 273.5) * 10) / 10;
    const flTemp = Math.floor((main.feels_like - 273.5) * 10) / 10;
    //const minTemp = Math.floor((main.temp_min - 273.5) * 10) / 10;
    //const maxTemp = Math.floor((main.temp_max - 273.5) * 10) / 10;

    const windDeg = Number(wind.deg);

    let windB: string = "";
    if( windDeg >= 23 && windDeg <= 67 ){
        windB = "NE";
    }else if( windDeg >= 68 && windDeg <= 112 ){
        windB = "E";
    }else if( windDeg >= 113 && windDeg <= 157 ){
        windB = "SE";
    }else if( windDeg >= 158 && windDeg <= 202 ){
        windB = "S";
    }else if( windDeg >= 203 && windDeg <= 247 ){
        windB = "SW";
    }else if( windDeg >= 248 && windDeg <= 292 ){
        windB = "W";
    }else if( windDeg >= 293 && windDeg <= 337 ){
        windB = "NW";
    }else{
        windB = "N";
    }

    const style_bl_day = {
        border: "1px solid rgba(0,0,0,.125)",
        overflow: "hidden"
    };

    return(
        <>
            <div style={style_bl_day}>
                <div className="float-left p-2"><h5>{time}</h5></div>
                <div className="float-left p-2">{avTemp} &deg;C (Feels like {flTemp} &deg;C)</div>
                <div className="float-left p-2 pl-3">
                    {windB} &nbsp; {wind.speed}m/s &nbsp;
                    {windB === "N" && <ico.N />}
                    {windB === "NE" && <ico.NE />}
                    {windB === "E" && <ico.E />}
                    {windB === "SE" && <ico.SE />}
                    {windB === "S" && <ico.S />}
                    {windB === "SW" && <ico.SW />}
                    {windB === "W" && <ico.W />}
                    {windB === "NW" && <ico.NW />}
                </div>
                <div className="float-left p-2 pl-3">
                    {main.humidity}%
                </div>
                <div className="float-right"><img src={icon} alt={description} title={description} /></div>
            </div>
        </>
    );
}
