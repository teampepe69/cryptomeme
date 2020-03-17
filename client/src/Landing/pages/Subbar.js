import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/feed">Feed</Link>
            </li>
            <li>
              <Link to="/following">Following</Link>
            </li>
            <li>
              <Link to="/myProfile">My Profile</Link>
            </li>
            <li>
              <Link to="/market">MemeMarketPlace</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/following">
            <Following />
          </Route>
          <Route path="/myProfile">
            <Profile />
          </Route>
          <Route path="/market">
            <Market />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

//Simulate the rendering of pages
//https://reacttraining.com/react-router/web/guides/quick-start
function Home() {
  return <h2>Home</h2>;
}

function Feed() {
  return <h2>Feed page</h2>;
}

function Following() {
  return <h2>Following page</h2>;
}
function Profile() {
  return <h2>My Profile page</h2>;
}

function Market() {
  return <h2>MemeMarket page</h2>;
}