import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../../img/goodjob_pepe.png'
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: '80%',
    marginTop: '3%',
    display: 'flex',
    padding: theme.spacing(2),
    borderRadius: 16,
  },
  media: {
    width: 150,
    height: 200,
    minWidth: '25%',
    maxWidth: '25%',
    
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    flexShrink: '0',
    borderRadius: '12px',
    // backgroundColor: '#eeeeee'
  },
  content: {
    padding: theme.spacing(0, 0, 0, 6),
    width: '100%'
  },
  divider: {
    margin: theme.spacing(2, 0),
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
            }, () => { console.log(this.state.memes) })
          })
      });
  }

  render() {
    const { classes } = this.props;
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
                <Card key={key} className={classes.root} >

                  {/* <CardActionArea> */}

                  <CardMedia
                    className={classes.media}
                    image={logo}
                    title="Pepe"

                  />

                  <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {meme.memeTitle}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      {meme.memePath}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify'}}>
                      {meme.memeDescription}
                    </Typography>
                    <Divider className={classes.divider} light />

                    <div style={{display: 'flex', flexDirection:'row'}}>
                      <Typography variant="button" color="primary" component="p" style={{padding: '4px 5px'}}>
                        LIKES:{meme.memeLikes.toString()}
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
                    </div>
                  </CardContent>


                  {/* </CardActionArea> */}


                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Feed);