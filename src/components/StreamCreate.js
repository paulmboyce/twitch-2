import React from "react";
import { reduxForm, Field } from "redux-form";
import { useHistory } from "react-router-dom";
import { restApi } from "../api/axios/axios";

const StreamCreate = ({ handleSubmit }) => {
	const history = useHistory();

	const renderError = ({ touched, error }) => {
		if (touched && error) {
			return <span style={{ color: "red" }}>{error}</span>;
		}
	};

	const renderInput = ({ input, meta, label }) => {
		return (
			<div className="field">
				<label>{label}</label>
				<input type="text" {...input} autoComplete="off" />
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = (formValues) => {
		console.log("onSubmit! FORM DATA: ", formValues);
		restApi.post("/", formValues).then(() => {
			history.push("/");
		});
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

export default reduxForm({ form: "StreamCreate", validate })(StreamCreate);
