import React, {Component} from 'react';
import func from "../utils/functions";
import InfoWeather from "./InfoWeather";

interface IProps {
    idCity: string
}

interface IState {
    data?: any,//{cod?: string, message?: any, cnt?: number, list?: [], city?: {}}
    idCity: number,
    loading: boolean,
    error: boolean
}

export class City extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: {},
            idCity: 0,
            loading: true,
            error: false
        };

        this.isEmptyObject = this.isEmptyObject.bind(this);
    }

    async componentWillMount() {
        console.log("====async componentWillMount City====");
        const idCity = Number(this.props.idCity);
        if (idCity !== undefined) {
            const result = await func.query5DaysDataWetherinApiWithIdCity(idCity);
            console.log('result: ', result);
            if ( !this.isEmptyObject(result) ) {
                if( result.cod == "200" ){
                    this.setState({
                        data: result,
                        idCity: idCity,
                        loading: false,
                        error: false
                    });
                }else{
                    this.setState({
                        idCity: idCity,
                        loading: false,
                        error: true
                    });
                }

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
        const {data, loading, error}: IState = this.state;

        if( error ) {
            return (
                <>
                    <h1 className="card-title">City not found</h1>
                </>
            );
        }else if ( loading ){
            return (
                <>
                    <h1 className="card-title">Loading...</h1>
                </>
            );
        }else{
            let dateLast = "";
            const showDateFunc = ( date_post: string ): boolean =>{
                //console.log("showDateFunc PARAM date_post", date_post );
                //console.log("showDateFunc PARAM dateLast",  dateLast );
                if( dateLast.split(" ")[0] != date_post.split(" ")[0] ){
                    dateLast = date_post;
                    return true;
                }else{
                    //dateLast = date_post;
                    return false;
                }
            };

            //dt_txt: "2020-04-17 03:00:00"
            //const dateTime = dt_txt.split(" ")[0].split("-")[2]+"-"+dt_txt.split(" ")[0].split("-")[1];

            return (
                <div className="container">
                    <h1 className="card-title mb-5">Weather in {data.city.name} ({data.city.country})</h1>
                    <div>
                        {data.list.map((item: any) =>
                            <div key={item.dt}>
                                {showDateFunc(item.dt_txt) &&
                                <div className="card mt-5">
                                    <div className="card-body text-center">
                                        <h3>{item.dt_txt.split(" ")[0].split("-")[2]+"-"+item.dt_txt.split(" ")[0].split("-")[1]}</h3>
                                    </div>
                                </div>
                                }
                                <InfoWeather data={item} />
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }
}


/*export default async ({ idCity }: IProps) => {
    getWeather(idCity).then( res => {
        console.log(res);
        return (
            <h1 className="card-title">Weather in City (id{idCity})</h1>
        )
    });
    return (
        <h1 className="card-title">HZ in City (id{idCity})</h1>
    )
}*/
