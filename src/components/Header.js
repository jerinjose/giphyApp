import React,{Component} from 'react';
import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Search from './Search';

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            seachKeyWord : '',
            urlPath:(props.location.pathname === '/stickers') ? 'sticker': 'gif'
        };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }


    search(){
        let keyword = this.state.seachKeyWord.split(' ');
        let encoded = keyword.join('+');
        let queryString = "q=" + encoded.replace('/\+\s*$/', "");
        this.props.history.push(`/search?${queryString}`);
    }

    onHandleSubmit(e) {
        e.preventDefault();
        this.search();
    }

    handleChange(event) {
        this.setState({seachKeyWord: event.target.value});
    }

    componentWillReceiveProps(){
        this.setState({urlPath:(this.props.location.pathname === '/stickers') ? 'sticker': 'gif'});
    }


    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sportz Gallery</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" className={(this.state.urlPath === 'gif' ? 'active':'')}>Gifs</Nav.Link>
                        <Nav.Link href="/stickers" className={(this.state.urlPath === 'sticker' ? 'active':'')}>Stickers</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={this.onHandleSubmit.bind(this)}>
                        <FormControl type="text" placeholder="Search" onChange={this.handleChange} className="mr-sm-2" />
                        <Button variant="outline-success" onClick={this.search}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default  withRouter(Header);
