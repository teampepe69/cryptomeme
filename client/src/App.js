import React, { Component, setGlobal } from "reactn";
import Swal from "sweetalert2";
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
import Navbar from "./Navbar/pages/Navbar.js";
import AdminPage from "./Admin/pages/Admin.js";
import SideDrawer from "./Subbar/components/SideDrawer";

setGlobal({
  web3: null,
  userNetwork: null,
  memeNetwork: null,
  memeketPlaceNetwork: null
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testValue: 12345,
      web3: null,
      account: "",
      memeketPlaceNetwork: null,
      deployedMemeketPlaceNetworkData: null,
      memeNetwork: null,
      userNetwork: null
    };
  }

  async componentDidMount() {
    try {
      console.log("Called");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      this.setState({ web3: web3 });
      this.setGlobal({ web3: web3 });

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      //this.setState({ account: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1" });

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
        this.setGlobal({ memeNetwork: memeNetwork });
        //this.setGlobal(memeNetwork => memeNetwork);
      }

      // Get User instance and all the Memes
      const deployedUserNetworkData = User.networks[networkId];

      if (deployedUserNetworkData) {
        const userNetwork = new web3.eth.Contract(
          User.abi,
          deployedUserNetworkData.address
        );
        this.setState({ userNetwork: userNetwork });
        this.setGlobal({ userNetwork: userNetwork });
        //this.setGlobal(userNetwork => userNetwork);
      }

      //Get Memeketplace instance
      const deployedMemeketPlaceNetworkData = MemeketPlace.networks[networkId];
      if (deployedMemeketPlaceNetworkData) {
        const memeketPlaceNetwork = new web3.eth.Contract(
          MemeketPlace.abi,
          deployedMemeketPlaceNetworkData.address
        );
        this.setState({ memeketPlaceNetwork: memeketPlaceNetwork });
        this.setState({
          deployedMemeketPlaceNetworkData: deployedMemeketPlaceNetworkData
        });
        this.setGlobal({ memeketPlaceNetwork: memeketPlaceNetwork });
        //this.setGlobal(memeketPlaceNetwork => memeketPlaceNetwork);
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
          <Navbar
            web3={this.state.web3}
            account={this.state.account}
            deployedMemeketPlaceNetworkData={
              this.state.deployedMemeketPlaceNetworkData
            }
            memeNetwork={this.state.memeNetwork}
            userNetwork={this.state.userNetwork}
            memeketPlaceNetwork={this.state.memeketPlaceNetwork}
          />
          <div style={{ paddingTop: "100px" }}>
            <div style={{ paddingLeft: "20px", width: "120px" }}>
              <SideDrawer />
            </div>
            <div style={{ paddingLeft: "200px", width: "100%" }}>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <LandingPage
                    {...routeProps}
                    account={this.state.account}
                    memeNetwork={this.state.memeNetwork}
                    userNetwork={this.state.userNetwork}
                    memeketPlaceNetwork={this.state.memeketPlaceNetwork}
                  />
                )}
              />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/admin" component={AdminPage} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
