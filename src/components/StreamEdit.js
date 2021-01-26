import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import updateStreamAction from "../redux/compose/updateStreamAction";
import getStreamAction from "../redux/compose/getStreamsAction";
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
			<label htmlFor={input.name}>{label}</label>
			<input id={input.name} {...input} />
			{touched && error && <span style={{ color: "red" }}>{error}</span>}
		</div>
	);
};

const StreamEdit = ({ dispatch, match, initialValues, handleSubmit }) => {
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

const mapStateToProps = (state, { match }) => {
	return {
		initialValues: state.streams[match.params.streamId],
	};
};
export default connect(mapStateToProps)(formStreamEdit);
