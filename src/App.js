import React, { Component } from 'react';
import Header from './components/Header';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import Details from './components/Details';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/stickers" component={Home}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/details/:gifId" component={Details}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
