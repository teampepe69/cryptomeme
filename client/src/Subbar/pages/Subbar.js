import * as React from 'react';
import './Subbar.css';

import DrawerToggleButton from '../components/DrawerToggleButton';

const subbar = props => (
  <header className = 'subbar'>
    <nav className = "subbar_navigation">
        <div>
          {/* <DrawerToggleButton click={props.drawerClickHandler}/> */}
        </div>
        <div className = "spacer" />
        <div className="subbar_navigation_items">
        </div>
    </nav>
  </header>
);

export default subbar