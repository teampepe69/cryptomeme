import React, { Component } from "react";
import Feed from "../components/Feed.js";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import Meme from "../../contracts/Meme.json";
import MemeketPlace from "../../contracts/MemeketPlace.json";
import getWeb3 from "../../getWeb3";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
});

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: this.props.account,
      memeketPlaceNetwork: this.props.memeketPlaceNetwork,
      memeNetwork: this.props.memeNetwork,
      userNetwork: this.props.userNetwork
    };
    console.log(this.state.memes)
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("Different")
      // console.log(prevProps)
      // console.log(this.props)

      this.setState({
        account: this.props.account,
        memeketPlaceNetwork: this.props.memeketPlaceNetwork,
        memeNetwork: this.props.memeNetwork,
        userNetwork: this.props.userNetwork
      })

    }
  }


  // async componentDidMount() {
  //   try {
  //     console.log("Called");
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();
  //     this.setState({ account: accounts[0] });
  //     console.log(accounts[0]);

  //     // Get the Contract instances.
  //     const networkId = await web3.eth.net.getId();
  //     // const networkId = localStorage.getItem("networkId")
  //     console.log(networkId);

  //     // Get Meme instance and all the Memes
  //     console.log(Meme.networks);
  //     const deployedMemeNetworkData = Meme.networks[networkId];
  //     console.log(deployedMemeNetworkData);

  //     if (deployedMemeNetworkData) {
  //       const memeNetwork = new web3.eth.Contract(
  //         Meme.abi,
  //         deployedMemeNetworkData.address
  //       );
  //       // this.setState({ memeNetwork: memeNetwork });
  //       this.setState({ memeNetwork: memeNetwork });

  //       const numberOfMemes = await memeNetwork.methods.numberOfMemes().call();
  //       console.log(numberOfMemes);
  //       //Load Memes
  //       for (var i = 0; i < numberOfMemes; i++) {
  //         console.log(this.state.memes);
  //         const meme = await memeNetwork.methods.memes(i).call();
  //         this.setState({
  //           memes: [...this.state.memes, meme]
  //         });
  //       }
  //     }

  //     //Get Memeketplace instance
  //     const deployedMemeketPlaceNetworkData = MemeketPlace.networks[networkId];
  //     if (deployedMemeketPlaceNetworkData) {
  //       const memeketPlaceNetwork = new web3.eth.Contract(
  //         MemeketPlace.abi,
  //         deployedMemeketPlaceNetworkData.address
  //       );
  //       this.setState({ memeketPlaceNetwork: memeketPlaceNetwork });
  //     }

  //     console.log(this.state.memeNetwork);

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     //this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`
  //     );
  //     console.error(error);
  //   }
  // }

  // componentWillUnmount() {
  //   console.log("unmounting...");
  // }

  render() {
    const { classes } = this.props;
    console.log(this.props)
    // console.log(this.props.memeketPlaceNetwork);
    // console.log(this.state.memeketPlaceNetwork)


    return (
      <Container fixed>
      
          <Feed
            account={this.state.account}
            memeNetwork={this.state.memeNetwork}
            memeketPlaceNetwork={this.state.memeketPlaceNetwork}
            userNetwork = {this.state.userNetwork}
          /> 

      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LandingPage);

