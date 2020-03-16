import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Meme from "./contracts/Meme.json";
import MemeketPlace from "./contracts/MemeketPlace.json";
import getWeb3 from "./getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './Landing/pages/LandingPage.js'
import Feed from './Feed/pages/Feed.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      memeketPlaceNetwork: null,
      memeNetwork: null,
      memeCount: 0,
      memes: [],
      loading: false
    };
  }

  componentDidMount = async () => {

    try {
      console.log("Called")
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
     
        const numberOfMemes = await memeNetwork.methods.numberOfMemes().call();
  
        //Load Memes
        for (var i = 0; i < numberOfMemes; i++) {
          console.log(this.state.memes)
          const meme = await memeNetwork.methods.memes(i).call();
          this.setState({
            memes: [...this.state.memes, meme]
          });
        }
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
  };

  componentWillUnmount(){
    console.log("unmounting...")
  }


  render() {
    console.log(this.state.memes,"check")
    return (
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Link to="/feed"> Feed </Link>

        <Switch>
          <Route path="/feed" render={props => (<Feed {...props} account={this.state.account}
            memeNetwork={this.state.memeNetwork} memes={this.state.memes}
            memeketPlaceNetwork={this.state.memeketPlaceNetwork} />)}
          />
        </Switch>
      </Router>
    )
  }

}

export default App;
