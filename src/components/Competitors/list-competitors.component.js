import React, { Component } from "react";
import axios from "axios";
import EditCompetitor from "./edit-competitors.component";
import AddCompetitor from "./add-competitors.componant";
import DeleteCompetitor from "./delete-competitors.component";
import GenerateTournament from "./generatre-tournament.component";
import { ButtonGroup } from "reactstrap";
require("bootstrap");
//import { threadId } from 'worker_threads';

var Competitor = props => (
	<tr>
		<td>{props.competitor.Competitor_firstName}</td>
		<td>{props.competitor.Competitor_lastName}</td>
		<td>
			<ButtonGroup>
				<EditCompetitor id={props.competitor._id} />
				<DeleteCompetitor id={props.competitor._id} />
			</ButtonGroup>
		</td>
	</tr>
);

export default class ListCompetitors extends Component {
	constructor(props) {
		super(props);
		this.state = { competitors: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:4000/competitor/")
			.then(response => {
				this.setState({ competitors: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	componentDidUpdate() {
		axios
			.get("http://localhost:4000/competitor/")
			.then(response => {
				this.setState({ competitors: response.data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	competitorsList() {
		return this.state.competitors.map(function(currentCompetitor, i) {
			return <Competitor competitor={currentCompetitor} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<div>
					<h3>Competitor List</h3>
					<table className='table table-striped' style={{ marginTop: 20 }}>
						<thead>
							<tr>
								<th className='col-5'>First Name</th>
								<th className='col-5'>Last Name</th>
								<th className='col-2' colSpan='2'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>{this.competitorsList()}</tbody>
					</table>
					<div className=' items-inline'>
						<ButtonGroup>
							<AddCompetitor />
							<GenerateTournament competitors={this.state.competitors} />
						</ButtonGroup>
					</div>
				</div>
			</div>
		);
	}
}
