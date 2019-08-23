import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class TableComponant extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: "Standings Loading..."
		};
	}

	render() {
		const posColor = e =>
			e === 1 ? "gold" : e === 2 ? "silver" : e === 3 ? "#CD7F32" : null;

		const columns = [
			{
				id: "posID",
				Header: "POS",
				accessor: "pos",
				getProps: (state, rowInfo, column) => {
					console.log(rowInfo);
					return {
						style: {
							background: posColor(rowInfo.row.posID)
						}
					};
				}
			},
			{
				Header: "NAME",
				accessor: "name"
			},
			{
				id: "pldID",
				Header: "PLD",
				accessor: "pld"
			},
			{
				id: "wonID",
				Header: "W",
				accessor: "won"
			},
			{
				id: "drawID",
				Header: "D",
				accessor: "draw"
			},
			{
				id: "lostID",
				Header: "L",
				accessor: "lost"
			},
			{
				id: "pdID",
				Header: "PD",
				accessor: "pd"
			},
			{
				id: "ptsID",
				Header: "PTS",
				accessor: "points"
			}
		];
		return (
			<ReactTable
				columns={columns}
				minRows={this.props.standings.length}
				data={this.props.standings}
				sortable={true}
				multiSort={true}
				filterable={true}
				pageSize={this.props.standings.length}
				showPagination={false}
				className='-striped -highlight'
			/>
		);
	}
}
