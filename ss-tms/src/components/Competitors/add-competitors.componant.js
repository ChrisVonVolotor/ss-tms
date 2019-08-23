import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
export default class AddCompetitor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Competitor_firstName: "",
			Competitor_lastName: "",
			modal: false
		};

		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	onChangeFirstName(e) {
		this.setState({
			Competitor_firstName: e.target.value
		});
	}

	onChangeLastName(e) {
		this.setState({
			Competitor_lastName: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		console.log("Form Submmited");
		console.log("First Name: " + this.state.Competitor_firstName);
		console.log("Last Name: " + this.state.Competitor_lastName);

		const newCompetitor = {
			Competitor_firstName: this.state.Competitor_firstName,
			Competitor_lastName: this.state.Competitor_lastName
		};
		axios
			.post(process.env.API_URL + "/competitor/add", newCompetitor)
			.then(res => console.log(res.data));

		this.setState({
			Competitor_firstName: "",
			Competitor_lastName: "",
			modal: !this.state.modal
		});
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	render() {
		return (
			<div>
				<Button color='' className='btn btn-primary' onClick={this.toggle}>
					Add Competitor
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Create New Competitor</ModalHeader>
					<ModalBody>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<label>First Name: </label>
								<input
									type='text'
									className='form-control'
									value={this.state.Competitor_firstName}
									onChange={this.onChangeFirstName}
								/>
							</div>
							<div className='form-group'>
								<label>Last Name: </label>
								<input
									type='text'
									className='form-control'
									value={this.state.Competitor_lastName}
									onChange={this.onChangeLastName}
								/>
							</div>
							<div className='form-group'></div>
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
