import React, { Component } from "react";
import Feed from "../components/Feed.js";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import Meme from "../../contracts/Meme.json";
import MemeketPlace from "../../contracts/MemeketPlace.json";
import getWeb3 from "../../getWeb3";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import MemeFeed from '../components/MemeFeed.js'

const styles = theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
});

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: this.props.account,
      memeketPlaceNetwork: this.props.memeketPlaceNetwork,
      memeNetwork: this.props.memeNetwork,
      userNetwork: this.props.userNetwork
    };
    // console.log(this.state.memes)
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {

      this.setState({
        account: this.props.account,
        memeketPlaceNetwork: this.props.memeketPlaceNetwork,
        memeNetwork: this.props.memeNetwork,
        userNetwork: this.props.userNetwork
      })

    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container fixed>
      
          {/* <Feed
            account={this.state.account}
            memeNetwork={this.state.memeNetwork}
            memeketPlaceNetwork={this.state.memeketPlaceNetwork}
            userNetwork = {this.state.userNetwork}
          />  */}
          <MemeFeed/>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LandingPage);

