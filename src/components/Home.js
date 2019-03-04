import React,{Component} from 'react';
import { Container,Row} from 'react-bootstrap';
import Slider from './Slider';
import Subcontainer from "./Subcontainer";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            context:(props.match.path === '/stickers') ? 'sticker' : ''
        };
    }

    componentWillReceiveProps(){
        this.setState({context:(this.props.match.path === '/stickers') ? 'sticker' : ''})
    }

    render(){
        return(
            <Container>
                <Row className="main-slider">
                  <Slider context={this.state.context}/>
                </Row>
                <Row>
                    <Subcontainer context={this.state.context}/>
                </Row>
            </Container>
        )
    }
}

export default Home;
