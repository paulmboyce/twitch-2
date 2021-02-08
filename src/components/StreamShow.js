import React, { useEffect } from "react";
import { connect } from "react-redux";
import getStreamAction from "../redux/compose/getStreamAction";

const StreamShow = ({ dispatch, stream, match }) => {
	useEffect(function () {
		if (!stream) {
			dispatch(getStreamAction(match.params.streamId));
		}
	}, []);

	if (!stream) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>StreamShow</h1>
			<h2>{stream.title}</h2>
			<h3>{stream.desc}</h3>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	return { stream: state.streams[match.params.streamId] };
};

export default connect(mapStateToProps)(StreamShow);
