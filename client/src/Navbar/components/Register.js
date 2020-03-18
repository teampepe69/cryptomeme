import * as React from 'react';
import {
  Button, Modal, Card, TextField, CardMedia
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
    backgroundColor: '#c80305ff',
    color: 'whitesmoke',
    "&:hover": {
      backgroundColor: "#c80305ff"
    }
  }
});

const Register = (props) => {
    const {
      classes,
    } = props;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [usr, setUsr] = React.useState('');
    const [password, setPwd] = React.useState('');
    const [wallet, setWallet] = React.useState('');

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password, name, usr, wallet); 
       // code to submit form to backend here...
    }
    return (
      <div>
        <Button onClick={handleOpen}>
          Sign Up
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
          <Card className={classes.paper}>
            <h2 id="simple-modal-title">Register</h2>
            <div style={{width:'60%', float:'left'}}>
              <form className={classes.root} onSubmit={handleSubmit}>
                <TextField 
                  label="Name" 
                  variant="outlined" 
                  style={{width:'100%', paddingBottom:'10px'}}
                  onInput={ e=>setName(e.target.value)}
                  required
                />
                <TextField
                  label="Email" 
                  variant="outlined" 
                  style={{width:'100%', paddingBottom:'10px'}}
                  onInput={ e=>setEmail(e.target.value)}
                  required
                  type="email"
                />
                <TextField
                  label="Username" 
                  variant="outlined" 
                  style={{width:'100%', paddingBottom:'10px'}}
                  onInput={ e=>setUsr(e.target.value)}
                  required
                />
                <TextField 
                  label="Password"
                  variant="outlined" 
                  style={{width:'100%', paddingBottom:'10px'}}
                  onInput={ e=>setPwd(e.target.value)}
                  required
                  type="password"
                />
                <TextField 
                  label="Wallet"
                  variant="outlined" 
                  style={{width:'100%', paddingBottom:'10px'}}
                  onInput={ e=>setWallet(e.target.value)}
                  required
                />
                <Button type="submit" className={classes.button} fullWidth>
                  JOIN THE FIGHT
                </Button>
              </form>
            </div>
            <div style={{width:'40%', float:'right'}}>
              <CardMedia
                component="img"
                className={classes.media}
                image={require('../../img/joinpepe.png')}
                title="Join Pepe"
              />
            </div>
          </Card>
        </Modal>
      </div>
    );
  };
  
  export default withStyles(styles, { withTheme: true })(Register);