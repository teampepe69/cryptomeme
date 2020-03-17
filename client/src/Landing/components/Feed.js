import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import logo from "../../really_pepe.png";
import ipfs from "../../ipfs";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

class Feed extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.memes);

    this.state = {
      buffer: null,
      memes: this.props.memes,
      loading: false
    };

    this.createMeme = this.createMeme.bind(this);
    this.likeMeme = this.likeMeme.bind(this);
    this.reloadMeme = this.reloadMeme.bind(this);
    this.captureFile = this.captureFile.bind(this);
    console.log(this.state.memes);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.memes !== this.props.memes) {
      this.setState({
        memes: this.props.memes
      });
    }
  }
  componentDidMount() {
    let arr = this.props.memes;
    this.setState(
      {
        memes: arr
      },
      () => {
        console.log(this.state.memes);
      }
    );
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
    console.log(this.props.account);
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    let arr = this.state.memes;
    memePath = memePath;
    this.props.memeNetwork.methods
      .createMeme(this.props.account, memePath, memeTitle, memeDescription)
      .send({
        from: this.props.account
        // gas: 100000
      })
      .then(result => {
        console.log(result);
        this.reloadMeme();
        // memeNetwork.methods.numberOfMemes().call({
        //   from: acc
        // })
        //   .then((result) => {
        //     const numberOfMemes = result;
        //     console.log(numberOfMemes)
        //     for (var i = 0; i < numberOfMemes; i++) {

        //       memeNetwork.methods.memes(i).call({
        //         from: acc
        //       }).then((result) => {
        //         console.log(result)
        //         arr = arr.concat(result)
        //         this.setState({
        //           memes: arr
        //         }, () => {
        //           console.log(this.state.memes)
        //         })

        //       })
        //     }

        //   })
      });
  }

  reloadMeme() {
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    let arr = this.state.memes;

    memeNetwork.methods
      .numberOfMemes()
      .call({
        from: acc
      })
      .then(result => {
        const numberOfMemes = result;
        console.log(numberOfMemes);
        for (var i = 0; i < numberOfMemes; i++) {
          memeNetwork.methods
            .memes(i)
            .call({
              from: acc
            })
            .then(result => {
              console.log(result);
              arr = arr.concat(result);
              this.setState(
                {
                  memes: arr
                },
                () => {
                  console.log(this.state.memes);
                }
              );
            });
        }
      });
  }

  likeMeme(memeId) {
    let arr = this.state.memes;
    console.log(memeId);
    this.props.memeketPlaceNetwork.methods
      .likeMeme(memeId)
      .send({ from: this.props.account })
      .then(result => {
        console.log(result);
        this.props.memeNetwork.methods
          .memes(memeId)
          .call()
          .then(result => {
            console.log(result);
            console.log(arr[memeId]);
            arr[memeId] = result;
            this.setState(
              {
                memes: arr
              },
              () => {
                console.log(this.state.memes);
              }
            );
          });
      });
  }

  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  }

  render() {
    // const classes = useStyles();
    console.log("update", this.state.memes);
    return (
      <div className="Feed">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mr-auto ml-auto">
            <form
              onSubmit={event => {
                event.preventDefault();
                ipfs.files.add(this.state.buffer, (error, result) => {
                  if (error) {
                    console.error(error);
                    return;
                  }
                  const path = result[0].hash;
                  const title = this.memeTitle.value;
                  const description = this.memeDescription.value;
                  this.createMeme(path, title, description);
                });
              }}
            >
              <div className="form-group mr-sm2">
                <input
                  id="memePath"
                  type="file"
                  onChange={this.captureFile}
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
                /*------------- MEME CARDS ---------------------------*/
                <Card key={key}>
                  <CardActionArea>
                    <CardMedia
                      // className={classes.media}
                      image={`https://ipfs.io/ipfs/${meme.memePath}`}
                      title="Pepe"
                      style={{ height: "140px" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {meme.memeTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {meme.memeDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Likes:{meme.memeLikes.toString()}
                    </Typography>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={e => {
                        this.likeMeme(meme.memeId);
                      }}
                    >
                      Like Meme
                    </Button>
                  </CardActions>
                </Card>

                /* <div className="card mb-4" key={key}>
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
                </div> */
              );
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default Feed;
