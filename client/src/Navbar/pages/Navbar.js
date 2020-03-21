import * as React from 'react';
import Login from '../components/Login.js'
import Register from '../components/Register.js'
import Logout from '../components/Logout.js'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  CardMedia, CardHeader, Card, AppBar,
  Divider, Popover, MenuItem, IconButton, Toolbar, Badge,
} from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'absolute',
    height: 70,
    backgroundColor: '#ffffffff',
  },
  grow: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: 'transparent',
    width: 100,
    paddingTop: 4,
  },
  title: {
    color: '#434343',
    paddingTop: 10,
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const { classes } = this.props;
    const loggedIn = true
    // props should include whether logged in or not and log in details
    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Card elevation={0} className={classes.card} component={Link} to="/">
              <CardMedia
                component="img"
                className={classes.media}
                image={require('../../img/HappyPepe.png')}
                title="Logo"
                style={{maxWidth:'70%',height:'auto'}}
              />
            </Card>
            <Typography variant="h6" className={classes.title} component={Link} to="/">
                Cryptomeme
              </Typography>
            <div className={classes.grow} />
            {!loggedIn && (
              <Login />
            )}
            {!loggedIn && (
              <Register />
            )}
            {loggedIn && (
              <Logout />
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navbar);