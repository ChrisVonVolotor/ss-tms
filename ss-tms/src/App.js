import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListCompetitor from "./components/Competitors/list-competitors.component";
import ListFixtures from "./components/view-fixtures.all.componant";
import EditFixtures from "./components/view-fixtures.individual.componant";
import ViewTable from "./components/view-table.standings.componant";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<nav className='navbar navbar-expand-lg navbar-light bg-light'>
						<Link to='/' className='navbar-brand'>
							Home
						</Link>
						<div className='collpase navbar-collapse'>
							<ul className='navbar-nav mr-auto'>
								<li className='navbar-item'>
									<Link to='/' className='nav-link'>
										List Competitor
									</Link>
								</li>
								<li className='navbar-item'>
									<Link to='/fixtures' className='nav-link'>
										List Fixtures
									</Link>
								</li>
								<li className='navbar-item'>
									<Link to='/table' className='nav-link'>
										View Table
									</Link>
								</li>
							</ul>
						</div>
					</nav>
					<br />
					<Route path='/' exact component={ListCompetitor} />
					<Route path='/fixtures' component={ListFixtures} />
					<Route path='/match/:id' component={EditFixtures} />
					<Route path='/table' component={ViewTable} />
				</div>
			</Router>
		);
	}
}
