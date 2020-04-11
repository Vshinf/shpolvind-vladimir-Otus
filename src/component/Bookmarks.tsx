import React, { Component } from 'react'
import {Weather} from "./Weather";

interface IProps {
    data: number[],
    idCity: number,
    state: IState
}

interface IState {
    searchInput: string,
    city: number[],
    bk: number[],
    idCity: number
}

export class Bookmarks extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = props.state;
        console.log(props);
        this.searchIdCity = this.searchIdCity.bind(this);
        this.getWether = this.getWether.bind(this);
    };


    searchIdCity(arrId: any) {
        console.log("====searchIdCity Bookmarks====");
        console.log("arrId data: ", arrId.data);
        if(arrId.data.length > 0){
            const cityList = require('./data/city.list.json');
            let data_res2 = [];
            for (let idCityInBookmarks in arrId.data) {
                //console.log("ttt", arrId.data[idCityInBookmarks]);
                for (let city in cityList) {
                    if (cityList[city].id == arrId.data[idCityInBookmarks]) {
                        data_res2.push(cityList[city]);
                        //console.log(cityList[city].name+"("+cityList[city].country+")");
                    }
                }
            }
            console.log("Res searchIdCity", data_res2);
            return data_res2;
        }else{
            console.log("arrId.length == 0:");
            return [];
        }
    }

    getWether(id: number) {
        console.log("====getWether Bookmarks====");
        //console.log("Get Wether id city =" + id);
        this.setState({
            idCity: id
        });
    }

    render() {
        const style1 = {
            cursor: "pointer",
        };
        const dataBookmarks = this.searchIdCity(this.props);//: {}[]
        const { searchInput, city, bk, idCity } = this.state;
        console.log("dataBookmarks: ", dataBookmarks);
        if(dataBookmarks.length > 0){
            return (
                <>
                    {
                        dataBookmarks.map((item: any) =>
                            <p style={style1} key={item.id} onClick={() => this.getWether(item.id)}>
                                {item.name} ({item.country})
                            </p>
                        )
                    }
                    <hr />
                    <h3>Weather:</h3>
                    <Weather idCity={idCity} />
                </>
            );
        }
        return (
            <>
                <p>No city bookmarks</p>
            </>
        );
    }
}