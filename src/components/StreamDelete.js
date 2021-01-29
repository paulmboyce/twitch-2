import React from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import deleteStreamAction from "../redux/compose/deleteStreamAction";
import history from "../history";

const StreamDelete = ({ dispatch, match }) => {
	const onClickModalOk = () => {
		const { streamId } = match.params;
		dispatch(deleteStreamAction(streamId));
		history.push("/");
	};

	const onClickModalCancel = () => {
		history.push("/");
	};
	return (
		<div>
			<h1>StreamDelete</h1>
			<Modal
				onClickOk={onClickModalOk}
				onClickCancel={onClickModalCancel}
				okLabel="DELETE"
				cancelLabel="NO"
				title="Want to delete this stream?"
			/>
		</div>
	);
};

export default connect()(StreamDelete);
