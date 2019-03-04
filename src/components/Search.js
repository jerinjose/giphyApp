import React,{Component} from 'react';
import { Card,Container,Row} from 'react-bootstrap';
import {appConfig} from "../config";
import axios from "axios/index";
import  Spinner  from  "./Spinner";
import  Norecords  from  "./Norecords";
import _ from "lodash";
import { withRouter } from 'react-router-dom';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:'search'+props.location.search,
            searchInfo:[],
            apiSuccess:false,
            apiError:false
        };
        this.getGifInfo = this.getGifInfo.bind(this);
    }


    componentWillReceiveProps(nextProps){
        this.setState({keyword:'search'+this.props.location.search});
        this.getSearchDetails();
    }

    getSearchDetails(){
        console.log('111',this.state.keyword)
        axios.get(appConfig.baseUrlGifs+this.state.keyword+'&api_key='+appConfig.apiKey+'&limit='+appConfig.apiLimitSearch)
            .then(res => {
                let searchInfo = [];
                if(_.has(res,'data.data')){
                    searchInfo = _.filter(res.data.data, function(item) {
                        return item.type === 'gif';
                    });
                    this.setState({ searchInfo: searchInfo});
                    this.setState({apiSuccess:true});
                }
            }).catch(error => {
            this.setState({apiError:true});
        });
    }

    componentDidMount() {
        this.getSearchDetails();
    }

    getGifInfo(gifId){
        this.props.history.push('/details/'+gifId);
    }

    render(){

        let searchItems = '';
        if(this.state.apiSuccess && this.state.searchInfo.length){
            searchItems = this.state.searchInfo.map((obj,objIndex) =>
                <Card style={{ width: '17rem' }} key={objIndex} onClick={this.getGifInfo.bind(this,obj.id)}>
                    <Card.Img variant="top" src={obj.images.fixed_width.url} />
                    <Card.Body>
                        <Card.Title>{obj.title}</Card.Title>
                    </Card.Body>
                </Card>
            );
        }else if(this.state.apiSuccess || this.state.apiError || this.state.searchInfo.length === 0){
            searchItems = (<Norecords />);
        }else{
            searchItems = (<Spinner />);
        }

        return(
            <Container>
                <Row>
                    {searchItems}
                </Row>
            </Container>
        )
    }
}

export default withRouter(Search);
