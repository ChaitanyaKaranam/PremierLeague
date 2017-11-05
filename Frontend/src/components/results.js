import React,{Component} from 'react';
import axios from 'axios';
import ResultItem from './result-item';

class Results extends Component{

    constructor(props){
        super(props);

        this.state={
            winners:[],
            season:2016,
            seasons:[
                2008,2009,2010,2011,2012,2013,2014,2015,2016
            ],
            term:'',
            currentPage:1,
            itemsPerPage:5
        }

        let url=`http://localhost:3000/matches?season=${this.state.season}&team=${this.state.term}`;
        axios(url).then(res=>{
            this.setState({winners:res.data});
        },err=>{
            console.log(err)
        }).catch(err=>{
            console.log(err);
        }); 
        
        this.getResults=this.getResults.bind(this);

    }

    onPageChange(event){
        console.log(event.target.id);
        this.setState({
            currentPage:Number(event.target.id)
        });
    }

    renderPageNumbers(){
        const pageArray=[];
        for(let i=1;i<=Math.ceil(this.state.winners.length/this.state.itemsPerPage);i++){
            pageArray.push(i);
        }

        return pageArray.map((number)=>{
            if(this.state.currentPage===number){
                return <li className="page-item active"><a className="page-link" id={number} onClick={(event)=>{this.onPageChange(event)}}>{number}</a></li>
            }
            return <li className="page-item"><a className="page-link" id={number} onClick={(event)=>{this.onPageChange(event)}}>{number}</a></li>
        })
    }
    
    getResults(winners){
        
        let data=this.state.winners;
        const indexofLast=this.state.currentPage*this.state.itemsPerPage;
        const indexofFirst=indexofLast-this.state.itemsPerPage;
        const activeData=data.slice(indexofFirst,indexofLast);

        return activeData.map(winner=>{
            return(
                <ResultItem data={winner}/>
            )
        })  
        
    }

    getSeasons(){
        return this.state.seasons.map(season=>{
            return <button className="dropdown-item" onClick={()=>{
                        this.setState({season:season});
                        this.onSeasonChange(season);
                    }
                }>{season}</button>
        })
    }

    onSeasonChange(season){
        let url=`http://localhost:3000/matches?season=${season}&team=${this.state.term}`;
        axios(url).then(res=>{
            this.setState({winners:res.data});
        },err=>{
            console.log(err)
        }).catch(err=>{
            console.log(err);
        });
    }

    onSearch(event){
        this.setState({term:event.target.value});        
    }

    onSearchTeam(){
        let url=`http://localhost:3000/matches?season=${this.state.season}&team=${this.state.term}`;
        axios(url).then(res=>{
            this.setState({winners:res.data});
        },err=>{
            console.log(err)
        }).catch(err=>{
            console.log(err);
        });
    }



    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div className="dropdown container">
                            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Season
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {this.getSeasons()}
                            </div>
                        </div>
                    </div>
                    <div className="input-group col-md-6">
                        <input type="text" className="form-control" placeholder="Team" aria-label="Search for..." onChange={(event)=>{this.onSearch(event)}}/>
                        <span className="input-group-btn">
                            <button className="btn btn-dark" type="button" onClick={()=>{this.onSearchTeam()}}>Search</button>
                        </span>
                    </div>    
                </div>                
                <br/>

                <div className="card container text-white bg-danger">
                    <div className="card-body">
                        <h3 className="card-title">{`Season ${this.state.season}`}</h3>
                    </div>
                </div>                
                {this.getResults(this.state.winners)}
                <nav className="col-sm-4" aria-label="Page navigation">
                    <ul className="pagination">
                        {this.renderPageNumbers()}                    
                    </ul>
                </nav> 
            </div>
        );
    }
}

export default Results;