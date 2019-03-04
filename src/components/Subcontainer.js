import React,{Component} from 'react';
import SubSection from "./Subsection";
import _ from "lodash";
import {appConfig} from "../config";
import axios from "axios/index";
import { Container} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import  Norecords  from  "./Norecords";

class Subcontainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cricket:[],
            football:[],
            tennis:[],
            trendingGifs:[],
            baseUrl:(props.context === 'sticker') ? appConfig.baseUrlStickers: appConfig.baseUrlGifs
        };
    }


    getCricketGifs(){
        axios.get(this.state.baseUrl+'search?q=cricket&api_key='+appConfig.apiKey+'&limit='+appConfig.apiLimitSub)
            .then(res => {
                let cricket = [];
                if(_.has(res,'data.data')){
                    cricket = _.filter(res.data.data, function(item) {
                        return item.type === 'gif';
                    });
                    this.setState({ cricket: cricket});
                }
            });
    };

    getFootballGifs(){
        axios.get(this.state.baseUrl+'search?q=football&api_key='+appConfig.apiKey+'&limit='+appConfig.apiLimit)
            .then(res => {
                let football = [];
                if(_.has(res,'data.data')){
                    football = _.filter(res.data.data, function(item) {
                        return item.type === 'gif';
                    });
                    this.setState({ football: football});
                }
            });
    };

    getTennisGifs(){
        axios.get(this.state.baseUrl+'search?q=tennis&api_key='+appConfig.apiKey+'&limit='+appConfig.apiLimit)
            .then(res => {
                let tennis = [];
                if(_.has(res,'data.data')){
                    tennis = _.filter(res.data.data, function(item) {
                        return item.type === 'gif';
                    });
                    this.setState({ tennis: tennis});
                }
            });
    };

    componentDidMount() {
        this.getCricketGifs();
        this.getFootballGifs();
        this.getTennisGifs();
    }

    componentWillReceiveProps(){
        this.setState({baseUrl:(this.props.match.params.context === 'sticker') ? appConfig.baseUrlStickers: appConfig.baseUrlGifs});
    };

    render(){

        let cricketGifs = (this.state.cricket.length) ? (<SubSection data={this.state.cricket}/>) : (<Norecords />);
        let footballGifs = (this.state.football.length) ? (<SubSection data={this.state.football}/>) : (<Norecords />);
        let tennisGifs = (this.state.tennis.length) ? (<SubSection data={this.state.tennis}/>) : (<Norecords />);

        return(
            <div>
                <Container>
                    <h3>Cricket</h3>
                    {cricketGifs}

                    <h3>Tennis</h3>
                    {tennisGifs}

                    <h3>Football</h3>
                    {footballGifs}
                </Container>
            </div>
        )
    }
}

export default withRouter(Subcontainer);
