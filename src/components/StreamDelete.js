import React, { useEffect } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import deleteStreamAction from "../redux/compose/deleteStreamAction";
import getStreamAction from "../redux/compose/getStreamAction";
import history from "../history";

const StreamDelete = ({ dispatch, match, stream }) => {
	const { streamId } = match.params;
	useEffect(() => {
		if (!stream) {
			dispatch(getStreamAction(streamId));
		}
	}, []);

	const onClickModalOk = () => {
		dispatch(deleteStreamAction(streamId));
		history.push("/");
	};

	const onClickModalCancel = () => {
		history.push("/");
	};

	let message = "Want to delete stream" + (stream ? `: ${stream.title}?` : "?");
	return (
		<div>
			<h1>StreamDelete</h1>
			<Modal
				onClickOk={onClickModalOk}
				onClickCancel={onClickModalCancel}
				okLabel="DELETE"
				cancelLabel="NO"
				title={message}
			/>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	return { stream: state.streams[match.params.streamId] };
};
export default connect(mapStateToProps)(StreamDelete);
