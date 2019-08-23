import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class GenerateTournament extends Component {
	constructor(props) {
		super(props);
		this.onChangeRobins = this.onChangeRobins.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			modal: false,
			robins: 1
		};
	}

	generateTournament() {
		axios
			.post(process.env.API_URL + "/fixture/create", {
				competitors: this.props.competitors,
				robins: this.state.robins
			})
			.then(res => console.log(res.data));
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	onChangeRobins(e) {
		this.setState({
			robins: e.target.value
		});
	}

	componentDidMount() {}

	onSubmit(e) {
		e.preventDefault();
		this.generateTournament();
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	render() {
		return (
			<div>
				<Button
					className='btn btn-primary'
					color='danger'
					onClick={this.toggle}>
					Generate Tournament
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Generate Tournament</ModalHeader>
					<ModalBody>
						<form>
							<label for='robins'>
								How many times would you like each competitor to play each
								other?
							</label>
							<input
								id='robins'
								type='number'
								value={this.state.robins}
								onChange={this.onChangeRobins}
							/>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button
							type='submit'
							onClick={this.onSubmit}
							className='btn btn-danger'>
							Generate
						</Button>
						<Button color='secondary' onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
