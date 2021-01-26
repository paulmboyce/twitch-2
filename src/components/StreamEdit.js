import React, { useEffect } from "react";
import { connect } from "react-redux";
import updateStreamAction from "../redux/compose/updateStreamAction";
import getStreamAction from "../redux/compose/getStreamAction";
import StreamForm from "./StreamForm";

const StreamEdit = ({ dispatch, match, initialValues }) => {
	useEffect(() => {
		if (!initialValues) {
			dispatch(getStreamAction(match.params.streamId));
		}
	}, []);

	const onSubmit = (formValues) => {
		console.log("SUBMIT", formValues);
		dispatch(updateStreamAction(formValues));
	};

	console.log("initialValues: ", initialValues);
	if (!initialValues) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<h1>StreamEdit:</h1>
			<StreamForm onSubmit={onSubmit} initialValues={initialValues} />
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	return {
		initialValues: state.streams[match.params.streamId],
	};
};
export default connect(mapStateToProps)(StreamEdit);
