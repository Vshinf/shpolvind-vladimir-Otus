import React, { Component } from 'react';
import func from '../utils/functions';
import {Weather} from "./Weather";

interface IProps {
    data: number[],
    idCity: number
}

interface IState {
    idCity: number
}

export class Bookmarks extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            idCity: props.idCity
        };
        this.getWether = this.getWether.bind(this);
    };

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

        const dataBookmarks = func.searchArrCityInJsonWithArrString(this.props.data);
        const { idCity } = this.state;
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
