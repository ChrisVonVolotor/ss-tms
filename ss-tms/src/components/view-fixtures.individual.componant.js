import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class EditFixtures extends Component {
	constructor(props) {
		super(props);

		this.onChangeBout = this.onChangeBout.bind(this);
		this.onChangeRound = this.onChangeRound.bind(this);
		this.onMatchCompleted = this.onMatchCompleted.bind(this);

		this.onChangeHomeScore = this.onChangeHomeScore.bind(this);
		this.onChangeAwayScore = this.onChangeAwayScore.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggle = this.toggle.bind(this);

		this.state = {
			Match_Round: 0,
			Match_Bout: 0,
			Match_Competitor1: {},
			Match_Competitor2: {},
			Match_Competitor1_Score: 0,
			Match_Competitor2_Score: 0,
			Match_Completed: false,
			Button_Colour: "active",
			modal: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	onChangeRound(e) {
		this.setState({
			Match_Round: e.target.value
		});
	}

	onChangeBout(e) {
		this.setState({
			Match_Bout: e.target.value
		});
	}

	onChangeHomeScore(e) {
		this.setState({
			Match_Competitor1_Score: e.target.value
		});
	}

	onChangeAwayScore(e) {
		this.setState({
			Match_Competitor2_Score: e.target.value
		});
	}

	onMatchCompleted(e) {
		console.log(e.target.value === "on" ? true : false);
		this.setState({
			Match_Completed: e.target.value === "on" ? true : false,
			Button_Colour: e.target.value === "on" ? "warning" : "primary"
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const obj = {
			Match_Round: this.state.Match_Round,
			Match_Bout: this.state.Match_Bout,
			Match_Competitor1_Score: this.state.Match_Competitor1_Score,
			Match_Competitor2_Score: this.state.Match_Competitor2_Score,
			Match_Competitor1: this.state.Match_Competitor1,
			Match_Competitor2: this.state.Match_Competitor2,
			Match_Completed: this.state.Match_Completed
		};

		console.log(obj);
		axios
			.post(process.env.API_URL + "/fixture/update/" + this.props.id, obj)
			.then(res => console.log(res.data));

		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	componentDidMount() {
		console.log(this.props);
		axios
			.get(process.env.API_URL + "/fixture/" + this.props.id)
			.then(response => {
				this.setState({
					Match_Round: response.data.Match_Round,
					Match_Bout: response.data.Match_Bout,
					Match_Competitor1: response.data.Match_Competitor1,
					Match_Competitor2: response.data.Match_Competitor2,
					Match_Competitor1_Score: response.data.Match_Competitor1_Score,
					Match_Competitor2_Score: response.data.Match_Competitor2_Score,
					Match_Completed: response.data.Match_Completed,
					Button_Colour:
						response.data.Match_Completed === true ? "warning" : "primary"
				});
				console.log(this.state);
			})
			.catch(function(error) {
				console.log(error);
			});
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<Button color={this.state.Button_Colour} onClick={this.toggle}>
					{this.state.Match_Competitor1_Score} -{" "}
					{this.state.Match_Competitor2_Score}
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Update Fixture</ModalHeader>
					<ModalBody>
						<tr class='form-row align-items-center'>
							<td className='col-auto'>
								<label for='roundID'>Round</label>
								<input
									id='roundID'
									type='number'
									className='form-control inline col-4 mb-2'
									value={this.state.Match_Round}
									onChange={this.onChangeRound}
								/>
							</td>
							<td className='col-auto'>
								<label for='boutID'>Bout</label>
								<input
									type='number'
									id='boutID'
									className='form-control inline col-4 mb-2'
									value={this.state.Match_Bout}
									onChange={this.onCHnageBout}
								/>
							</td>
						</tr>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th>Home</th>
									<th align='center' colSpan='3'>
										v
									</th>
									<th align='right'>Away</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='col-3'>
										{this.state.Match_Competitor1.Competitor_firstName}{" "}
										{this.state.Match_Competitor1.Competitor_lastName}
									</td>
									<td className='col-2'>
										<div className=''>
											<input
												type='number'
												className='form-control'
												min='0'
												value={this.state.Match_Competitor1_Score}
												onChange={this.onChangeHomeScore}
											/>
										</div>
									</td>
									<td className='col-1'>-</td>
									<td>
										<div className='2'>
											<input
												type='number'
												className='form-control'
												min='0'
												value={this.state.Match_Competitor2_Score}
												onChange={this.onChangeAwayScore}
											/>
										</div>
									</td>
									<td className='col-4'>
										{this.state.Match_Competitor2.Competitor_firstName}{" "}
										{this.state.Match_Competitor2.Competitor_lastName}
									</td>
								</tr>
							</tbody>
						</table>
						<div class='custom-control custom-checkbox'>
							<input
								type='checkbox'
								class='custom-control-input'
								id='defaultChecked2'
								onChange={this.onMatchCompleted}
							/>
							<label class='custom-control-label' for='defaultChecked2'>
								Match Completed
							</label>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color='secondary' onClick={this.onSubmit}>
							Update Fixture
						</Button>
						<Button color='secondary' onClick={this.toggle}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
