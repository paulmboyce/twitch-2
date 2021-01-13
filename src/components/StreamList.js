import React from "react";
import { connect } from "react-redux";

import deleteStreamAction from "../redux/compose/deleteStreamAction";
const byIdDesc = (a, b) => b.id - a.id;

const StreamList = ({ dispatch, streams }) => {
	const handleDeleteStream = (id) => {
		dispatch(deleteStreamAction(id));
	};

	const renderStreams = () => {
		return streams.sort(byIdDesc).map(({ id, title, desc }) => {
			return (
				<div key={id} className="item">
					<div className="content">
						<div className="header">
							<i className="large middle aligned icon camera"></i>
							{title}
						</div>
						<div className="description">{desc}</div>
						<div className="extra">
							<div className="ui right floated">
								<div className="ui green button">
									Watch Now
									<i className="right chevron icon"></i>
								</div>
								<div className="ui basic blue button">Edit</div>
								<div
									className="ui basic red button"
									onClick={() => {
										handleDeleteStream(id);
									}}
								>
									X
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Streams</h1>
			<div className="ui divided items">{renderStreams()}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		// NOTE: Map obj collection to array, so render code is clean.
		streams: Object.values(state.streams),
	};
};

export default connect(mapStateToProps)(StreamList);
