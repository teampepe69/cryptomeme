import React, { useGlobal, useEffect } from "reactn";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import Logout from "../components/Logout.js";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  List,
  Card,
  AppBar,
  ListItemAvatar,
  ListItem,
  Toolbar,
  Badge,
  Avatar,
  ListItemText
} from "@material-ui/core";
import tempDP from "../../img/sadpepe.png";

const styles = theme => ({
  appBar: {
    position: "fixed",
    height: 70,
    backgroundColor: "#ffffffff"
  },
  grow: {
    flexGrow: 1
  },
  card: {
    backgroundColor: "transparent",
    width: 100,
    paddingTop: 4
  },
  title: {
    color: "#434343",
    paddingTop: 10
  },
  profileName: {
    color: "#434343"
  }
});

const Navbar = (props) => {
    const { classes } = props;
    const [displayPictureHash, setDisplayPictureHash] = React.useState(
      "displayPictureHash"
    );
    const [userNetwork] = useGlobal("userNetwork");
    console.log("userNetwork", userNetwork);
    var loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
    console.log("loggedIn", loggedIn);
    
    useEffect(() => {
      if (loggedIn){
        getAvatar();
      }
    }, []);
    async function getAvatar() {
      var account = sessionStorage.getItem("account");
      var userId = await userNetwork.methods
        .userIds(account)
        .call({ from: account });
      var user = await userNetwork.methods.users(userId).call({ from: account });
      setDisplayPictureHash(user[4]);
    }

    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Card
              elevation={0}
              className={classes.card}
              component={Link}
              to="/"
            >
              <CardMedia
                component="img"
                className={classes.media}
                src={`https://ipfs.io/ipfs/${displayPictureHash}`}
                title="Logo"
                style={{ maxWidth: "70%", height: "auto" }}
              />
            </Card>
            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to="/"
            >
              Cryptomeme
            </Typography>
            <div className={classes.grow} />
            {!loggedIn && (
              <Login
                web3={props.web3}
                deployedMemeketPlaceNetworkData={
                  props.deployedMemeketPlaceNetworkData
                }
                memeketPlaceNetwork={props.memeketPlaceNetwork}
                userNetwork={props.userNetwork}
              />
            )}
            {!loggedIn && (
              <Register
                web3={props.web3}
                deployedMemeketPlaceNetworkData={
                  props.deployedMemeketPlaceNetworkData
                }
                memeketPlaceNetwork={props.memeketPlaceNetwork}
                userNetwork={props.userNetwork}
              />
            )}
            {loggedIn && (
              <List className={classes.list} component={Link} to="/profile">
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar src={tempDP} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="teampepe69"
                    className={classes.profileName}
                  />
                </ListItem>
              </List>
            )}
            {loggedIn && <Logout />}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
export default withStyles(styles, { withTheme: true })(Navbar);
