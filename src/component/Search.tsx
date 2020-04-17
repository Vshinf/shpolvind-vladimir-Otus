import React, { Component } from 'react';
import func from '../utils/functions';
import { Bookmarks } from './Bookmarks';
import { Link } from "react-router-dom";

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
        this.handleChange = this.handleChange.bind(this);
        this.addBokmarks = this.addBokmarks.bind(this);
    }

    componentDidMount() {
        console.log('mounted!');
        const lk = localStorage.getItem('bk');
        if( lk != null ){
            this.setState({ bk: JSON.parse( lk ) });
        }
    }

    async componentDidUpdate(prevProps: IProps, prevState: IState) {
        console.log("====async componentDidUpdate Search====");
        const { searchInput }: { searchInput: string } = this.state;

        if (searchInput !== prevState.searchInput && searchInput.length > 2) {
            const result = await func.searchArrCityInJsonWithString(searchInput);

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

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        console.log("====handleChange Search====");
        const searchInput = event.currentTarget.value;
        this.setState({
            searchInput
        })
    }

    addBokmarks(id: number) {//event: React.FormEvent<HTMLButtonElement>
        console.log("====async addBokmarks Search====");
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
            });
        }
        localStorage.setItem('bk', JSON.stringify(newBk));
        console.log("State bk new:", this.state.bk);
    }

    render() {
        const { searchInput, city, bk, idCity } = this.state;

        const style1 = {
            cursor: "pointer",
        };

        return (
            <>
                <div className="row">
                    <div className="col">
                        <label>
                            Search City: <br />
                            <input type="text" placeholder="Saint Petersburg" value={searchInput} onChange={this.handleChange} />
                        </label>
                        {city.length > 0 && <h3>Results: </h3>}
                        <div>
                            {city.map((item: any) => <div key={item.id}>
                                <p>
                                    <Link to={"/" + item.id}>
                                        {item.name} ({item.country})
                                    </Link>
                                    &nbsp;
                                    <span style={style1} onClick={() => this.addBokmarks(item.id)}>
                                        {this.state.bk.indexOf( item.id ) != -1 ? "★" : "☆"}
                                    </span>

                                </p>
                            </div>)}
                        </div>
                    </div>
                    <div className="col">
                        <h3>Bookmarks:</h3>
                        <Bookmarks data={bk} idCity={idCity} />
                    </div>
                </div>
            </>
        );
    }
}
