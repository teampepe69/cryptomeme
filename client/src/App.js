import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Meme from "./contracts/Meme.json";
import MemeketPlace from "./contracts/MemeketPlace.json";
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
      console.log(networkId);

      // Get Meme instance and all the Memes
      const deployedMemeNetworkData = await Meme.networks[networkId];

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

      //Get Memeketplace instance
      const deployedMemeketPlaceNetworkData = MemeketPlace.networks[networkId];
      if (deployedMemeketPlaceNetworkData) {
        const memeketPlaceNetwork = new web3.eth.Contract(
          MemeketPlace.abi,
          deployedMemeketPlaceNetworkData.address
        );
        this.setState({ memeketPlaceNetwork });
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

  createMeme(memePath, memeTitle, memeDescription) {
    this.state.memeNetwork.methods
      .createMeme(this.state.account, memePath, memeTitle, memeDescription)
      .send({ from: this.state.account });
  }

  likeMeme(memeId) {
    this.state.memeketPlaceNetwork.methods
      .likeMeme(memeId)
      .send({ from: this.state.account });
  }

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
    this.createMeme = this.createMeme.bind(this);
    this.likeMeme = this.likeMeme.bind(this);
  }

  render() {
    return (
      <div className="App">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="content mr-auto ml-auto">
            <form
              onSubmit={event => {
                event.preventDefault();
                const path = this.memePath.value;
                const title = this.memeTitle.value;
                const description = this.memeDescription.value;
                this.createMeme(path, title, description);
              }}
            >
              <div className="form-group mr-sm2">
                <input
                  id="memePath"
                  type="text"
                  ref={input => {
                    this.memePath = input;
                  }}
                  className="form-control"
                  placeholder="Meme Path"
                  required
                />
              </div>
              <div className="form-group mr-sm2">
                <input
                  id="memeTitle"
                  type="text"
                  ref={input => {
                    this.memeTitle = input;
                  }}
                  className="form-control"
                  placeholder="Meme Title"
                  required
                />
              </div>
              <div className="form-group mr-sm2">
                <input
                  id="memeDescription"
                  type="text"
                  ref={input => {
                    this.memeDescription = input;
                  }}
                  className="form-control"
                  placeholder="Meme Description"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Share
              </button>
            </form>
            &nbsp;
            {this.state.memes.map((meme, key) => {
              return (
                <div className="card mb-4" key={key}>
                  <ul id="memeList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p>{meme.memePath}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-left mt-1 text-muted">
                        Likes:{meme.memeLikes.toString()}
                      </small>
                      <button
                        className="btn btn-link btn-sm float-right pt-0"
                        name={meme.memeId}
                        onClick={event => {
                          this.likeMeme(event.target.name);
                        }}
                      >
                        Like Meme
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
