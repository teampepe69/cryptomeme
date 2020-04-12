import React, { useGlobal, useEffect } from "reactn";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, CircularProgress } from "@material-ui/core";
import Rankings from "../components/Rankings";

const styles = (theme) => ({});
const LeaderBoardPage = (props) => {
  const { classes } = props;
  const [userNetwork] = useGlobal("userNetwork");
  const [pepeCoinNetwork] = useGlobal("pepeCoinNetwork");
  const [memeketPlaceNetwork] = useGlobal("memeketPlaceNetwork");
  const [web3] = useGlobal("web3");
  const [userData, setUserData] = React.useState();
  const [peopleParent, setPeopleParent] = React.useState([]);
  const [userWallet, setUserWallet] = React.useState(
    sessionStorage.getItem("account")
  );
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  //------------Fetch User Properties-------------------------

  // Function for populate data : it's called to modify rows / disobidentrows states
  async function fetchData() {
    setLoading(true);
    // fetch the data from contracts to have current users status
    const usersArray = [];
    async function fetchDataInside(usersArray) {
      // Use try / catch to prevent error when network is not loaded (when you go directly to admin page in dev mode) -> Thus global constatns are not set

      try {
        // Get number of accounts to iter on it (could be improve but impossible to return array from solidity)
        const result = await web3.eth.getAccounts();
        const numOfElements = await userNetwork.methods
          .getNumberUsers()
          .call({ from: result[0] });

        // Maybe there is a proper way however i do not find how to return dynamic array in solidity
        for (let i = 0; i < numOfElements; i++) {
          // Current user
          const elem = await userNetwork.methods
            .users(i)
            .call({ from: result[0] });

          const pepeCoinsNb = await pepeCoinNetwork.methods
            .balanceOf(elem.userWallet)
            .call();
          usersArray.push(
            createDataPepe(
              pepeCoinsNb,
              elem.userId,
              elem.displayName,
              elem.displayPictureHash
            )
          );
        }
      } catch (e) {
        console.log("Error in the process");
      }
      setLoading(false);
    }

    // Do something with the results : await for fetch and update state
    await fetchDataInside(usersArray);
    setPeopleParent(usersArray);
  }

  function createDataPepe(pepeCoins, uid, displayName, displayPictureHash) {
    return { pepeCoins, uid, displayName, displayPictureHash };
  }

  async function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div style={{ paddingRight: "20px" }}>
      <React.Fragment>
        {loading && <CircularProgress color="inherit" size={18} />}
        {!loading && <Rankings value={0} peopleParent={peopleParent} />}
      </React.Fragment>
    </div>
  );
};
export default withStyles(styles, { withTheme: true })(LeaderBoardPage);
