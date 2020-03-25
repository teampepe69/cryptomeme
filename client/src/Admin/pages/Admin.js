import * as React from 'react';
import {
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import Users from '../components/Users';
import { withStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = theme => ({
  appBar: {
    backgroundColor: "transparent"
  }
});
function createData(uid, username, email, state) {
  return { uid, username, email, state };
}

const rows = [
  createData(1, 'pepetroll69', 'pepetroll@hotmail.com', 'Admin'),
  createData(2, 'lolyugh3y', 'lolyugh3y@hotmail.com', 'Active'),
  createData(3, 'clownm4ster', 'clownm4ster@hotmail.com', 'Deactivated'),
];

const disobidentrows = [
  createData(4, 'quentin', 'khonyongbao@hotmail.com', 'Active'),
  createData(5, 'yongbao', 'quentin@hotmail.com', 'Active'),
  createData(6, 'khoo', 'kh00m4ster@hotmail.com', 'Active'),
];

const AdminPage = (props) => {
    const {classes} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div style={{paddingRight:'20px'}}>
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Tabs value={value} onChange={handleChange} textColor='secondary' TabIndicatorProps={{style: {background:'black'}}}>
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Disobedient Users" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Users value={value} index={0} people={rows}/>
        <Users value={value} index={1} people={disobidentrows}/>
      </div>
    );
  };
  
  
  export default withStyles(styles, { withTheme: true })(AdminPage);