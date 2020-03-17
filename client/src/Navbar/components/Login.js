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
    backgroundColor: '#6aa84fff',
    color: 'whitesmoke',
    "&:hover": {
      backgroundColor: "#6aa84fff"
    }
  }
});

const Login = (props) => {
  const {
    classes,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [usr, setUsr] = React.useState('');
  const [password, setPwd] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(event) {
      event.preventDefault();
      console.log(password, usr); 
     // code to submit form to backend here...
  }
    return (
      <div>
        <Button onClick={handleOpen}>
          Login
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
          <Card className={classes.paper}>
            <div>
              <h2 id="simple-modal-title" style={{position:'absolute', padding:'28px'}}>Login</h2>
              <CardMedia
                component="img"
                className={classes.media}
                image={require('../../img/loginpepe.png')}
                title="Join Pepe"
                style={{ float:'left', maxWidth:'30%',height:'auto'}}
              />
            </div>
            
            <div>
              <form className={classes.root} onSubmit={handleSubmit}>
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
                <Button type="submit" className={classes.button} fullWidth>
                  Be Nice Man
                </Button>
              </form>
            </div>
          </Card>
        </Modal>
      </div>
    );
  };
  
  
  export default withStyles(styles, { withTheme: true })(Login);