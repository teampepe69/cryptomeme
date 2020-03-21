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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Divider from '@material-ui/core/Divider';
import ipfs from "../../ipfs";
import {
  Modal, TextField
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: '80%',
    marginTop: '3%',
    display: 'flex',
    padding: theme.spacing(2),
    borderRadius: 16,
  },
  empty_root: {
    width: '100%',
    marginTop: '3%',
    display: 'flex',
    padding: theme.spacing(2),
    borderRadius: 16,
  },
  media: {
    // width: 150,
    // height: 200,
    minWidth: '20%',
    maxWidth: '20%',
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    flexShrink: '0',
    borderRadius: '12px',
    // backgroundColor: '#eeeeee'
  },
  empty_media: {
    minWidth: '30%',
    maxWidth: '30%',
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    flexShrink: '0',
    borderRadius: '12px',
    height: '250px'
  },
  content: {
    padding: theme.spacing(0, 0, 0, 6),
    width: '100%'
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    height: '50px',
    backgroundColor: '#6aa84fff',
    color: 'whitesmoke',
    "&:hover": {
      backgroundColor: "#6aa84fff"
    }
  },
  progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }
});

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buffer: null,
      memes: [],
      loading: false,
      open: false,
      memeTitle: '',
      memeDescription: ''
    };


    console.log(this.state.memes)

    this.createMeme = this.createMeme.bind(this);
    this.likeMeme = this.likeMeme.bind(this);
    this.updateMeme = this.updateMeme.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMeme = this.getMeme.bind(this);
    // this.getMeme();

  }



  async getMeme() {
    console.log("getmeme is called")
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    let numberOfMemes = 0;
    let arr = this.state.memes;
    console.log(arr)
    const result = await memeNetwork.methods
      .numberOfMemes()
      .call({
        from: acc
      })
    console.log(result)
    for (var i = 0; i < result; i++) {
      console.log("index: ", i)
      const meme = await memeNetwork.methods.memes(i).call({ from: acc })

      // console.log(result)
      arr = arr.concat(meme)
      this.setState({
        memes: [...arr]
      })

      console.log(this.state.memes)

      // this.setState({ memes: arr })
    }

    // .then(result => {
    //   for (var i = 0; i < result; i++) {
    //     console.log("index: ", i)
    //     memeNetwork.methods.memes(i).call({ from: acc })
    //       .then((result) => {
    //         // console.log(result)
    //         const meme = result
    //         arr = arr.concat(meme)
    //         this.setState({
    //           memes: [...arr]
    //         })

    //         // this.setState({ memes: arr })

    //       }, error => {
    //         console.log(error)
    //       });

    //   }
    // })


  }



  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("Different")
      console.log(prevProps)
      console.log(this.props)
      if (this.props.memeNetwork !== null) {
        this.getMeme()
      }
    }
  }



  createMeme(memePath, memeTitle, memeDescription) {
    console.log(this.props);
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    console.log(acc)
    let arr = this.state.memes;
    memePath = memePath;
    this.props.memeNetwork.methods
      .createMeme(acc, memePath, memeTitle, memeDescription)
      .send({
        from: acc
        // gas: 100000
      })
      .then(() => {
        this.updateMeme();
        this.handleClose();
      })
  }

  async updateMeme() {
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    let arr = this.state.memes;
    console.log(arr)
    const numOfMemes = await memeNetwork.methods.numberOfMemes().call({from:acc})
    const newMeme = await memeNetwork.methods.memes(numOfMemes -1).call({from:acc})
    arr = arr.concat(newMeme)
    this.setState({memes: arr})

    // memeNetwork.methods
    //   .numberOfMemes()
    //   .call({
    //     from: acc
    //   })
    //   .then(result => {
    //     const numberOfMemes = result;
    //     console.log(numberOfMemes);
    //     console.log(arr.length)
    //     memeNetwork.methods
    //       .memes(numberOfMemes - 1)
    //       .call({
    //         from: acc
    //       }).then((result) => {
    //         console.log(result)
    //         arr = arr.concat(result)
    //         console.log("updated arr", arr)
    //         this.setState({ memes: arr })
    //       }, error => {
    //         console.log(error)
    //       })


    //   });
  }

  async likeMeme(memeId) {
    let arr = this.state.memes;
    let acc = this.props.account
    console.log(memeId);
    await this.props.memeketPlaceNetwork.methods.likeMeme(memeId).send({from: acc})
    const updateMeme = await this.props.memeNetwork.methods.memes(memeId).call()
    arr[memeId] = updateMeme
    this.setState({memes: arr})

    // this.props.memeketPlaceNetwork.methods
    //   .likeMeme(memeId)
    //   .send({ from: this.props.account })
    //   .then(result => {
    //     console.log(result);
    //     this.props.memeNetwork.methods
    //       .memes(memeId)
    //       .call()
    //       .then(result => {
    //         console.log(result);
    //         console.log(arr[memeId]);
    //         arr[memeId] = result;
    //         this.setState(
    //           {
    //             memes: arr
    //           },
    //           () => {
    //             console.log(this.state.memes);
    //           }
    //         );
    //       }, error => console.log(error));
    //   });
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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.memeTitle)
    console.log(this.state.memeDescription)
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      const path = result[0].hash;
      const title = this.state.memeTitle;
      const description = this.state.memeDescription;
      // const title = this.state.memeTitle;
      // const description = this.state.memeDescription;
      this.createMeme(path, title, description);
    });

  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.memeNetwork)

    return (
      <div className="Feed">
        {/* <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "1000px" }}
        > */}
        <div>
          {/*-----------UPLOAD MEME MOAL----------------------------  */}
          <Button
            onClick={this.handleOpen}
            variant="contained"
            style={{ marginTop: '8px' }}
            color="default" size="small"
            startIcon={<CloudUploadIcon />}>
            Create Meme
            </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.modal}
          >
            <Card className={classes.paper}>
              <div>
                <h2 id="simple-modal-title" style={{ position: 'fixed' }}>Meme Time</h2>
                {/* <CardMedia
                    component="img"
                    className={classes.media}
                    image={require('../../img/really_pepe.png')}
                    title="Welcome Pepe"
                    style={{ float: 'left', maxWidth: '30%', height: 'auto' }}
                  /> */}
              </div>

              <div>
                <form onSubmit={this.handleSubmit} style={{ paddingTop: '50px' }}>

                  <TextField
                    id="memePath"
                    type="file"
                    variant="outlined"
                    style={{ width: '100%', paddingBottom: '10px' }}
                    onChange={this.captureFile}
                    required
                  />

                  <TextField
                    // id="memeTitle"
                    label="memeTitle"
                    variant="outlined"
                    style={{ width: '100%', paddingBottom: '10px' }}
                    // inputRef={input => {
                    //   this.memeTitle = input;
                    // }}
                    value={this.state.memeTitle}
                    onChange={e => { this.setState({ memeTitle: e.target.value }) }}
                    required
                  />
                  <TextField
                    // id="memeDescription"
                    label="memeDescription"
                    variant="outlined"
                    style={{ width: '100%', paddingBottom: '10px' }}
                    // inputRef={input => {
                    //   this.memeDescription = input;
                    // }}
                    value={this.state.memeDescription}
                    onChange={e => { this.setState({ memeDescription: e.target.value }) }}
                    required

                  />
                  <Button type="submit" className={classes.button} fullWidth>
                    What is life anyway?
                </Button>
                </form>
              </div>
            </Card>

          </Modal>


          {(this.state.memes && this.state.memes.length > 0) ?
            this.state.memes.map((meme, key) => {
              return (
                /*------------- MEME CARDS ---------------------------*/
                <Card key={key} className={classes.root} >

                  {/* <CardActionArea> */}

                  <CardMedia
                    className={classes.media}
                    image={`https://ipfs.io/ipfs/${meme.memePath}`}
                    // image={logo}
                    title="Pepe"

                  />

                  <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {meme.memeTitle}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      {meme.memePath}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'justify' }}>
                      {meme.memeDescription}
                    </Typography>
                    <Divider className={classes.divider} light />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography variant="button" color="primary" component="p" style={{ padding: '4px 5px' }}>
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
            }) :
            <div>
              <CircularProgress />
            </div>
          }

        </div>
        {/* </main> */}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Feed);
