import React, { Component } from "react";
import axios from "axios";
import IndivdualFixture from "./view-fixtures.individual.componant";
import {Media} from 'reactstrap';

var PrintFixture = props => (
	<div>
			<div class="container-fluid">
	<div class="row border">
		<div class="col-md-12 flex">
			<div class="row">
				<div class="col-md-5 text-left">
				{props.fixture.Match_Competitor1.Competitor_firstName}{" "}
					{props.fixture.Match_Competitor1.Competitor_lastName}
				</div>
				<div class="col-md-2 text-centre">
				<IndivdualFixture className='col-2' id={props.fixture._id} />
				</div>
				<div class="col-md-5 text-right">
				{props.fixture.Match_Competitor2.Competitor_firstName}{" "}
					{props.fixture.Match_Competitor2.Competitor_lastName}
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
				</div>
				<div class="col-md-6">
				</div>
			</div>
		</div>
	</div>
</div>
	</div>
);
/*
var PrintRoundFixture = props => (
	<span>
		<span className='row-col-12 bold card-header'>
			Round {props.fixture.Match_Round}
		</span>
		<table className=' col-12'>
			<tr className='list-group-item row-col-12'>
				<td className='col-5 align-left'>
					{props.fixture.Match_Competitor1.Competitor_firstName}{" "}
					{props.fixture.Match_Competitor1.Competitor_lastName}
				</td>
				<td>
					<IndivdualFixture className='col-2' id={props.fixture._id} />
				</td>
				<td className='col-5 align-right'>
					{props.fixture.Match_Competitor2.Competitor_firstName}{" "}
					{props.fixture.Match_Competitor2.Competitor_lastName}
				</td>
			</tr>
		</table>
	</span>
);*/

var PrintRoundFixture = props => (
	<div>
		<div className='row-col-12 bold card-header'>
			Round {props.fixture.Match_Round}
		</div>
		<div class="container-fluid">
	<div class="row border">
		<div class="col-md-12 flex">
			<div class="row">
				<div class="col-md-5 text-left">
				{props.fixture.Match_Competitor1.Competitor_firstName}{" "}
					{props.fixture.Match_Competitor1.Competitor_lastName}
				</div>
				<div class="col-md-2 text-centre">
				<IndivdualFixture className='col-2' id={props.fixture._id} />
				</div>
				<div class="col-md-5 text-right">
				{props.fixture.Match_Competitor2.Competitor_firstName}{" "}
					{props.fixture.Match_Competitor2.Competitor_lastName}
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
				</div>
				<div class="col-md-6">
				</div>
			</div>
		</div>
	</div>
</div>
	</div>
);


export default class viewAllFixtures extends Component {
	constructor(props) {
		super(props);
		this.state = { fixtures: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:4000/fixture/")
			.then(response => {
				this.setState({ fixtures: response.data });
				console.log(response.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	fixtureList() {
		let currentRound = 0;
		return this.state.fixtures.map(function(currentFixture, i) {
			if (currentFixture.Match_Round !== currentRound) {
				currentRound = currentFixture.Match_Round;
				return <PrintRoundFixture fixture={currentFixture} key={i} />;
			} else {
				return <PrintFixture fixture={currentFixture} key={i} />;
			}
		});
	}

	render() {
		return (
			<div>
				<div className='row-col-12'>
					<h3 className='col-12'>Fixture List</h3>
					{this.fixtureList()}
				</div>
			</div>
		);
	}
}
