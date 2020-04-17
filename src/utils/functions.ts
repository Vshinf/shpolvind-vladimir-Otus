import conf from '../utils/conf';

const searchArrCityInJsonWithString = async (searchTerm: string) => {
    console.log("====async searchArrCityInJsonWithString====");
    const cityList = require('../data/city.list.json');
    let data_res = [];
    for (let city in cityList) {
        if( cityList.hasOwnProperty(city) && cityList[city].country == "RU"){
            let nameCity = cityList[city].name;
            let regexp = RegExp(searchTerm, "gi");
            if( cityList.hasOwnProperty(city) && nameCity.match(regexp) ){
                data_res.push(cityList[city]);
            }
        }
    }
    return data_res;
};

const searchArrCityInJsonWithArrString = (arrId: number[]) => {
    console.log("====async searchArrCityInJsonWithArrString====");
    console.log("arrId data: ", arrId);
    if(arrId.length > 0){
        const cityList = require('../data/city.list.json');
        let data_res = [];
        for (let idCityInBookmarks in arrId) {
            //console.log("ttt", arrId.data[idCityInBookmarks]);
            for (let city in cityList) {
                if ( cityList.hasOwnProperty(city) && cityList[city].id == arrId[idCityInBookmarks]) {
                    data_res.push(cityList[city]);
                }
            }
        }
        return data_res;
    }else{
        //console.log("arrId.length == 0:");
        return [];
    }
};

const queryTodayDataWetherinApiWithIdCity = async (idCity: number) => {
    console.log("====async queryTodayDataWetherinApiWithIdCity====");
    console.log("query data wether with id сity = ", idCity);
    if( idCity != undefined && idCity != 0 ){
        const url = `${conf.Api_weather_url}weather?id=${idCity}&lang=en&appid=${conf.Api_weather_key}`;
        const response = await fetch(url);
        return await response.json();
    }else{
        return {};
    }
};

const query5DaysDataWetherinApiWithIdCity = async (idCity: number) => {
    console.log("====async query5DaysDataWetherinApiWithIdCity====");
    console.log("query data wether with id сity = ", idCity);
    if( idCity != undefined && idCity != 0 ){
        const url = `${conf.Api_weather_url}forecast?id=${idCity}&lang=en&appid=${conf.Api_weather_key}`;
        const response = await fetch(url);
        return await response.json();
    }else{
        return {};
    }
};

export default { searchArrCityInJsonWithString, searchArrCityInJsonWithArrString, queryTodayDataWetherinApiWithIdCity, query5DaysDataWetherinApiWithIdCity };
