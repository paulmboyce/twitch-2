import React, { useEffect } from "react";
import { connect } from "react-redux";

import getStreamsAction from "../redux/compose/getStreamsAction";

const byIdDesc = (a, b) => b.id - a.id;

const StreamList = ({ dispatch, streams }) => {
	useEffect(() => {
		dispatch(getStreamsAction());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
