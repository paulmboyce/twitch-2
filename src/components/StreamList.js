import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import deleteStreamAction from "../redux/compose/deleteStreamAction";
import history from "../history";
const byIdDesc = (a, b) => b.id - a.id;

const StreamList = ({ dispatch, streams, currentUserId }) => {
	const handleDeleteStream = (streamId) => {
		history.push(`/streams/delete/${streamId}`);
	};

	const renderEditDelete = (streamId, ownerId) => {
		if (currentUserId === ownerId) {
			return (
				<React.Fragment>
					<div
						role="button"
						className="ui right floated basic blue button"
						onClick={() => handleDeleteStream(streamId)}
					>
						X
					</div>
					<Link
						role="button"
						to={`/streams/edit/${streamId}`}
						className="ui right floated basic button"
					>
						Edit
					</Link>
				</React.Fragment>
			);
		}
	};

	const renderCreateButton = () => {
		if (currentUserId) {
			return (
				<div style={{ textAlign: "right" }}>
					<Link className="ui button primary" to="/streams/new">
						Create Stream
					</Link>
				</div>
			);
		}
	};

	const renderStreams = () => {
		return streams.sort(byIdDesc).map(({ id, title, desc, ownerId }) => {
			return (
				<div key={id} className="item">
					<div className="content">
						<div className="header">
							<i className="large middle aligned icon camera"></i>
							{title}
						</div>
						<div className="description">
							<p style={{ color: "grey" }}> Created: {ownerId}</p> {desc}
						</div>
						<div className="extra">
							<div className="ui green button">
								Watch Now
								<i className="right chevron icon"></i>
							</div>
							{renderEditDelete(id, ownerId)}
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Streams</h1>
			{renderCreateButton()}
			<hr />
			<div className="ui divided items">{renderStreams()}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		// NOTE: Map obj collection to array, so render code is clean.
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
	};
};

export default connect(mapStateToProps)(StreamList);
