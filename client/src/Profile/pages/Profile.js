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
  console.log(userNetwork);
  const [web3] = useGlobal("web3");
  const [userData, setUserData] = React.useState();
  const [userId, setUserId] = React.useState(0);
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
    setDisplayName(user[4]);
    setDisplayPictureHash(user[5]);
    setWebsite(user[6]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // code to submit form to backend here...
  }

  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h4" style={{ paddingBottom: "10px" }}>
          Profile
        </Typography>
        <Card elevation={2} className={classes.card}>
          <div style={{ width: "40%", float: "left", paddingLeft: "5%" }}>
            <Avatar src={tempDP} className={classes.avatar} />
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
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              onLoad={populateUserData}
            >
              <Typography variant="h6">User ID</Typography>
              <TextField
                variant="outlined"
                disabled="true"
                defaultValue={userId}
                style={{ width: "100%", paddingBottom: "5px" }}
                required
              />
              <Typography variant="h6">User Wallet</Typography>
              <TextField
                variant="outlined"
                disabled="true"
                defaultValue={userWallet}
                style={{ width: "100%", paddingBottom: "5px" }}
                required
              />
              <Typography variant="h6">Username</Typography>
              {console.log(username)}
              <TextField
                variant="outlined"
                defaultValue={username}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setUsername(e.target.value)}
                required
              />
              <Typography variant="h6">About</Typography>
              <TextField
                variant="outlined"
                defaultValue={about}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setAbout(e.target.value)}
                required
              />
              <Typography variant="h6">Display Picture Hash</Typography>
              <TextField
                variant="outlined"
                defaultValue={displayPictureHash}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setDisplayPictureHash(e.target.value)}
                required
              />
              <Typography variant="h6">Display Name</Typography>
              <TextField
                variant="outlined"
                defaultValue={displayName}
                style={{ width: "100%", paddingBottom: "5px" }}
                onInput={e => setDisplayPictureHash(e.target.value)}
                required
              />
              <Typography variant="h6">Website</Typography>
              <TextField
                variant="outlined"
                defaultValue={website}
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
