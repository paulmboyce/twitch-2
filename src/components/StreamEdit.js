import pick from "lodash.pick";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import updateStreamAction from "../redux/compose/updateStreamAction";
import getStreamAction from "../redux/compose/getStreamAction";
import StreamForm from "./StreamForm";

const StreamEdit = ({ dispatch, match, initialValues }) => {
	const { streamId } = match.params;
	useEffect(() => {
		if (!initialValues) {
			dispatch(getStreamAction(streamId));
		}
	}, []);

	const onSubmit = (formValues) => {
		dispatch(updateStreamAction(streamId, formValues));
	};

	console.log("initialValues: ", initialValues);
	if (!initialValues) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<h1>StreamEdit:</h1>
			<StreamForm
				onSubmit={onSubmit}
				initialValues={pick(initialValues, "title", "desc")}
			/>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	return {
		initialValues: state.streams[match.params.streamId],
	};
};
export default connect(mapStateToProps)(StreamEdit);
