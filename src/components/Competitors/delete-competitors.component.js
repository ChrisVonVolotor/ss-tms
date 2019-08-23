import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class DeleteCompetitor extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			modal: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	componentDidMount() {}

	onSubmit(e) {
		e.preventDefault();
		axios
			.post("http://localhost:4000/competitor/delete/" + this.props.id)
			.then(res => {
				console.log(res.data);
			});
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	render() {
		return (
			<div>
				<Button
					color='warning'
					className='btn btn-primary'
					onClick={this.toggle}>
					Delete
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Delete Competitor</ModalHeader>
					<ModalBody>
						<div>Are you sure that you want to delete this competitor?</div>
					</ModalBody>
					<ModalFooter>
						<Button
							type='submit'
							onClick={this.onSubmit}
							className='btn btn-danger'>
							Yes
						</Button>
						<Button color='secondary' onClick={this.toggle}>
							No
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
