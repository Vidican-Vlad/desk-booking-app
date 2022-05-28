import React from "react";
import { Formik, Form } from "formik";
import {
	addOfficeInit,
	addOfficeFail,
	addOfficeSuccess,
} from "../../../Redux/Features/officesSlice";
import TextInput from "../TextInput/TextInput";
import { createOffice } from "../../../Redux/API/office";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateOfficeForm.scss";

const CreateOfficeForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const initialValues = {
		name: "",
		address: "",
		phone: "",
	};

	const validate = Yup.object({
		name: Yup.string().required("Name is required!"),
		address: Yup.string().required("Address is required!"),
		phone: Yup.string()
			.required("Phone is required!")
			.matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
	});

	const submitHandler = async (values) => {
		dispatch(addOfficeInit());

		try {
			const officeValues = {
				Name: values.name,
				Address: values.address,
				Telephone: values.phone,
			};

			const createResponse = await createOffice(officeValues);
			if (!createResponse) {
				dispatch(addOfficeFail("Can`t create office"));
			} else {
				dispatch(addOfficeSuccess());
				//navigate("/");
			}
		} catch (error) {
			dispatch(addOfficeFail(error.message));
		}
	};

	const componentClass = "create-office-form-container";
	const formContainerClass = `${componentClass}__form-container`;
	const buttonContainerClass = `${formContainerClass}__button-container`;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				submitHandler(values);
			}}
		>
			<div className={componentClass}>
				<Form className={formContainerClass}>
					<TextInput
						type="text"
						id="name"
						labelText="Name:"
						placeholderText="Name:"
						name="name"
					/>
					<TextInput
						type="text"
						id="address"
						labelText="Address:"
						placeholderText="Address:"
						name="address"
					/>
					<TextInput
						type="text"
						id="phone"
						labelText="Phone:"
						placeholderText="Phone:"
						name="phone"
					/>
					<div className={buttonContainerClass}>
						<button type="submit">Create</button>
					</div>
				</Form>
			</div>
		</Formik>
	);
};

export default CreateOfficeForm;
