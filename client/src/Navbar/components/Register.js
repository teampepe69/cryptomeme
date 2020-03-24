import * as React from "react";
import User from "../../contracts/User.json";
import {
  Button,
  Modal,
  Card,
  Input,
  TextField,
  CardMedia,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Swal from 'sweetalert2'

const EthereumTx = require("ethereumjs-tx").Transaction;
const privateKey = new Buffer(
  "4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
  "hex"
);
const ownerAddress = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";

const styles = theme => ({
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
    backgroundColor: "#c80305ff",
    color: "whitesmoke",
    "&:hover": {
      backgroundColor: "#c80305ff"
    }
  }
});

const Register = props => {
  const { classes } = props;
  console.log(props.memeketPlaceNetwork);
  console.log(props.account);
  console.log(props.deployedMemeketPlaceNetworkData);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [usr, setUsr] = React.useState("");
  const [password, setPwd] = React.useState("");
  const [wallet, setWallet] = React.useState("");
  const [displayPic, setDisplayPic] = React.useState(
    "QmP1KdPrFV9wKbDy5WvCDKd3YcyTBbFvqfvBCzjGrDiVLZ"
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password, name, usr, wallet, displayPic);
    // once below code is okay, just copy these two line 
    handleClose();
    Swal.fire({
      title: 'Registration successful!',
      icon: 'success',
      confirmButtonText: 'Cool beans'
    })
    
    /*
    let testMethod = props.memeketPlaceNetwork.methods
      .createUser(name, email, usr, password, wallet, displayPic)
      .encodeABI();
    console.log(testMethod);

    const noncePromise = props.web3.eth.getTransactionCount(ownerAddress);
    const gasPricePromise = props.web3.eth.getGasPrice();
    const [nonce, gasPrice] = await Promise.all([
      noncePromise,
      gasPricePromise
    ]);
    console.log(nonce);
    console.log(gasPrice);

    var rawTransaction = {
      from: ownerAddress,
      gasPrice: props.web3.utils.toHex(gasPrice),
      gasLimit: props.web3.utils.toHex(21000),
      nonce: props.web3.utils.toHex(nonce),
      to: props.deployedMemeketPlaceNetworkData.address,
      data: testMethod
    };

    var tx = new EthereumTx(rawTransaction);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    props.web3.eth.sendTransaction(
      "0x" + serializedTx.toString("hex"),
      function(error, hash) {
        if (!error) console.log(hash);
      }
      
    );
    */
    // }
    // const tx = new EthereumTx(testMethod);
    // console.log(tx);
    // tx.sign(privateKey);
    // const serializedTx = tx.serialize();

    // props.web3.eth.sendSignedTransaction(
    //   "0x" + serializedTx.toString("hex"),
    //   function(err, hash) {
    //     if (!err) {
    //       //this console.logs back information about the transaction
    //       // including transaction Hash, block number, block Hash,gar used etc..
    //       console.log("Txn Sent and hash is " + JSON.stringify(hash));
    //     } else {
    //       console.error(err);
    //     }
    //   }
    // );
    props.memeketPlaceNetwork.methods
      .createUser(name, email, usr, password, wallet, displayPic)
      .send({
        from: props.account
      })
      .then(result => {
        handleClose();
        Swal.fire({
          title: 'Registration successful!',
          icon: 'success',
          confirmButtonText: 'Cool beans'
        })
      })
      .error(err =>{
        Swal.fire({
          confirmButtonText: 'LET ME IN',
          text: 'somer error log',
          imageUrl: require("../../img/Let_Me_In.jpg")
        })
      })
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
            <form className={classes.root} onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={e => setName(e.target.value)}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={e => setEmail(e.target.value)}
                required
                type="email"
              />
              <TextField
                label="Username"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={e => setUsr(e.target.value)}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={e => setPwd(e.target.value)}
                required
                type="password"
              />
              <TextField
                label="Wallet"
                variant="outlined"
                style={{ width: "100%", paddingBottom: "10px" }}
                onInput={e => setWallet(e.target.value)}
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
