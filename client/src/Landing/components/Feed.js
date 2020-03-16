import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../../really_pepe.png'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


class Feed extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.memes)

    this.state = {
      memes: this.props.memes,
      loading: false
    };

    this.createMeme = this.createMeme.bind(this);
    this.likeMeme = this.likeMeme.bind(this);
    this.reloadMeme = this.reloadMeme.bind(this);
    console.log(this.state.memes)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.memes !== this.props.memes) {
      this.setState({
        memes: this.props.memes
      })
    }
  }
  componentDidMount() {
    let arr = this.props.memes
    this.setState({
      memes: arr
    }, () => { console.log(this.state.memes) })

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
        this.reloadMeme()
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

      })

  }

  reloadMeme() {
    const memeNetwork = this.props.memeNetwork
    const acc = this.props.account
    let arr = this.state.memes

    memeNetwork.methods.numberOfMemes().call({
      from: acc
    })
      .then((result) => {
        const numberOfMemes = result;
        console.log(numberOfMemes)
        for (var i = 0; i < numberOfMemes; i++) {

          memeNetwork.methods.memes(i).call({
            from: acc
          }).then((result) => {
            console.log(result)
            arr = arr.concat(result)
            this.setState({
              memes: arr
            }, () => {
              console.log(this.state.memes)
            })
          })
        }

      })
  }




  likeMeme(memeId) {
    let arr = this.state.memes
    console.log(memeId)
    this.props.memeketPlaceNetwork.methods
      .likeMeme(memeId)
      .send({ from: this.props.account })
      .then(result => {
        console.log(result)
        this.props.memeNetwork.methods.memes(memeId).call()
        .then(result => {
          console.log(result)
          console.log(arr[memeId])
          arr[memeId] = result;
          this.setState({
            memes: arr
          }, ()=> {console.log(this.state.memes)})
        })
      });
  }

  render() {
    // const classes = useStyles();
    console.log("update", this.state.memes)
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
                /*------------- MEME CARDS ---------------------------*/
                <Card key={key}>
                  <CardActionArea>
                    <CardMedia
                      // className={classes.media}
                      image={logo}
                      title="Pepe"
                      style={{height: '140px'}}
                     
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {meme.memeTitle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {meme.memePath}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Likes:{meme.memeLikes.toString()}
                    </Typography>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary"

                      onClick={(e) => {
                        this.likeMeme(meme.memeId);
                      }}>
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