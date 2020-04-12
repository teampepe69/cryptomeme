import * as React from "react";
import { useGlobal } from "reactn";
import {
  Button,
  Modal,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
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
    padding: theme.spacing(4, 8, 4),
    minWidth: "70%",
    minHeight: "50%",
  },
  button: {
    height: "50px",
    backgroundColor: "#6aa84fff",
    color: "whitesmoke",
    "&:hover": {
      backgroundColor: "#6aa84fff",
    },
  },
  media: {
    maxHeight: "160px",
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});

const EditUser = (props) => {
  const { classes, modalState, handleClose, userInfo, rows } = props;
  const [userNetwork] = useGlobal("userNetwork");
  const [memeketPlaceNetwork] = useGlobal("memeketPlaceNetwork");
  const [web3] = useGlobal("web3");
  const [loading, setLoading] = React.useState(false);
  const [loadingAdmin, setLoadingAdmin] = React.useState(false);

  async function checkMetaMaskAccount() {
    let accounts = await web3.eth.getAccounts();
    let currentAccount = sessionStorage.getItem("account");
    if (accounts[0] != currentAccount) {
      Swal.fire({
        title:
          "Something went terribly wrong. Did you switch your MetaMask account?",
        imageUrl: require("../../img/policeApu.png"),
        confirmButtonText: "Sadkek",
      });
    }
  }

  // ----------------------- Handle interaction ----------------------

  async function handleActivate(user) {
    setLoading(true);
    // Set sender
    let currentAdmin = sessionStorage.getItem("account");
    // Find user address
    let userAddress = await userNetwork.methods
      .getUserAddress(user.uid)
      .call({ from: currentAdmin });
    try {
      // Activate user

      await memeketPlaceNetwork.methods
        .activateUser(userAddress)
        .send({ from: currentAdmin })
        .once("receipt", (receipt) => {
          setLoading(false);
        });

      // Close Modal
      handleClose();
    } catch (error) {
      // if error check metamask account
      handleClose();
      checkMetaMaskAccount();
    }
    setLoading(false);
  }

  async function handlePromote(user) {
    setLoadingAdmin(true);
    // Set sender
    let currentAdmin = sessionStorage.getItem("account");
    // Find user address
    let userAddress = await userNetwork.methods
      .getUserAddress(user.uid)
      .call({ from: currentAdmin });

    // Activate user
    try {
      await userNetwork.methods
        .setUserAsAdmin(userAddress)
        .send({ from: currentAdmin })
        .once("receipt", (receipt) => {
          setLoadingAdmin(false);
        });

      // Close Modal
      handleClose();
    } catch (error) {
      // if error check metamask account
      handleClose();
      checkMetaMaskAccount();
    }
    setLoadingAdmin(false);
  }

  async function handleDeactivate(user) {
    setLoading(true);
    // Set sender
    let currentAdmin = sessionStorage.getItem("account");
    // Find user address
    let userAddress = await userNetwork.methods
      .getUserAddress(user.uid)
      .call({ from: currentAdmin });

    try {
      // Activate user
      await userNetwork.methods
        .setUserAsDeactivated(userAddress)
        .send({ from: currentAdmin })
        .once("receipt", (receipt) => {
          setLoading(false);
        });

      // Close Modal
      handleClose();
    } catch (error) {
      // if error check MetaMask account
      handleClose();
      checkMetaMaskAccount();
    }
    setLoading(false);
  }

  // ----------------------- Printing ----------------------

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalState}
        onClose={handleClose}
        className={classes.modal}
      >
        <Card className={classes.paper}>
          <div style={{ position: "static", minHeight: "65px" }}>
            <div style={{ width: "75%", float: "left" }}>
              <Typography variant="h4" gutterBottom>
                {userInfo.displayName}
              </Typography>
            </div>
            <div style={{ width: "25%", float: "right" }}>
              {(userInfo.state === "Active" || userInfo.state == 0) && (
                <Button
                  disabled
                  fullWidth
                  style={{ backgroundColor: "#57bb8aff", color: "white" }}
                >
                  {userInfo.state}
                </Button>
              )}
              {(userInfo.state === "Pending" || userInfo.state == 1) && (
                <Button
                  disabled
                  fullWidth
                  style={{ backgroundColor: "#cca677ff", color: "white" }}
                >
                  {userInfo.state}
                </Button>
              )}
              {(userInfo.state === "Deactivated" || userInfo.state == 3) && (
                <Button
                  disabled
                  fullWidth
                  style={{ backgroundColor: "#cca677ff", color: "white" }}
                >
                  {userInfo.state}
                </Button>
              )}
              {(userInfo.state === "Admin" || userInfo.state == 2) && (
                <Button
                  disabled
                  fullWidth
                  style={{ backgroundColor: "#666666ff", color: "white" }}
                >
                  {userInfo.state}
                </Button>
              )}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Typography variant="p" gutterBottom>
              UID: {userInfo.uid}
            </Typography>
            <br />
            <Typography variant="p" gutterBottom>
              User Wallet: {userInfo.userWallet}
            </Typography>
          </div>
          {userInfo.state === "Active" && (
            <div
              style={{
                position: "relative",
                height: "220px",
                paddingTop: "10px",
              }}
            >
              <div style={{ width: "45%", float: "left" }}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={require("../../img/makeAdmin.png")}
                />
                <Button
                  fullWidth
                  style={{ backgroundColor: "#5d4037ff", color: "white" }}
                  onClick={() => handlePromote(userInfo)}
                >
                  {loadingAdmin && (
                    <CircularProgress color="inherit" size={14} />
                  )}
                  {!loadingAdmin && (
                    <Typography variant="h7">Make Admin</Typography>
                  )}
                </Button>
              </div>
              <div
                style={{ width: "45%", float: "right", paddingLeft: "10px" }}
              >
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={require("../../img/deactivatepepe.png")}
                />
                <Button
                  fullWidth
                  style={{ backgroundColor: "#cc0000ff", color: "white" }}
                  onClick={() => handleDeactivate(userInfo)}
                >
                  <React.Fragment>
                    {loading && <CircularProgress color="inherit" size={14} />}
                    {!loading && (
                      <Typography variant="h7">Bad Bad User</Typography>
                    )}
                  </React.Fragment>
                </Button>
              </div>
            </div>
          )}
          {(userInfo.state === "Deactivated" ||
            userInfo.state === "Pending") && (
            <div
              style={{
                position: "relative",
                height: "220px",
                paddingTop: "10px",
              }}
            >
              <CardMedia
                component="img"
                className={classes.media}
                image={require("../../img/jesuspepe.png")}
                style={{ paddingLeft: "25%" }}
              />
              <Button
                fullWidth
                style={{ backgroundColor: "#ffd966ff" }}
                onClick={() => handleActivate(userInfo)}
              >
                <React.Fragment>
                  {loading && <CircularProgress color="inherit" size={14} />}
                  {!loading && (
                    <Typography variant="h7">Wake Me Up Inside</Typography>
                  )}
                </React.Fragment>
              </Button>
            </div>
          )}
          {userInfo.state === "Admin" && (
            <div
              style={{
                position: "relative",
                height: "220px",
                paddingTop: "10px",
              }}
            >
              <CardMedia
                component="img"
                className={classes.media}
                image={require("../../img/adminpepe.png")}
                style={{ paddingLeft: "35%" }}
              />
              <Button
                fullWidth
                disabled
                style={{ backgroundColor: "#9acdbaff", color: "black" }}
              >
                <React.Fragment>
                  {loading && <CircularProgress color="inherit" size={14} />}
                  {!loading && <Typography variant="h7">u r kewt</Typography>}
                </React.Fragment>
              </Button>
            </div>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(EditUser);
