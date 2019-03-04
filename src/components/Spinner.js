import React,{Component} from 'react';
import Loader from 'react-loader-spinner';

class Spinner extends Component {
    render() {
        return(
            <Loader
                type="Plane"
                color="#00BFFF"
                height="40"
                width="40"
            />
        );
    }
}

export default Spinner;
