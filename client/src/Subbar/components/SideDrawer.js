import React, { useGlobal } from "react";
import "./SideDrawer.css";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    color: "#434343",
    paddingTop: 10
  }
});

const sideDrawer = props => {
  //const [global] = useGlobal();
  //console.log(global.web3);
  const { classes } = props;
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <Typography
          variant="h5"
          className={classes.title}
          component={Link}
          to="/"
        >
          Home
        </Typography>
        <Typography
          variant="h5"
          className={classes.title}
          component={Link}
          to="/profile"
        >
          Profile
        </Typography>
        <Typography
          variant="h5"
          className={classes.title}
          component={Link}
          to="/feed"
        >
          Feed
        </Typography>
        <Typography
          variant="h5"
          className={classes.title}
          component={Link}
          to="/following"
        >
          Following
        </Typography>
        <Typography
          variant="h5"
          className={classes.title}
          component={Link}
          to="/market"
        >
          Market
        </Typography>
      </ul>
    </nav>
  );
};

export default withStyles(styles, { withTheme: true })(sideDrawer);
