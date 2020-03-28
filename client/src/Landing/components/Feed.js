import React, { Component, useGlobal } from "reactn";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader
} from "@material-ui/core";
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  Modal,
  Divider,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import logo from "../../img/goodjob_pepe.png";
import hurt from "../../img/sadpepe.png";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ipfs from "../../ipfs";
import FlagIcon from "@material-ui/icons/Flag";
import Swal from "sweetalert2";

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: '80%',
    marginTop: "10px",
    // marginBottom:'1%',
    display: "flex",
    padding: theme.spacing(2),
    borderRadius: 16
  },
  empty_root: {
    width: "100%",
    marginTop: "3%",
    display: "flex",
    padding: theme.spacing(2),
    borderRadius: 16
  },
  media: {
    // width: 150,
    // height: 200,
    minWidth: "200px",
    maxWidth: "200px",
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
    flexShrink: "0",
    borderRadius: "12px"
    // backgroundColor: '#eeeeee'
  },
  empty_media: {
    minWidth: "30%",
    maxWidth: "30%",
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
    flexShrink: "0",
    borderRadius: "12px",
    height: "250px"
  },

  content: {
    padding: theme.spacing(0, 0, 0, 6),
    width: "100%"
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 4, 3)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    height: "50px",
    backgroundColor: "#6aa84fff",
    color: "whitesmoke",
    "&:hover": {
      backgroundColor: "#6aa84fff"
    }
  },
  flagButton: {
    height: "50px",
    backgroundColor: "#DC143C",
    color: "whitesmoke",
    "&:hover": {
      backgroundColor: "#DC143C"
    }
  },
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
});

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buffer: null,
      memes: this.props.meme,
      loading: false,
      open: false,
      memeTitle: "",
      memeDescription: "",
      hasFlagged: false,
      openFlag: false
    };

    console.log(this.state.memes);

    this.createMeme = this.createMeme.bind(this);
    this.likeMeme = this.likeMeme.bind(this);
    this.updateMeme = this.updateMeme.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMeme = this.getMeme.bind(this);
    this.dislikeMeme = this.dislikeMeme.bind(this);
    this.flagMeme = this.flagMeme.bind(this);
    // this.checkLikeState = this.checkLikeState.bind(this);
  }

  //---When passing updated props over, calls getMeme----
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      // console.log("Different")
      // console.log(prevProps)
      // console.log(this.props)
      if (this.props.memeNetwork !== null) {
        this.getMeme();
      }
    }
  }

  //------------FETCH ALL MEMES-------------------------
  async getMeme() {
    console.log("getmeme is called");
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    let numberOfMemes = 0;
    let arr = [];
    // console.log(arr)
    const result = await memeNetwork.methods.numberOfMemes().call({
      from: acc
    });
    // console.log(result)
    for (var i = 0; i < result; i++) {
      // console.log("index: ", i)
      const meme = await memeNetwork.methods.memes(i).call({ from: acc });

      // console.log(result)
      arr = arr.concat(meme);
      this.setState({
        memes: [...arr]
      });
      // console.log(arr)
      // console.log(this.state.memes)
    }
  }

  //----------------CREATE MEME-------------
  createMeme(memePath, memeTitle, memeDescription) {
    console.log(this.props);
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    console.log(acc);
    let arr = this.state.memes;
    this.props.memeNetwork.methods
      .createMeme(acc, memePath, memeTitle, memeDescription)
      .send({
        from: acc
      })
      .then(() => {
        this.updateMeme();
        this.handleClose("create");
      });
  }

  //----------Update the meme feed when meme is created-------
  //This is called by createMeme() function
  async updateMeme() {
    const memeNetwork = this.props.memeNetwork;
    const acc = this.props.account;
    let arr = this.state.memes;
    console.log(arr);
    const numOfMemes = await memeNetwork.methods
      .numberOfMemes()
      .call({ from: acc });
    const newMeme = await memeNetwork.methods
      .memes(numOfMemes - 1)
      .call({ from: acc });
    arr = arr.concat(newMeme);
    this.setState({ memes: arr });
  }

  //------------LIKE MEMES--------------
  async likeMeme(memeId) {
    let arr = this.state.memes;
    let acc = this.props.account;
    console.log(memeId);
    await this.props.memeketPlaceNetwork.methods
      .likeMeme(memeId)
      .send({ from: acc });
    const updateMeme = await this.props.memeNetwork.methods
      .memes(memeId)
      .call();
    arr[memeId] = updateMeme;
    this.setState({ memes: arr });
  }

  //------------DISLIKE MEMES--------------
  async dislikeMeme(memeId) {
    let arr = this.state.memes;
    let acc = this.props.account;
    console.log(memeId);
    await this.props.memeketPlaceNetwork.methods
      .dislikeMeme(memeId)
      .send({ from: acc });
    const updateMeme = await this.props.memeNetwork.methods
      .memes(memeId)
      .call();
    arr[memeId] = updateMeme;
    this.setState({ memes: arr });

    // let index= await this.props.memeketPlaceNetwork.methods.getLikes(memeId, this.props.account).call()
    // console.log(index)
  }

  //------------FLAG MEMES--------------
  async flagMeme(memeId) {
    let arr = this.state.memes;
    let acc = this.props.account;
    console.log(memeId);
    await this.props.memeketPlaceNetwork.methods
      .flagMeme(memeId)
      .send({ from: acc });
    this.handleClose("flag");
    Swal.fire({
      title: "Flag successful!",
      icon: "success",
      confirmButtonText: "Cool beans"
    });
  }

  //------------UPLOAD FILE--------------
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

  //------------SUBMIT FORM-------------------
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.memeTitle);
    console.log(this.state.memeDescription);
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      const path = result[0].hash;
      const title = this.state.memeTitle;
      const description = this.state.memeDescription;
      this.createMeme(path, title, description);
    });
  };

  handleOpen = type => {
    console.log(type);
    if (type == "create") {
      this.setState({ open: true });
    } else {
      this.setState({ openFlag: true });
    }
  };

  handleClose = type => {
    console.log(type);
    if (type === "create") {
      this.setState({ open: false });
    } else {
      this.setState({ openFlag: false });
    }
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state.memes)

    return (
      <div style={{ padding: "15px 15px 20px 15px" }}>
        <div>
          <Grid container direction="row">
            <Grid container item xs={6}>
              <Typography variant="h4">Feed</Typography>
            </Grid>
            <Grid container item xs={6} justify="flex-end">
              {/*-----------UPLOAD MEME MOAL----------------------------  */}
              <Button
                onClick={() => this.handleOpen("create")}
                variant="contained"
                style={{ marginTop: "8px" }}
                color="default"
                size="small"
                startIcon={<CloudUploadIcon />}
              >
                Create Meme
              </Button>

              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={() => this.handleClose("create")}
                className={classes.modal}
              >
                <Card className={classes.paper}>
                  <div>
                    <h2 id="simple-modal-title" style={{ position: "fixed" }}>
                      Meme Time
                    </h2>
                  </div>

                  <div>
                    <form
                      onSubmit={this.handleSubmit}
                      style={{ paddingTop: "50px" }}
                    >
                      <TextField
                        id="memePath"
                        type="file"
                        variant="outlined"
                        style={{ width: "100%", paddingBottom: "10px" }}
                        onChange={this.captureFile}
                        required
                      />

                      <TextField
                        // id="memeTitle"
                        label="memeTitle"
                        variant="outlined"
                        style={{ width: "100%", paddingBottom: "10px" }}
                        // inputRef={input => {
                        //   this.memeTitle = input;
                        // }}
                        value={this.state.memeTitle}
                        onChange={e => {
                          this.setState({ memeTitle: e.target.value });
                        }}
                        required
                      />
                      <TextField
                        // id="memeDescription"
                        label="memeDescription"
                        variant="outlined"
                        style={{ width: "100%", paddingBottom: "10px" }}
                        // inputRef={input => {
                        //   this.memeDescription = input;
                        // }}
                        value={this.state.memeDescription}
                        onChange={e => {
                          this.setState({ memeDescription: e.target.value });
                        }}
                        required
                      />
                      <Button
                        type="submit"
                        className={classes.button}
                        fullWidth
                      >
                        What is life anyway?
                      </Button>
                    </form>
                  </div>
                </Card>
              </Modal>
            </Grid>
          </Grid>

          {this.state.memes && this.state.memes.length > 0 ? (
            this.state.memes.map((meme, key) => {
              return (
                /*------------- MEME CARDS ---------------------------*/
                <Card key={key} className={classes.root}>
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
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {meme.memePath}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify" }}
                    >
                      {meme.memeDescription}
                    </Typography>
                    <Divider className={classes.divider} light />

                    <Grid container>
                      <Grid container item xs={8}>
                        {/*--------------------------- LIKE AND DISLIKE BUTTON--------------------- */}
                        <Grid container item xs={2}>
                          <IconButton
                            style={{ minWidth: "10px" }}
                            // startIcon={<ThumbUpAltOutlinedIcon />}
                            size="small"
                            color="primary"
                            onClick={e => {
                              this.likeMeme(meme.memeId);
                            }}
                          >
                            <ThumbUpAltOutlinedIcon />
                          </IconButton>
                          <Typography
                            variant="button"
                            color="primary"
                            component="p"
                            style={{ padding: "4px 5px" }}
                          >
                            {meme.memeLikes.toString()}
                          </Typography>
                        </Grid>
                        <Grid container item xs={2}>
                          <IconButton
                            style={{ minWidth: "10px" }}
                            // startIcon={<ThumbDownAltOutlinedIcon />}
                            size="small"
                            color="primary"
                            onClick={e => {
                              this.dislikeMeme(meme.memeId);
                            }}
                          >
                            <ThumbDownAltOutlinedIcon />
                          </IconButton>

                          <Typography
                            variant="button"
                            color="primary"
                            component="p"
                            style={{ padding: "4px 5px" }}
                          >
                            {meme.memeDislikes.toString()}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/*--------------------------- FLAG BUTTON--------------------- */}
                      <Grid container item xs={4} justify="flex-end">
                        <IconButton
                          style={{ minWidth: "12px" }}
                          size="small"
                          onClick={() => this.handleOpen("flag")}
                        >
                          <FlagIcon color="secondary" />
                        </IconButton>
                        <Modal
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                          open={this.state.openFlag}
                          onClose={() => this.handleClose("flag")}
                          className={classes.modal}
                        >
                          <Card className={classes.paper}>
                            <div style={{ padding: "10px 5px 20px 5px" }}>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{ fontWeight: "bold" }}
                              >
                                Hurt? We're here to help.
                              </Typography>
                            </div>

                            <CardContent>
                              <div
                                style={{
                                  width: "60%",
                                  float: "left",
                                  paddingRight: "10px"
                                }}
                              >
                                <div style={{ paddingBottom: "20px" }}>
                                  <Typography paragraph>
                                    We're truly sorry that this meme has hurt
                                    you.
                                  </Typography>
                                  <Typography paragraph>
                                    We are here to protecc our readers
                                  </Typography>
                                  <Typography paragraph>
                                    We shall reflect and do better
                                  </Typography>
                                  <Typography paragraph>
                                    Click button to flag post as{" "}
                                    {
                                      <b style={{ color: "red" }}>
                                        inappropriate
                                      </b>
                                    }
                                  </Typography>
                                </div>
                                <Button
                                  type="submit"
                                  color="secondary"
                                  className={classes.flagButton}
                                  onClick={e => {
                                    this.flagMeme(meme.memeId);
                                  }}
                                  fullWidth
                                >
                                  SAY NO TO TROLLS!
                                </Button>
                              </div>
                              <div style={{ width: "40%", float: "right" }}>
                                <CardMedia
                                  component="img"
                                  image={hurt}
                                  title="Join Pepe"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </Modal>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Feed);
