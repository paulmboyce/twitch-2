import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { useHistory } from "react-router-dom";

import createStreamAction from "../redux/compose/createStreamAction";

const renderInput = ({ input, meta, label }) => {
	return (
		<div className="field">
			<label>{label}</label>
			<input type="text" {...input} autoComplete="off" />
			{renderError(meta)}
		</div>
	);
};

const renderError = ({ touched, error }) => {
	if (touched && error) {
		return <span style={{ color: "red" }}>{error}</span>;
	}
};

const StreamCreate = ({ handleSubmit, dispatch, userId }) => {
	const history = useHistory();

	const onSubmit = (formValues) => {
		console.log("onSubmit! FORM DATA: ", formValues);
		formValues["owner"] = userId;
		dispatch(createStreamAction(formValues));
		history.push("/");
	};

	return (
		<div>
			<h1>StreamCreate</h1>
			<form className="ui form" onSubmit={handleSubmit(onSubmit)}>
				<Field component={renderInput} name="title" label="title" />
				<Field component={renderInput} name="desc" label="description" />
				<button className="ui button blue" type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "* Please enter a title";
	}
	if (!formValues.desc) {
		errors.desc = "* Please enter a description";
	}
	return errors;
};

const reduxFormStreamCreate = reduxForm({
	form: "StreamCreate",
	validate: validate,
})(StreamCreate);

const mapStateToProps = (state) => {
	return { userId: state.auth.userId };
};
export default connect(mapStateToProps)(reduxFormStreamCreate);
