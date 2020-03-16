import React, { Component } from "react";
import Feed from '../components/Feed.js'


class LandingPage extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.memeNetwork)

  }

  render(){
    console.log("Calling Landing Page")
    return(
      <div>
      <Feed account={this.props.account}
        memeNetwork={this.props.memeNetwork} memes={this.props.memes}
        memeketPlaceNetwork={this.props.memeketPlaceNetwork} />
    </div>
    )
  }
}



export default LandingPage;