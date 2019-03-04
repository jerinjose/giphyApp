import React,{Component} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {appConfig} from '../config';
import _ from 'lodash';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class Slider extends Component{

    constructor(props) {
        super(props);
        this.state = {
            trendingGifs:[],
            context:props.match.params.context,
            baseUrl:(props.context === 'sticker') ? appConfig.baseUrlStickers: appConfig.baseUrlGifs
        };

        this.getGifInfo = this.getGifInfo.bind(this);
    }

    getGifInfo(gifId){
        this.props.history.push('/details/'+gifId);
    };

    componentWillReceiveProps(){
        this.setState({context:this.props.match.params.context});
        this.setState({baseUrl:(this.props.context === 'sticker') ? appConfig.baseUrlStickers: appConfig.baseUrlGifs});
    };

    componentDidMount() {
        axios.get(this.state.baseUrl+'search?q=sports&api_key='+appConfig.apiKey+'&limit='+appConfig.apiLimit)
            .then(res => {
                let trendingGifs = [];
                if(_.has(res,'data.data')){
                    trendingGifs = _.filter(res.data.data, function(item) {
                        return item.type === 'gif';
                    });
                    this.setState({ trendingImgs: trendingGifs});
                }
            });
    }

    responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 5 },
    };

    stagePadding = {
        paddingLeft: 0,
        paddingRight: 0,
    };

    galleryItems() {
        return (
            this.state.trendingImgs.map((obj, objIndex) => (
                <img
                    key={objIndex}
                    src={obj.images.fixed_height_downsampled.url}
                    onClick={this.getGifInfo.bind(this,obj.id)}
                    className="show-cursor-pointer"
                    alt="Gif"
                />
            ))
        )
    };

    render(){
        let carouselItems = '';
        if(this.state.trendingImgs && this.state.trendingImgs.length){
            carouselItems = this.galleryItems()
        }else{
            carouselItems = [];
        }

        return(
            <AliceCarousel
                items={carouselItems}
                duration={400}
                autoPlay={true}
                startIndex = {0}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                playButtonEnabled={false}
                autoPlayInterval={1000}
                autoPlayDirection="ltr"
                dotsDisabled={true}
                buttonsDisabled={true}
                responsive={this.responsive}
                stagePadding={this.stagePadding}
                disableAutoPlayOnAction={false}
            />
        )
    }
}

export default withRouter(Slider);
