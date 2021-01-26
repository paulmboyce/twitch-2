import React from "react";
import { connect } from "react-redux";

import createStreamAction from "../redux/compose/createStreamAction";
import StreamForm from "./StreamForm";

const StreamCreate = ({ dispatch }) => {
	const onSubmit = (formValues) => {
		dispatch(createStreamAction(formValues));
	};

	return (
		<div>
			<h1>StreamCreate</h1>
			<StreamForm onSubmit={onSubmit} />
		</div>
	);
};

export default connect()(StreamCreate);
