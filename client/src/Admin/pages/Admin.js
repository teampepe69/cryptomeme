import * as React from "react";
import { useGlobal, useEffect } from "reactn";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Users from "../components/Users";
import { withStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  appBar: {
    backgroundColor: "transparent",
  },
});
function createData(uid, username, userWallet, state) {
  return { uid, username, userWallet, state };
}

const rows = [
  //createData(1, 'pepetroll69', 'pepetroll@hotmail.com', 'Admin'),
  //createData(2, 'lolyugh3y', 'lolyugh3y@hotmail.com', 'Active'),
  //createData(3, 'clownm4ster', 'clownm4ster@hotmail.com', 'Deactivated'),
];

const disobidentrows = [
  //createData(4, 'quentin', 'khonyongbao@hotmail.com', 'Active'),
  //createData(5, 'yongbao', 'quentin@hotmail.com', 'Active'),
  //createData(6, 'khoo', 'kh00m4ster@hotmail.com', 'Active'),
];

const AdminPage = (props) => {
  const { classes } = props;

  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [userNetwork] = useGlobal("userNetwork");
  const [web3] = useGlobal("web3");
  const [disobidentrows, setDisobedientRows] = React.useState([]);
  const [boolObedient, setBoolObedient] = React.useState(true);
  const [boolDisobedient, setBoolDisobedient] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchData();
    console.log(props);
  };

  // Function for populate data : it's called to modify rows / disobidentrows states
  async function fetchData() {
    // fetch the data from contracts to have current users status
    const resObedients = [];
    const resDisobedients = [];
    async function fetchDataInside(resObedients, resDisobedients) {
      // Use try / catch to prevent error when network is not loaded (when you go directly to admin page in dev mode) -> Thus global constatns are not set

      try {
        // Check networks are up to date
        console.log("this is userNetwork: ", value);
        console.log("this is web3: ", web3);

        // Get number of accounts to iter on it (could be improve but impossible to return array from solidity)
        const result = await web3.eth.getAccounts();
        const numOfElements = await userNetwork.methods
          .getNumberUsers()
          .call({ from: result[0] });

        // Set Rows empty
        //setRows([]);
        //setDisobedientRows([]);

        // Maybe there is a proper way however i do not find how to return dynamic array in solidity
        for (let i = 0; i < numOfElements; i++) {
          // Current user
          const elem = await userNetwork.methods
            .getUser(i)
            .call({ from: result[0] });
          // If user is disobedient : bad guy
          if (elem.state == 2) {
            console.log("user is not Obedient", elem);
            resDisobedients.push(
              createData(
                elem.userId,
                elem.displayName,
                elem.userWallet,
                mapStatus(elem.state)
              )
            );
          }
          // If user is clean : good guy
          else {
            console.log("user is Obedient", elem);
            resObedients.push(
              createData(
                elem.userId,
                elem.displayName,
                elem.userWallet,
                mapStatus(elem.state)
              )
            );
          }
        }
      } catch (e) {
        console.log("Error in the process");
      }
    }

    // Do something with the results : await for fetch and update state
    await fetchDataInside(resObedients, resDisobedients);
    setRows(resObedients);
    setDisobedientRows(resDisobedients);
  }

  function mapStatus(statusInt) {
    if (statusInt == 0) {
      return "Pending";
    } else if (statusInt == 1) {
      return "Active";
    } else if (statusInt == 2) {
      return "Deactivated";
    } else if (statusInt == 3) {
      return "Admin";
    }
  }

  // Load data from web3 to populate [disobidentrows, setDisobedientRows]
  useEffect(() => {
    // Hooks when smthg is update
    // Global laucnh
    fetchData();
  }, []);

  return (
    <div style={{ paddingRight: "20px" }}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          TabIndicatorProps={{ style: { background: "black" } }}
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Disobedient Users" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Users value={value} index={0} peopleParent={rows} />
      <Users value={value} index={1} peopleParent={disobidentrows} />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AdminPage);
