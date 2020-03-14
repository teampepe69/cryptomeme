import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Meme from "./contracts/Meme.json";
import getWeb3 from "./getWeb3";

class App extends Component {
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      // Get the Contract instances.
      const networkId = await web3.eth.net.getId();

      // Get Meme instance and all the Memes
      const deployedMemeNetworkData = Meme.networks[networkId];
      if (deployedMemeNetworkData) {
        const memeNetwork = new web3.eth.Contract(
          Meme.abi,
          deployedMemeNetworkData.address
        );
        this.setState({ memeNetwork });
        const numberOfMemes = await memeNetwork.methods.numberOfMemes().call();

        //Load Memes
        for (var i = 0; i < numberOfMemes; i++) {
          const meme = await memeNetwork.methods.memes(i).call();
          this.setState({
            memes: [...this.state.memes, meme]
          });
        }
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

  //Todo: Remove
  //runExample = async () => {
  //const { accounts, contract } = this.state;
  // Stores a given value, 5 by default.
  //await contract.methods.set(5).send({ from: accounts[0] });
  // Get the value from the contract to prove it worked.
  //const response = await contract.methods.get().call();
  // Update state with the result.
  //this.setState({ storageValue: response });
  //};

  createMeme(memePath) {
    this.state.memeNetwork.methods.createMeme(this.state.account, memePath);
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      memeNetwork: null,
      memes: [],
      loading: false
    };
    this.createMeme = this.createMeme.bind(this);
  }

  render() {
    return (
      <div className="App">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          {this.state.memes.map((meme, key) => {
            return (
              <div className="card mb-4" key={key}>
                <ul id="memeList" className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p>{meme.memePath}</p>
                  </li>
                  <li key={key} className="list-group-item py-2">
                    <small className="float-left mt-1 text-muted">
                      Likes:{meme.numLikes.toString()}
                    </small>
                    <button className="btn btn-link btn-sm float-right pt-0">
                      Approve Meme
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}

export default App;
