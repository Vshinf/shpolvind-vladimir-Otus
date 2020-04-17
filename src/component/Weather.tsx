import React, { Component } from 'react';
import func from "../utils/functions";
import {Link} from "react-router-dom";


interface IProps {
    idCity: number
}

interface IState {
    dataWetherInCity: any,
    idCityS: number
}

export class Weather extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            dataWetherInCity: {},
            idCityS: 0
        };
        this.isEmptyObject = this.isEmptyObject.bind(this);
    }

    async componentDidUpdate(prevProps: IProps, prevState: IState) {
        console.log("====componentDidUpdate Weather====");
        const { idCity }: { idCity: number } = this.props;

        if (idCity !== prevState.idCityS) {
            //const result = await this.searchInApiIdCity(idCity);
            const result = await func.queryTodayDataWetherinApiWithIdCity(idCity);
            //console.log("!!!!!", result);

            if (!this.isEmptyObject(result)) {
                this.setState({
                    dataWetherInCity: result,
                    idCityS: idCity
                })
            }
        }
    }

    isEmptyObject(obj: any): boolean {
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { dataWetherInCity, idCityS } = this.state;
        console.log("dataWetherInCity: ", dataWetherInCity);
        console.log("dataWetherInCity.lenght: ", dataWetherInCity.lenght);
        if( !this.isEmptyObject(dataWetherInCity) ) {
            //const { dataBookmarks } = result;
            //console.log("dataWeatherJson =", dataBookmarks);
            const {coord, weather, main, wind, name} = dataWetherInCity;
            let icon = 'http://openweathermap.org/img/wn/' + weather[0].icon + "@2x.png";
            const avTemp = Math.floor((main.temp - 273.5) * 10) / 10;
            const flTemp = Math.floor((main.feels_like - 273.5) * 10) / 10;
            const minTemp = Math.floor((main.temp_min - 273.5) * 10) / 10;
            const maxTemp = Math.floor((main.temp_max - 273.5) * 10) / 10;

            return (
                <>
                    <img src={icon} alt={weather[0].description} />
                    <p><b>City:</b> {name}</p>
                    <p><b>Coordinats:</b> <strong>Lon</strong>={coord.lon} <strong>Lat</strong>={coord.lat}</p>
                    <p><b>Description:</b> {weather[0].description}</p>
                    <hr />
                    <p><b>Average Temperature:</b> {avTemp} &deg;C </p>
                    <p><b>Feels like Temperature:</b> {flTemp} &deg;C </p>
                    <p><b>Min Temperature:</b> {minTemp} &deg;C </p>
                    <p><b>Max Temperature:</b> {maxTemp} &deg;C </p>
                    <hr />
                    <p><b>Pressure:</b> {main.pressure}</p>
                    <p><b>Humidity:</b> {main.humidity}%</p>
                    <hr />
                    <p><b>Wind speed:</b> {wind.speed}m/s</p>

                    <Link  className="btn btn-secondary btn-lg" to={"/" + idCityS}>5 Days -></Link>
                </>
            );
        }else{
            return (
                <>
                    <p>Select city in Bookmarks</p>
                </>
            );
        }
    }
}
