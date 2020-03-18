import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Meme from "./contracts/Meme.json";
import User from "./contracts/User.json";
import MemeketPlace from "./contracts/MemeketPlace.json";
import getWeb3 from "./getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import LandingPage from "./Landing/pages/LandingPage.js";
import ProfilePage from "./Profile/pages/Profile.js";
import Subbar from "./Landing/pages/Subbar.js";
import Navbar from "./Navbar/pages/Navbar.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testValue: 12345,
      account: "",
      memeketPlaceNetwork: null,
      memeNetwork: null,
      userNetwork: null
    };
  }

  async componentDidMount() {
    try {
      console.log("Called");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      // Get the Contract instances.
      const networkId = await web3.eth.net.getId();
      // const networkId = localStorage.getItem("networkId")

      // Get Meme instance and all the Memes
      const deployedMemeNetworkData = Meme.networks[networkId];

      if (deployedMemeNetworkData) {
        const memeNetwork = new web3.eth.Contract(
          Meme.abi,
          deployedMemeNetworkData.address
        );
        this.setState({ memeNetwork: memeNetwork });
      }

      // Get User instance and all the Memes
      const deployedUserNetworkData = User.networks[networkId];

      if (deployedUserNetworkData) {
        const userNetwork = new web3.eth.Contract(
          User.abi,
          deployedUserNetworkData.address
        );
        this.setState({ userNetwork: userNetwork });
      }

      //Get Memeketplace instance
      const deployedMemeketPlaceNetworkData = MemeketPlace.networks[networkId];
      if (deployedMemeketPlaceNetworkData) {
        const memeketPlaceNetwork = new web3.eth.Contract(
          MemeketPlace.abi,
          deployedMemeketPlaceNetworkData.address
        );
        this.setState({ memeketPlaceNetwork: memeketPlaceNetwork });
      }

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#9acdbaff",
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <Router>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Navbar
                {...routeProps}
                account={this.state.account}
                memeNetwork={this.state.memeNetwork}
                userNetwork={this.state.userNetwork}
                memeketPlaceNetwork={this.state.memeketPlaceNetwork}
              />
            )}
          />
          <div style={{ paddingTop: "100px" }}>
            <div style={{ paddingLeft: "20px", width: "20%", float: "left" }}>
              <Subbar />
            </div>
            <div style={{ paddingLeft: "200px" }}>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/profile" component={ProfilePage} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
