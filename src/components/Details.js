import React,{Component} from 'react';
import {Container,Row} from 'react-bootstrap';
import {appConfig} from "../config";
import axios from "axios/index";
import  Spinner  from  "./Spinner";
import _ from "lodash";
import SubSection from "./Subsection";

class Details extends Component{
    constructor(props){
        super(props);
        this.state = {
            gifId:props.match.params.gifId,
            detailsInfo:{},
            trendingStickers:[]
        }
    }

    componentWillReceiveProps(){
        this.setState({gifId:this.props.match.params.gifId});
    }


    getTrendingStickers(){
        axios.get(appConfig.baseUrlStickers+'trending?api_key='+appConfig.apiKey+'&limit='+appConfig.apiLimit)
            .then(res => {
                if(_.has(res,'data.data')){
                    this.setState({ trendingStickers: res.data.data});
                }
            });
    };

    componentDidMount() {
        axios.get(appConfig.baseUrlGifs+this.state.gifId+'?api_key='+appConfig.apiKey)
            .then(res => {
                if(_.has(res,'data.data')){
                    this.setState({ detailsInfo: res.data.data});
                }
            });

        this.getTrendingStickers();
    }





    render(){

        let gifInfo = (!_.isEmpty(this.state.detailsInfo)) ? (<img src={this.state.detailsInfo.images.original.url} alt="Gif" className="show-cursor-pointer"/>): (<Spinner />);
        let trendingStickers = (this.state.trendingStickers.length) ? (<SubSection data={this.state.trendingStickers}/>) : (<Spinner />);

        return(
            <Container>
                <Row className="align-center">
                    <div className="image-div">
                        {gifInfo}
                    </div>
                </Row>

                <Row>
                    <h3>Trending Stickers</h3>
                    {trendingStickers}
                </Row>
            </Container>
        )
    }
}

export default Details;
