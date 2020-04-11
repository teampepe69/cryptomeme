import * as React from "react";
import { useGlobal, useEffect } from "reactn";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Users from "../components/Users";
import MemesFlagged from "../components/MemesFlagged";
import { withStyles } from "@material-ui/core/styles";

// ----------------------- Table init ----------------------

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

// ----------------------- Data structure user / meme ----------------------

function createData(uid, displayName, userWallet, state) {
  return { uid, displayName, userWallet, state };
}

function createDataMeme(
  memeId,
  memeTitle,
  memeOwner,
  memeValue,
  memeFlags,
  memeStatus
) {
  return { memeId, memeTitle, memeOwner, memeValue, memeFlags, memeStatus };
}

const rows = [];
const disobidentrows = [];

const AdminPage = (props) => {
  const { classes } = props;
  const [stopFlags, setStopFlags] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [memesRows, setMemesRows] = React.useState([]);
  const [memesRejectedRows, setMemesRejectedRows] = React.useState([]);
  const [memesApprovedRows, setMemesApprovedRows] = React.useState([]);
  const [userNetwork] = useGlobal("userNetwork");
  const [memeNetwork] = useGlobal("memeNetwork");
  const [web3] = useGlobal("web3");
  const [disobidentrows, setDisobedientRows] = React.useState([]);

  async function handleChange(event, newValue) {
    setValue(newValue);
    await fetchData();
    await fetchMemes();
    //console.log(props);
  }

// ----------------------- Map status functions : state int -> state str ----------------------

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

  function mapStatusMeme(statusInt) {
    if (statusInt == 0) {
      return "Approved";
    } else if (statusInt == 1) {
      return "Rejected";
    } else if (statusInt == 2) {
      return "Pending";
    }
  }

// ----------------------- Data update / fectching  ----------------------

  // Load data from web3 to populate [disobidentrows, setDisobedientRows]
  useEffect(() => {
    // Hooks when smthg is update
    // Global laucnh
    fetchData();
    fetchMemes();
  }, [userNetwork,memeNetwork]);

  // Function for populate data : it's called to modify rows / disobidentrows states
  async function fetchData() {
    // fetch the data from contracts to have current users status
    const resObedients = [];
    const resDisobedients = [];
    async function fetchDataInside(resObedients, resDisobedients) {
      // Use try / catch to prevent error when network is not loaded (when you go directly to admin page in dev mode) -> Thus global constatns are not set

      try {
        // Check networks are up to date
        console.log("this is web3: ", web3);
        console.log("this is memeNetwok: ", memeNetwork);

        // Get number of accounts to iter on it (could be improve but impossible to return array from solidity)
        const result = await web3.eth.getAccounts();
        const numOfElements = await userNetwork.methods
          .getNumberUsers()
          .call({ from: result[0] });

        // Set Rows empty

        // Return user array from solidity
        for (let i = 0; i < numOfElements; i++) {
          // Current user
          const elem = await userNetwork.methods
            .users(i)
            .call({ from: result[0] });
          // If user is disobedient : bad guy
          if (elem.state == 2) {
            //console.log("Tab change : user is not Obedient", elem);
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
            //console.log("Tab change : user is Obedient", elem);
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
        console.log("Error in the process of fecthing data");
      }
    }

    // Do something with the results : await for fetch and update state
    await fetchDataInside(resObedients, resDisobedients);
    setRows(resObedients);
    setDisobedientRows(resDisobedients);
  }

  // Function for populate data : it's called to modify rows / disobidentrows states
  async function fetchMemes() {
    // fetch the data from contracts to have current users status
    const resMemesFlagged = [];
    const resMemesDisobediend = [];
    const resMemesApproved = [];
    async function fetchDataMemeInside(
      resMemesFlagged,
      resMemesDisobediend,
      resMemesApproved
    ) {
      // Use try / catch to prevent error when network is not loaded (when you go directly to admin page in dev mode) -> Thus global constatns are not set

      try {
        // Check networks are up to date
        console.log("Fetch Meme,this is memeNetwork: ", memeNetwork);
        console.log("Fetch Meme,this is web3: ", web3);

        // Get number of accounts to iter on it (could be improve but impossible to return array from solidity)
        const result = await web3.eth.getAccounts();
        const numOfElements = await memeNetwork.methods
          .getNumberMemes()
          .call({ from: result[0] });
        //console.log("Number of memes:", numOfElements);

        // Return dynamic meme array
        for (let i = 0; i < numOfElements; i++) {
          // Current meme
          const elem = await memeNetwork.methods
            .memes(i)
            .call({ from: result[0] });
          //console.log("This is a meme:", elem);

          // If pending ('2' == 'Peding') or if (approved ('0' == Approved) and memeFlags > 0)
          if (
            (elem.memeState == 2) |
            ((elem.memeState == 0) & (elem.memeFlags > 0))
          ) {
            //console.log("meme should be rejected / approved", elem);
            resMemesFlagged.push(
              createDataMeme(
                elem.memeId,
                elem.memeTitle,
                elem.memeOwner,
                elem.memeValue,
                elem.memeFlags,
                mapStatusMeme(elem.memeState)
              )
            );
          }
          // If meme is rejected ('1' == rejected)
          else if (elem.memeState == 1) {
            //console.log("meme is already rejected", elem);
            resMemesDisobediend.push(
              createDataMeme(
                elem.memeId,
                elem.memeTitle,
                elem.memeOwner,
                elem.memeValue,
                elem.memeFlags,
                mapStatusMeme(elem.memeState)
              )
            );
          }
          // Else means : meme approved and flags <= FlagStop
          else {
            //console.log("meme is clean", elem);
            resMemesApproved.push(
              createDataMeme(
                elem.memeId,
                elem.memeTitle,
                elem.memeOwner,
                elem.memeValue,
                elem.memeFlags,
                mapStatusMeme(elem.memeState)
              )
            );
          }
        }
      } catch (e) {
        console.log("Error in the process");
      }
    }

    // Do something with the results : await for fetch and update state
    await fetchDataMemeInside(
      resMemesFlagged,
      resMemesDisobediend,
      resMemesApproved
    );
    // Update all parents rows for MemeFlagged.js child
    setMemesRows(resMemesFlagged);
    setMemesRejectedRows(resMemesDisobediend);
    setMemesApprovedRows(resMemesApproved);
  }

  // ----------------------- Printing  ----------------------

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
          <Tab label="Memes Flagged / Pending" {...a11yProps(2)} />
          <Tab label="Memes Rejected" {...a11yProps(3)} />
          <Tab label="Memes Approved" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <Users value={value} index={0} peopleParent={rows} />
      <Users value={value} index={1} peopleParent={disobidentrows} />

      <MemesFlagged
        value={value}
        index={2}
        peopleParent={memesRows}
        stopFlags={stopFlags}
      />

      <MemesFlagged
        value={value}
        index={3}
        peopleParent={memesRejectedRows}
        stopFlags={stopFlags}
      />

      <MemesFlagged
        value={value}
        index={4}
        peopleParent={memesApprovedRows}
        stopFlags={stopFlags}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AdminPage);
