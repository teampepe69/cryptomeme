import React, { useGlobal, useEffect } from "reactn";
import User from "../../contracts/User.json";
import {
  Button,
  Modal,
  Card,
  Input,
  TextField,
  CardMedia,
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    height: "50px",
    backgroundColor: "#c80305ff",
    color: "whitesmoke",
    "&:hover": {
      backgroundColor: "#c80305ff",
    },
  },
});

const Register = (props) => {
  const { classes } = props;
  const [web3] = useGlobal("web3");
  const [userNetwork] = useGlobal("userNetwork");
  const [memeketPlaceNetwork] = useGlobal("memeketPlaceNetwork");
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [displayPictureHash, setDisplayPictureHash] = React.useState(
    "QmP1KdPrFV9wKbDy5WvCDKd3YcyTBbFvqfvBCzjGrDiVLZ"
  );
  const [displayName, setDisplayName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [eWallet, setEwallet] = React.useState("");

  const handleOpen = () => {
    web3.eth.getAccounts().then((result) => {
      setEwallet(result[0]);
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleRegister(event) {
    event.preventDefault();
    // once below code is okay, just copy these two line
    handleClose();
    var userExists = userNetwork.methods.checkUserExists(eWallet);
    if (userExists) {
      Swal.fire({
        confirmButtonText: "I sOrRy I dIdN't KnOw",
        text: "Your account already exists, please be patient",
        imageUrl: require("../../img/pleasebePatientPepe.png"),
      });
    } else {
      memeketPlaceNetwork.methods
        .createUser(
          eWallet,
          username,
          about,
          displayPictureHash,
          displayName,
          website
        )
        .send({
          from: eWallet,
        })
        .then((result) => {
          handleClose();
          Swal.fire({
            title:
              "Registration successful! Please wait for your account to be approved.",
            icon: "success",
            confirmButtonText: "Cool beans",
          });
        })
        .catch((err) => {
          Swal.fire({
            confirmButtonText: "LET ME IN",
            text: "Weird, something went wrong",
            imageUrl: require("../../img/Let_Me_In.jpg"),
          });
        });
    }
  }
  return (
    <div>
      <Button onClick={handleOpen}>Sign Up</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <Card className={classes.paper}>
          <h2 id="simple-modal-title">Register</h2>
          <div style={{ width: "60%", float: "left" }}>
            <form className={classes.root} onSubmit={handleRegister}>
              <TextField
                label="Username"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="About"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setAbout(e.target.value)}
              />
              <TextField
                label="DisplayName"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setDisplayName(e.target.value)}
                required
              />
              <TextField
                label="Website"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setWebsite(e.target.value)}
              />
              <TextField
                label="Wallet"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setEwallet(e.target.value)}
                defaultValue={eWallet}
                required
              />
              <Button type="submit" className={classes.button} fullWidth>
                JOIN THE FIGHT
              </Button>
            </form>
          </div>
          <div style={{ width: "40%", float: "right" }}>
            <CardMedia
              component="img"
              className={classes.media}
              image={require("../../img/joinpepe.png")}
              title="Join Pepe"
            />
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Register);
