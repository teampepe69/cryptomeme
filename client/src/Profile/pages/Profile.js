import React, { useGlobal } from "reactn";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  List,
  Card,
  AppBar,
  ListItemAvatar,
  Typography,
  Button,
  ListItem,
  Toolbar,
  Badge,
  Avatar,
  ListItemText,
  CardHeader,
  TextField
} from "@material-ui/core";
import tempDP from "../../img/sadpepe.png";
import peperoni from "../../img/peperoni.png";
import Container from "@material-ui/core/Container";
import ipfs from "../../ipfs";
import Swal from "sweetalert2";

const styles = theme => ({
  root: {
    padding: "15px"
  },
  card: {
    width: "90%",
    paddingTop: "20px"
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  displayButton: {
    fontSize: 9
  }
});
const ProfilePage = props => {
  const { classes } = props;
  const [userNetwork] = useGlobal("userNetwork");
  const [memeketPlaceNetwork] = useGlobal("memeketPlaceNetwork");
  const [web3] = useGlobal("web3");
  const [userData, setUserData] = React.useState();
  const [userId, setUserId] = React.useState(999);
  const [userWallet, setUserWallet] = React.useState(
    sessionStorage.getItem("account")
  );
  const [username, setUsername] = React.useState("username");
  const [about, setAbout] = React.useState("about");
  const [displayName, setDisplayName] = React.useState("displayName");
  const [displayPictureHash, setDisplayPictureHash] = React.useState(
    "displayPictureHash"
  );
  const [website, setWebsite] = React.useState("website");
  var temporaryHash = "";

  //------------Fetch User Properties-------------------------
  async function populateUserData() {
    var account = sessionStorage.getItem("account");
    console.log(account);
    console.log(userNetwork);
    var userId = await userNetwork.methods
      .userIds(account)
      .call({ from: account });
    console.log(userId);
    var user = await userNetwork.methods.users(userId).call({ from: account });
    setUserData(user);
    setUserId(user[0]);
    setUserWallet(user[1]);
    setUsername(user[2]);
    setAbout(user[3]);
    setDisplayPictureHash(user[4]);
    setDisplayName(user[5]);
    setWebsite(user[6]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(
      userWallet,
      username,
      about,
      displayPictureHash,
      displayName,
      website
    );

    var updateProfile = await memeketPlaceNetwork.methods
      .updateUserProfile(
        userWallet,
        username,
        about,
        displayPictureHash,
        displayName,
        website
      )
      .send({ from: userWallet });
    Swal.fire({
      title: "Update profile successful!",
      icon: "success",
      confirmButtonText: "Cool beans"
    });
    populateUserData();
  }

  function updateDisplayPicture(event) {
    console.log("old", displayPictureHash);
    event.preventDefault();
    var file = event.target.files[0];
    var reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      ipfs.files.add(Buffer(reader.result), (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const hash = result[0].hash;
        console.log(hash);
        setDisplayPictureHash(hash);
        console.log("displayHash", displayPictureHash);
        //To figure out why not updating
      });
    };
  }

  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h4" style={{ paddingBottom: "10px" }}>
          Profile
        </Typography>
        <Card elevation={2} className={classes.card} onLoad={populateUserData}>
          <div style={{ width: "40%", float: "left", paddingLeft: "5%" }}>
            <Avatar
              src={`https://ipfs.io/ipfs/${displayPictureHash}`}
              className={classes.avatar}
            />
            <Button color="primary" className={classes.displayButton}>
              Change Display Picture
            </Button>
            <br />
            <Typography variant="h6">Current Tokens</Typography>
            <div style={{ width: "20%", float: "left" }}>
              <Avatar src={peperoni} />
            </div>
            <div style={{ paddingTop: "7px" }}>50 Peperonis</div>
          </div>
          <div
            style={{
              width: "60%",
              float: "right",
              paddingRight: "5%",
              paddingBottom: "20px"
            }}
          >
            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h6">User ID</Typography>
              <TextField
                variant="outlined"
                disabled="true"
                value={userId}
                style={{ width: "100%", paddingBottom: "5px" }}
                required
              />
              <Typography variant="h6">User Wallet</Typography>
              <TextField
                variant="outlined"
                disabled="true"
                value={userWallet}
                style={{ width: "100%", paddingBottom: "5px" }}
                required
              />
              <Typography variant="h6">Username</Typography>
              {console.log(username)}
              <TextField
                variant="outlined"
                value={username}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setUsername(e.target.value)}
                required
              />
              <Typography variant="h6">About</Typography>
              <TextField
                variant="outlined"
                value={about}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setAbout(e.target.value)}
                required
              />
              <Typography variant="h6">Display Picture</Typography>
              <TextField
                variant="outlined"
                type="file"
                style={{ width: "100%", paddingBottom: "5px" }}
                onChange={updateDisplayPicture}
              />
              <Typography variant="h6">Display Name</Typography>
              <TextField
                variant="outlined"
                value={displayName}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setDisplayName(e.target.value)}
                required
              />
              <Typography variant="h6">Website</Typography>
              <TextField
                variant="outlined"
                value={website}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setWebsite(e.target.value)}
                required
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                update profile
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(ProfilePage);
