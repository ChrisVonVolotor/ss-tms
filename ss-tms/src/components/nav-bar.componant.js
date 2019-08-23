import React, { Component } from "react";
import "../css/style.css";

export default class TopNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id='TopNavBar'>
				<ul>
					<li>
						<a href='#home'>Home</a>
					</li>
					<li>
						<a href='#news'>News</a>
					</li>
					<li>
						<a href='#contact'>Contact</a>
					</li>
					<li>
						<a href='#about'>About</a>
					</li>
				</ul>
			</div>
		);
	}
}
