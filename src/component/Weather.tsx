import React, { Component } from 'react'

interface IProps {
    idCity: number
}

interface IState {
    dataWetherInCity: any,
    idCityS: number
}

//http://api.openweathermap.org/data/2.5/weather?q=Saint%20Petersburg&appid=d9a15b1f49251ac20c57f22caa4e5f94
//http://api.openweathermap.org/data/2.5/weather?id=498817&appid=d9a15b1f49251ac20c57f22caa4e5f94
const Api_weather_url: string = 'http://api.openweathermap.org/data/2.5/weather';
const Api_weather_key: string = 'd9a15b1f49251ac20c57f22caa4e5f94';

export class Weather extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            dataWetherInCity: {},
            idCityS: 0
        };
        this.searchInApiIdCity = this.searchInApiIdCity.bind(this);
        this.isEmptyObject = this.isEmptyObject.bind(this);
    }

    async componentDidUpdate(prevProps: IProps, prevState: IState) {
        console.log("====componentDidUpdate Weather====");
        const { dataWetherInCity, idCityS } = this.state;
        const { idCity } = this.props;

        if (idCity !== prevState.idCityS) {
            const result = await this.searchInApiIdCity(idCity);
            //console.log("!!!!!", result);

            if (!this.isEmptyObject(result)) {
                this.setState({
                    dataWetherInCity: result,
                    idCityS: idCity
                })
            }
        }
    }

   async searchInApiIdCity(idCity: number) {
       console.log("====searchInApiIdCity Weather====");
        console.log("idCity2: ", idCity);
        if( idCity != undefined && idCity != 0 ){
            const url = `${Api_weather_url}?id=${idCity}&appid=${Api_weather_key}`;
            const response = await fetch(url);
            const dataWeatherJson = await response.json();
            //const dataWeatherJson = JSON.parse('{"coord":{"lon":145.77,"lat":-16.92},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":300.15,"pressure":1007,"humidity":74,"temp_min":300.15,"temp_max":300.15},"visibility":10000,"wind":{"speed":3.6,"deg":160},"clouds":{"all":40},"dt":1485790200,"sys":{"type":1,"id":8166,"message":0.2064,"country":"AU","sunrise":1485720272,"sunset":1485766550},"id":2172797,"name":"Cairns","cod":200}');
            //const dataWeatherJson = JSON.parse('{"coord":{"lon":30.26,"lat":59.89},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":272.35,"feels_like":268.7,"temp_min":271.48,"temp_max":273.71,"pressure":995,"humidity":92},"visibility":10000,"wind":{"speed":2,"deg":250},"clouds":{"all":42},"dt":1585780454,"sys":{"type":1,"id":8926,"country":"RU","sunrise":1585797619,"sunset":1585845854},"timezone":10800,"id":498817,"name":"Saint Petersburg","cod":200}');
            return dataWeatherJson;
        }else{
            return {}
        }
    }

    isEmptyObject(obj: any): boolean {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { dataWetherInCity } = this.state;
        console.log("dataWetherInCity: ", dataWetherInCity);
        console.log("dataWetherInCity.lenght: ", dataWetherInCity.lenght);
        if( !this.isEmptyObject(dataWetherInCity) ) {
            //const { dataBookmarks } = result;
            //console.log("dataWeatherJson =", dataBookmarks);
            const {coord, weather, base, main, visibility, wind, clouds, dt, sys, id, name} = dataWetherInCity;
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