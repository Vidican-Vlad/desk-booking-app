import "./TextInput.scss";
import React from "react";
import { ErrorMessage, useField } from "formik";
const TextInput = ({ labelText, placeholderText, id, ...props }) => {
	const [field, meta] = useField(props);
	const classComponent = "text-input-container";
	return (
		<div className={classComponent}>
			<label htmlFor={props.name}>
				{!meta.error || !meta.touched ? (
					labelText
				) : (
					<ErrorMessage name={props.name} />
				)}
			</label>
			<input
				type={props.type}
				name={props.name}
				placeholder={placeholderText}
				{...field}
				autoComplete="false"
				id={id}
			/>
		</div>
	);
};

export default TextInput;
