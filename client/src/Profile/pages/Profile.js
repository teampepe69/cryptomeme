import * as React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  CardMedia, List, Card, AppBar, ListItemAvatar, Typography, Button,
  ListItem, Toolbar, Badge, Avatar, ListItemText, CardHeader, TextField
} from '@material-ui/core';
import tempDP from "../../img/sadpepe.png";
import peperoni from "../../img/peperoni.png";
import Container from '@material-ui/core/Container';

const styles = theme => ({
  root: {
    padding: '15px',
  },
  card: {
    width: '90%',
    paddingTop: '20px',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  displayButton: {
    fontSize: 9,
  },
});
const ProfilePage = (props) => {
  const {
    classes,
  } = props;
  const [name, setName] = React.useState('teampepe69');
  const [email, setEmail] = React.useState('t34mp3p3@urlan.com');
  const [usr, setUsr] = React.useState('teampepe69');
  const [wallet, setWallet] = React.useState('g4nch4ch3s3d4p');
  const [about, setAbout] = React.useState('IsThisR3alLyf3');
  const [location, setLocation] = React.useState('Corona Land');
  const [website, setWebsite] = React.useState('www.corona-cancelled-my-graduation-plans.com');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, name, usr, wallet, about, location, website);
    // code to submit form to backend here...
  }
  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h4" style={{paddingBottom:'10px'}}>
          Profile
        </Typography>
        <Card elevation={2} className={classes.card}>
          <div style={{ width: '40%', float: 'left', paddingLeft: '5%' }}>
            <Avatar src={tempDP} className={classes.avatar} />
            <Button color="primary" className={classes.displayButton}>
              Change Display Picture
            </Button>
            <br />
            <Typography variant="h6">
              Current Tokens
            </Typography>
            <div style={{ width: '20%', float: 'left' }}>
              <Avatar src={peperoni} />
            </div>
            <div style={{ paddingTop: '7px' }}>
              50 Peperonis
            </div>
          </div>
          <div style={{ width: '60%', float: 'right', paddingRight: '5%', paddingBottom: '20px' }}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h6">
                Username
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={usr}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setUsr(e.target.value)}
                required
              />
              <Typography variant="h6">
                About
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={about}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setAbout(e.target.value)}
                required
              />
              <Typography variant="h6">
                Email
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={email}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setEmail(e.target.value)}
                required
              />
              <Typography variant="h6">
                Display Name
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={name}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setName(e.target.value)}
                required
              />
              <Typography variant="h6">
                Wallet Address
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={wallet}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setWallet(e.target.value)}
                required
              />
              <Typography variant="h6">
                Location
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={location}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setLocation(e.target.value)}
                required
              />
              <Typography variant="h6">
                Website
              </Typography>
              <TextField
                variant="outlined"
                defaultValue={website}
                style={{ width: '100%', paddingBottom: '5px' }}
                onInput={e => setWebsite(e.target.value)}
                required
              />
              <Button color='primary' fullWidth>
                Change Password
              </Button>
              <Button type="submit" color='primary' variant='contained' fullWidth>
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