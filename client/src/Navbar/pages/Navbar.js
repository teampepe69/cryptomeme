import * as React from 'react';
import Banner from '../components/Banner.js'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));



function Navbar(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
          <Typography variant="h6" className={classes.title}>
            Cryptomeme
          </Typography>
 
      </AppBar>
    </div>
  );
}

export default Navbar;