import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import createStreamAction from "../redux/compose/createStreamAction";

const renderInput = ({ input, meta, label }) => {
	return (
		<div className="field">
			<label htmlFor={input.name}>{label}</label>
			<input id={input.name} type="text" {...input} autoComplete="off" />
			{renderError(meta)}
		</div>
	);
};

const renderError = ({ touched, error }) => {
	if (touched && error) {
		return <span style={{ color: "red" }}>{error}</span>;
	}
};

const StreamCreate = ({ handleSubmit, dispatch }) => {
	const onSubmit = (formValues) => {
		dispatch(createStreamAction(formValues));
	};

	return (
		<div>
			<h1>StreamCreate</h1>
			<form className="ui form" onSubmit={handleSubmit(onSubmit)}>
				<Field component={renderInput} name="title" label="title" />
				<Field component={renderInput} name="desc" label="description" />
				<button className="ui  right floated button blue" type="submit">
					Save
				</button>
				<Link role="button" className="ui right floated button grey" to="/">
					Cancel
				</Link>
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

export default connect()(reduxFormStreamCreate);
