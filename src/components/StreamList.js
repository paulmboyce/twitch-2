import React from "react";
import { connect } from "react-redux";

const byIdDesc = (a, b) => b.id - a.id;

const StreamList = ({ streams }) => {
	const renderStreams = () => {
		return streams.sort(byIdDesc).map(({ id, title, desc }) => {
			return (
				<div key={id} className="card">
					<div className="content">
						<div className="header">{title}</div>
						<div className="description">{desc}</div>
					</div>
					<div className="extra content">
						<div className="ui three buttons">
							<div className="ui  green button">Watch</div>
							<div className="ui basic blue button">Edit</div>
							<div className="ui basic red button">Delete</div>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Streams</h1>
			<div className="ui cards">{renderStreams()}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { streams: state.streams };
};

export default connect(mapStateToProps)(StreamList);
