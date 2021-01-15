import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import updateStreamAction from "../redux/compose/updateStreamAction";

const validate = ({ title, desc }) => {
	const errors = {};

	if (!title) {
		errors.title = "Please enter a value.";
	}
	if (!desc) {
		errors.desc = "Please enter a descripton.";
	}
	return errors;
};

const renderInput = ({ input, label, meta: { touched, error } }) => {
	return (
		<div className="field">
			<label>{label}</label>
			<input {...input} />
			{touched && error && <span style={{ color: "red" }}>{error}</span>}
		</div>
	);
};

const StreamEdit = ({ dispatch, initialValues, handleSubmit }) => {
	const onSubmit = (formValues) => {
		console.log("SUBMIT", formValues);
		dispatch(updateStreamAction(formValues));
	};
	return (
		<div>
			<h1>StreamEdit: {initialValues.desc}</h1>

			<form className="ui form" onSubmit={handleSubmit(onSubmit)}>
				<Field name="title" type="text" component={renderInput} label="Title" />
				<Field
					name="desc"
					type="text"
					component={renderInput}
					label="Description"
				/>
				<br />
				<button type="submit" className="ui button primary right floated">
					Save
				</button>
				<Link to="/" className="ui button grey right floated ">
					Cancel
				</Link>
			</form>
		</div>
	);
};

const formStreamEdit = reduxForm({
	form: "formStreamEdit",
	validate: validate,
})(StreamEdit);

const mapStateToProps = (state) => {
	return {
		initialValues: state.activeStream,
	};
};
export default connect(mapStateToProps)(formStreamEdit);
