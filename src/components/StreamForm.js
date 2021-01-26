import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

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

// Pass in an  initialValues prop to pre-populate form.
// e.g. <StreamForm onSubmit={onSubmit} initialValues={{title:"XYZ", desc:"123"}} />
const StreamForm = ({ handleSubmit, onSubmit }) => {
	return (
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

export default reduxForm({
	form: "StreamForm",
	validate: validate,
})(StreamForm);
