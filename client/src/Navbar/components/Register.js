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
import ipfs from "../../ipfs";

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
  const [about, setAbout] = React.useState("");

  const [displayName, setDisplayName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [eWallet, setEwallet] = React.useState("");
  const [buffer, setBuffer] = React.useState(
    "QmP1KdPrFV9wKbDy5WvCDKd3YcyTBbFvqfvBCzjGrDiVLZ"
  );

  const handleOpen = () => {
    try {
      web3.eth.getAccounts().then((result) => {
        setEwallet(result[0]);
        setOpen(true);
      });
    } catch (error) {
      Swal.fire({
        title: "No MetaMask detected. You will need MetaMask to register",
        icon: "warning",
        confirmButtonText: "What's this MetaMask you speak of?",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          window.open("https://metamask.io/download.html", "_blank");
        }
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    try {
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        ipfs.files.add(Buffer(reader.result), (error, result) => {
          if (error) {
            return;
          }
          const hash = result[0].hash;
          setBuffer(hash);
          return hash;
        });
      };
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    // once below code is okay, just copy these two line
    handleClose();

    var userExists = await userNetwork.methods.checkUserExists(eWallet).call();

    if (userExists) {
      Swal.fire({
        confirmButtonText: "I sOrRy I dIdN't KnOw",
        text: "Your account already exists, please be patient",
        imageUrl: require("../../img/pleasebePatientPepe.png"),
      });
    } else {
      memeketPlaceNetwork.methods
        .createUser(eWallet, about, buffer, displayName, website)
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
                label="Display Name"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setDisplayName(e.target.value)}
                required
              />
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={captureFile}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="raised"
                  component="span"
                  className={classes.button}
                >
                  Upload Display Picture
                </Button>
              </label>

              <TextField
                label="Wallet"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setEwallet(e.target.value)}
                defaultValue={eWallet}
                disabled="true"
                required
              />
              <TextField
                label="Tell us a bit about yourself"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setAbout(e.target.value)}
              />
              <TextField
                label="Give us your website"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={(e) => setWebsite(e.target.value)}
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
