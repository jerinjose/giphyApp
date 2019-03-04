import React,{Component} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { withRouter } from 'react-router-dom';

class SubSection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            galleryImages:props.data || []
        };

        this.getGifInfo = this.getGifInfo.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({galleryImages:this.props.data});
    }

    responsive = {
        0: { items: 1 },
        600: { items: 3 },
        1024: { items: 5 },
    };

    stagePadding = {
        paddingLeft: 20,
        paddingRight: 20,
    };


    getGifInfo(gifId){
        this.props.history.push('/details/'+gifId);
    };


    galleryItems() {
        return (
            this.state.galleryImages.map((obj, objIndex) => (
                <img
                    key={objIndex}
                    src={obj.images.fixed_height_still.url}
                    onClick={this.getGifInfo.bind(this,obj.id)}
                    className="show-cursor-pointer"
                    alt="Gif"
                />
            ))
        )
    };


    render(){
        let carouselItems = '';
        if(this.state.galleryImages && this.state.galleryImages.length){
            carouselItems = this.galleryItems()
        }else{
            carouselItems = [];
        }
        return(
            <AliceCarousel
                items={carouselItems}
                duration={400}
                autoPlay={false}
                startIndex = {1}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                playButtonEnabled={false}
                autoPlayInterval={1000}
                autoPlayDirection="rtl"
                dotsDisabled={true}
                buttonsDisabled={false}
                responsive={this.responsive}
                stagePadding={this.stagePadding}
                disableAutoPlayOnAction={true}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
            />
        )
    }
}

export default withRouter(SubSection);
