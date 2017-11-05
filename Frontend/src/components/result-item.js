import React, {Component} from 'react';
import moment from 'moment';

class ResultItem extends Component{

    constructor(props){
        super(props);
        this.state={
            data:this.props.data
        }        
    }


    getTitle(data){
        if(data.team1===data.winner){
            return(
                <h2>
                    <b>{data.team1}</b>&nbsp;vs&nbsp;<b style={{'color': '#C0C0C0'}}>{data.team2}</b>
                </h2>
            ) 
        }
        else{
            return(
                <h2>
                    <b style={{'color': '#C0C0C0'}}>{data.team1}</b>&nbsp;vs&nbsp;<b>{data.team2}</b>
                </h2> 
            ) 
        }
    }

    getWonby(data){
        if(data.win_by_runs===0){
            return `${data.win_by_wickets} wickets`
        }
        else{
            return `${data.win_by_runs} runs`
        }
    }

    getDate(data){
        let myDate=data.date;
        var d=new Date(myDate);        
        return `${moment(data.date).format('MMMM Do YYYY')}`
    }

    render(){
        if(!this.state.data){
            return <div>Loading...</div>
        }
        return(
            <div>
                <br/>
                <h5 className="container badge-danger"><span className="badge badge-danger">{this.getDate(this.props.data)}</span></h5>               
                <div className="card container">
                    <div className="card-body">
                        <div className="card-title">{this.getTitle(this.props.data)}</div>
                        <hr/>
                        <div className="card-text">
                            <h4>
                                {`${this.props.data.winner} won by ${this.getWonby(this.props.data)}`}
                            </h4>
                            <p className="card-subtitle mb-2 text-muted">{this.props.data.venue}, {this.props.data.city}</p>
                            <br/>
                            <h6>Player of Match: <span className="badge badge-dark">{this.props.data.player_of_match}</span></h6>
                        </div>
                    </div>    
                </div>
                <br/>
            </div>   
        );
    }
}

export default ResultItem;