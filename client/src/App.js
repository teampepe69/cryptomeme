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
import Navbar from './Navbar/pages/Navbar.js'

// import Subbar from './Subbar/pages/Subbar'
import SideDrawer from './Subbar/components/SideDrawer'
// import Backdrop from './Subbar/components/Backdrop'

class App extends Component {
  // state = {
  //   sideDrawerOpen: false,
  // }

  // drawerToggleClickHandler = () => {
  //   this.setState(prevState => {
  //     return { sideDrawerOpen: !prevState.sideDrawerOpen }
  //   })
  // }

  // backdropClickHandler = () => {
  //   this.setState({ sideDrawerOpen: false })
  // }

  render() {
    // let backdrop;

    // if (this.state.sideDrawerOpen) {
    //   backdrop = <Backdrop click={this.backdropClickHandler} />;
    // }
    return (
      <div style={{backgroundColor:'#9acdbaff', height: '100%', minHeight: '100vh'}}>
        <Router>
          <Navbar />
            <div style={{paddingTop: '100px'}} >
              <div style={{paddingLeft: '20px'}}></div>

              <SideDrawer />

              {/* <Subbar drawerClickHandler={this.drawerToggleClickHandler} />
              <SideDrawer show={this.state.sideDrawerOpen} />
              {backdrop} */}
              </div>
              <div style={{paddingLeft: '200px'}}>
                <Route exact path="/" component={LandingPage} />
              </div>
        </Router>

      </div>
    )
  }
}

export default App
