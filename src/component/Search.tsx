import React, { Component } from 'react'
import { Bookmarks } from './Bookmarks';

interface IProps {}

interface IState {
    searchInput: string,
    city: number[],
    bk: number[],
    idCity: number
}

export class Search extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            searchInput: '',
            city: [],
            bk: [],
            idCity: 0
        };
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addBokmarks = this.addBokmarks.bind(this);
    }

    /*shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        const { searchInput, city } = this.state;

        return searchInput !== nextState.searchInput || city !== nextState.city;
    }

    componentDidMount() {
        console.log('mounted!');
        this.setState({
            searchInput: 'Rig';
        })
    }*/

    async componentDidUpdate(prevProps: IProps, prevState: IState) {
        console.log("====async componentDidUpdate Search====");
        const { searchInput } = this.state;

        if (searchInput !== prevState.searchInput && searchInput.length > 2) {
            const result = await this.search(searchInput);
            //console.log("!!!!!", result);

            if (result.length > 0) {
                this.setState({
                    city: result
                })
            }
            console.log('searchInput: ', this.state.searchInput);
            console.log('City count: ', this.state.city.length);
        }else if(searchInput !== prevState.searchInput && searchInput.length <= 2){
            this.setState({
                city: []
            })
        }
    }

    async search(searchTerm: string) {
        console.log("====async search Search====");
        const cityList = require('./data/city.list.json');
        //console.log("Async search function");
        let data_res = [];
        for (let city in cityList) {
            if(cityList[city].country == "RU"){
                let nameCity = cityList[city].name;
                let regexp = RegExp(searchTerm, "gi");
                if(  nameCity.match(regexp) ){
                    data_res.push(cityList[city]);
                }
            }
        }
        return data_res;
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        console.log("====handleChange Search====");
        const searchInput = event.currentTarget.value;
        this.setState({
            searchInput
        })
    }

    async addBokmarks(id: number) {//event: React.FormEvent<HTMLButtonElement>
        console.log("====async addBokmarks Search====");
        //console.log(id);
        //console.log("State bk old:", this.state.bk);
        let newBk = this.state.bk;
        let index = newBk.indexOf(id);
        //console.log("Index = ", index);
        if(index != -1){
            newBk.splice(index, 1);
            this.setState({
                bk: newBk
            });
        }else{
            newBk.push(id);
            this.setState({
                bk: newBk
            })
            //console.log('BK: ', this.state.bk.city_id);
        }
        //console.log("State bk new:", this.state.bk);
    }

    render() {
        const { searchInput, city, bk, idCity } = this.state;
        const style = {
            width: "100%",
        };
        const style1 = {
            cursor: "pointer",
        };

        return (
            <>
                <table style={style}>
                    <tbody>
                        <tr>
                            <td valign="top">
                                <label>
                                    Search City: <br />
                                    <input type="text" placeholder="Saint Petersburg" value={searchInput} onChange={this.handleChange} />
                                </label>
                                <h3>Results: </h3>
                                <div>
                                    {city.map((item: any) => <div key={item.id}>
                                        <p>
                                            {item.name} ({item.country}) &nbsp;
                                            <span style={style1} onClick={() => this.addBokmarks(item.id)}>
                                                {this.state.bk.indexOf( item.id ) != -1 ? "★" : "☆"}
                                            </span>
                                        </p>
                                    </div>)}
                                </div>
                            </td>
                            <td valign="top">
                                <h3>Bookmarks:</h3>
                                <Bookmarks data={bk} idCity={idCity} state={this.state} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}