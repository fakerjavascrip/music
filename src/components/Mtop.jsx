import React from 'react';
import './Mtop.css';
import { Router, Route, Redirect } from 'react-router';
import { Link ,NavLink} from 'react-router-dom'
import recommend from '../containers/recommend.js'
import ranking from '../containers/ranking.js'
import singer from '../containers/singer'
import { BrowserRouter,HashRouter } from 'react-router-dom';
class Mtop extends React.Component {
		constructor(props,context){
				super(props,context);
				this.state = {

				}
		}
		lookup=(e)=>{

			this.props.history.push('/lookup');
		}
		render() {
				return (
						<div className="Mtop">
							<div className="Mtop_self">
								<div className = "Mtop_top">
									<div className = "Mtop_top_mark">
										<img src={require('../img/menu.png')} />
									</div>
									<div className="MTop_top_choice">
									{/* NavLink的activeClassName默认值为active，也可以手动activeclassname修改 */}
										<NavLink className="Mtop_top_title" activeClassName='active' to={'/main/recommend'}>推荐</NavLink>
										<NavLink className="Mtop_top_title" activeClassName="active" to={'/main/singer'}>歌手</NavLink>
										<NavLink className="Mtop_top_title" activeClassName="active" to={'/main/ranking'}>排行</NavLink>
									</div>
								</div>
								<div className="Mtop_center">
									<div onClick={this.lookup} className="Mtop_center_input">
										<img src={require('../img/search.png')} />
										<div>搜索</div>
									</div>
								</div>
							</div>
							<HashRouter>
								<Route path='/main/recommend' component={recommend}></Route>
							</HashRouter>
							<HashRouter>
								<Route path='/main/ranking' component={ranking}></Route>
							</HashRouter>
							<HashRouter>
                    			<Route path='/main/singer' component={singer}></Route>
                			</HashRouter>
						</div>
				);
  }
}
export default Mtop;