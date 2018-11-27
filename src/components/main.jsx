import React from 'react';
import Mtop from './Mtop.jsx';
import Lookup from '../containers/lookup.js';
import Cache from './cache/cache.jsx';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import { Router, Route, Redirect } from 'react-router';
import Player from '../containers/player.js'
class main extends React.Component {
  componentDidMount(){
  }
  render() {
    if(this.props.history.location.pathname =="/"){
      this.props.history.push("/main/recommend");
  }
    return (
        <div className="main">
					<HashRouter>
              <Route path='/main' component={Mtop}></Route>
					</HashRouter>
					<HashRouter>
              <Route path='/lookup' component={Lookup}></Route>
					</HashRouter>
          <Player/>
        </div>
    );
  }
}
export default main;