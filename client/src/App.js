import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Meme from "./contracts/Meme.json";
import MemeketPlace from "./contracts/MemeketPlace.json";
import getWeb3 from "./getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import LandingPage from './Landing/pages/LandingPage.js'
import ProfilePage from './Profile/pages/Profile.js'
import Subbar from './Landing/pages/Subbar.js'
import Navbar from './Navbar/pages/Navbar.js'

class App extends Component {
  render() {
    
    return (
      <div style={{backgroundColor:'#9acdbaff', height: '100%', minHeight: '100vh'}}>
        <Router>
          <Navbar />
            <div style={{paddingTop: '100px'}} >
              <div style={{paddingLeft: '20px', width:'20%', float:'left'}}>
                <Subbar />
              </div>
              <div style={{paddingLeft: '200px'}}>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/profile" component={ProfilePage} />
              </div>
              
            </div>
        </Router>
      </div>
    )
  }
}

export default App;
