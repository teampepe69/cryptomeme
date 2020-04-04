import * as React from "react";
import { useGlobal, useEffect } from "reactn";
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableCell,
  IconButton,
  TableRow,
  Tooltip,
  TableHead,
  TableSortLabel,
  TableBody,
  Button,
  TablePagination,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import EditUser from "../components/EditUser";

const styles = (theme) => ({
  table: {
    backgroundColor: "white",
  },
  tableHead: {
    backgroundColor: "#cca677ff",
  },
});

const columnData = [
  {
    id: "uid",
    label: "UID",
  },
  {
    id: "username",
    label: "Username",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "state",
    label: "Status",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Users = (props) => {
  const { value, index, peopleParent, classes, ...other } = props;
  const [rows, setRows] = React.useState([]);
  const [people, setPeople] = React.useState(peopleParent);
  const [disobedientRows, setDisobedientRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setUser] = React.useState({
    uid: 69,
    username: "test",
    email: "my",
    state: "code",
  });
  const [userNetwork] = useGlobal("userNetwork");
  const [pepeCoinNetwork] = useGlobal("pepeCoinNetwork");
  const [web3] = useGlobal("web3");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const openModal = (user) => {
    const targetUser = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      state: user.state,
    };
    setUser(targetUser);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    // When we close a modal -> Check for fetching data in case of change
    fetchData();
  };

  // Function to fetch data when only User state change
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

    if (index == 0) {
      setPeople(resObedients);
    } else {
      setPeople(resDisobedients);
    }
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

  useEffect(() => {
    setPeople(peopleParent);
    console.log(
      "People parent have change -> We update people for printing",
      peopleParent
    );
  }, [peopleParent]);

  function createData(uid, username, email, state) {
    return { uid, username, email, state };
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {columnData.map(
                  (column) => (
                    <TableCell
                      key={column.id}
                      padding={column.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-end"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={order}
                          onClick={createSortHandler(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  ),
                  this
                )}
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(people, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => (
                  <TableRow hover tabIndex={0} key={n.uid}>
                    <TableCell>{n.uid}</TableCell>
                    <TableCell>{n.username}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.state}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => openModal(n)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={people.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <EditUser
            modalState={open}
            handleClose={closeModal}
            userInfo={selectedUser}
          />
        </div>
      )}
    </Typography>
  );
};

export default withStyles(styles, { withTheme: true })(Users);
