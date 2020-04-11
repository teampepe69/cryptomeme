import * as React from "react";
import { useGlobal, useEffect } from "reactn";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const styles = (theme) => ({
  winner: {
    backgroundColor: "#e5e4e2",
    minHeight: 20,
  },
  loser: {},
  list: {
    paddingTop: 1,
    minHeight: "15vh",
  },
});

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

const Rankings = (props) => {
  const { peopleParent, stopFlags, classes, ...other } = props;
  const [people, setPeople] = React.useState(peopleParent);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("rank");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);

  useEffect(() => {
    var people = peopleParent.sort((a, b) =>
      parseInt(a.pepeCoins) < parseInt(b.pepeCoins) ? 1 : -1
    );
    for (var i = 1; i <= people.length; i++) {
      people[i - 1].rank = i;
    }
    setPeople(people);
    console.log(
      "People parent have change -> We update people for printing",
      people
    );
  }, [peopleParent]);

  return (
    <div className={classes.tableWrapper}>
      <Paper square className={classes.paper}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <EmojiEventsIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Richest Pepe
            </Typography>
          </Toolbar>
        </AppBar>
        <List className={classes.list}>
          {stableSort(people, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((n) => (
              <React.Fragment key={n.uid}>
                {n.rank == 1 && (
                  <ListItem className={classes.winner}>
                    <ListItemText primary={n.rank} />
                    <ListItemAvatar>
                      <Avatar
                        src={`https://ipfs.io/ipfs/${n.displayPictureHash}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={n.displayName}
                      style={{ flex: "1 1 60%" }}
                    />
                    <ListItemText primary={`${n.pepeCoins} Peperonis`} />
                  </ListItem>
                )}
                {n.rank != 1 && (
                  <ListItem className={classes.loser}>
                    <ListItemText primary={n.rank} />
                    <ListItemAvatar>
                      <Avatar
                        src={`https://ipfs.io/ipfs/${n.displayPictureHash}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={n.displayName}
                      style={{ flex: "1 1 60%" }}
                    />
                    <ListItemText primary={`${n.pepeCoins} Peperonis`} />
                  </ListItem>
                )}
              </React.Fragment>
            ))}
        </List>
      </Paper>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Rankings);
