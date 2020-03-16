import React, { Component } from "react";


class Feed extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        
        this.state = {
            memes: this.props.memes,
            loading: false
        };

        this.createMeme = this.createMeme.bind(this);
        this.likeMeme = this.likeMeme.bind(this);
        this.reloadMeme = this.reloadMeme.bind(this);
    }


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
        console.log(this.props.account)
        const memeNetwork = this.props.memeNetwork
        const acc = this.props.account
        let arr = this.state.memes
        this.props.memeNetwork.methods
            .createMeme(this.props.account, memePath, memeTitle, memeDescription)
            .send({
                from: this.props.account,
                // gas: 100000
            })
            .then((result) => {
                console.log(result)
                memeNetwork.methods.numberOfMemes().call({
                    from: acc
                })
                .then((result) => {
                    const numberOfMemes = result;
                    console.log(numberOfMemes)
                    for(var i=0; i<numberOfMemes; i++){
           
                        memeNetwork.methods.memes(i).call({
                            from: acc
                        }).then((result) => {
                            console.log(result)
                            arr = arr.concat(result)
                            this.setState({
                                memes: arr
                            }, ()=> {
                                console.log(this.state.memes)
                            })
                           
                   
                        })
                    }
               
                  
                })
            
            })

    }

    reloadMeme() {
        const memeNetwork = this.props.memeNetwork
        const acc = this.props.account
        let arr = this.state.memes
        memeNetwork.methods.numberOfMemes().call({
            from: acc
        },(error,result) => {
            const numberOfMemes = result;
            console.log(numberOfMemes)
            for(var i=0; i<numberOfMemes; i++){
                // memeNetwork.methods.memes(i).call({from: this.props.account},function(error, result){
                //     const meme = result
                //     this.setState({
                //         memes: [...this.props.memes, meme]
                //     })
                // })
                memeNetwork.methods.memes(i).call({
                    from: acc
                }, (error,result) => {
                    console.log(result)
                    arr = arr.concat(result)
                    this.setState({
                        memes: arr
                    });
           
                })
            }
            console.log(arr)
          
        })
      
   
    }




    likeMeme(memeId) {
        this.props.memeketPlaceNetwork.methods
            .likeMeme(memeId)
            .send({ from: this.props.account });
    }

    render() {
        console.log("update", this.state.memes)
        return (
            <div className="Feed">
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

export default Feed;