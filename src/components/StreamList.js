import React from "react";
import { connect } from "react-redux";

const byIdDesc = (a, b) => b.id - a.id;

const StreamList = ({ streams }) => {
	const renderStreams = () => {
		return streams.sort(byIdDesc).map(({ id, title, desc }) => {
			return (
				<div key={id}>
					<b>{title}</b> - {desc}
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Streams</h1>
			<hr />
			{renderStreams()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return { streams: state.streams };
};

export default connect(mapStateToProps)(StreamList);
