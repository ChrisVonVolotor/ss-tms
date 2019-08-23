import React, { Component } from "react";
import axios from "../../../ss-tms/node_modules/axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class EditCompetitors extends Component {
	constructor(props) {
		super(props);

		this.onChangeCompetitorFirstName = this.onChangeCompetitorFirstName.bind(
			this
		);
		this.onChangeCompetitorLastName = this.onChangeCompetitorLastName.bind(
			this
		);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggle = this.toggle.bind(this);

		this.state = {
			Competitor_firstName: "",
			Competitor_lastName: "",
			Competitor_points: "",
			modal: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	onChangeCompetitorFirstName(e) {
		this.setState({
			Competitor_firstName: e.target.value
		});
	}

	onChangeCompetitorLastName(e) {
		this.setState({
			Competitor_lastName: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const obj = {
			Competitor_firstName: this.state.Competitor_firstName,
			Competitor_lastName: this.state.Competitor_lastName,
			Competitor_points: this.state.Competitor_points
		};

		console.log(obj);
		axios
			.post(process.env.API_URL + "/competitor/update/" + this.props.id, obj)
			.then(res => console.log(res.data));

		this.setState({
			modal: !this.state.modal
		});
	}

	componentDidMount() {
		axios
			.get(process.env.API_URL + "/competitor/" + this.props.id)
			.then(response => {
				this.setState({
					Competitor_firstName: response.data.Competitor_firstName,
					Competitor_lastName: response.data.Competitor_lastName
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<Button color='info' className='btn btn-primary' onClick={this.toggle}>
					Edit
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Edit Competitor</ModalHeader>
					<ModalBody>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<label>First Name: </label>
								<input
									type='text'
									className='form-control'
									value={this.state.Competitor_firstName}
									onChange={this.onChangeCompetitorFirstName}
								/>
							</div>
							<div className='form-group'>
								<label>Last Name: </label>
								<input
									type='text'
									className='form-control'
									value={this.state.Competitor_lastName}
									onChange={this.onChangeCompetitorLastName}
								/>
							</div>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button
							type='submit'
							onClick={this.onSubmit}
							className='btn btn-primary'>
							Create
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
