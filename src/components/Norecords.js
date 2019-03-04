import React,{Component} from 'react';
import {Container,Row} from 'react-bootstrap';
import NorecordsImage from "../images/norecords.gif";

class Norecords extends Component{
    render(){
        return(
            <Container>
                <Row className="align-center">
                    <div className="image-div">
                        <img src={NorecordsImage} alt="Gif"/>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Norecords;
