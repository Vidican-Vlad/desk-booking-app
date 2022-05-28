import "./CreateAccountForm.scss";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CreateAccountSvg from "../../../Assets/Images/CreateAccountImage.svg";
import { useDispatch } from "react-redux";
import TextInput from "../TextInput/TextInput";
import {
	registerFail,
	registerInit,
	registerSuccess,
} from "../../../Redux/Features/authenticationSlice";
import { createUserAccount } from "../../../Redux/API/authentication";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		password: "",
		rePassword: "",
		firstName: "",
		lastName: "",
	};

	const validate = Yup.object({
		email: Yup.string()
			.email("Enter a valid email!")
			.required("Email required!"),
		password: Yup.string()
			.required("Password required!")
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
				"min 6 len = 0-9,a-z,A-Z and special"
			),
		rePassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Password need to match!")
			.required("Re-Password required!"),
		firstName: Yup.string().required("First name is required!"),
		lastName: Yup.string().required("Last name is required!"),
	});

	const submitHandler = async (values) => {
		dispatch(registerInit());

		try {
			const userValues = {
				email: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
			};

			const loginResponse = await createUserAccount(userValues);
			if (!loginResponse.token) {
				dispatch(registerFail("Can`t create account"));
			} else {
				dispatch(registerSuccess());
				navigate("/");
			}
		} catch (error) {
			dispatch(registerFail(error.message));
		}
	};

	const componentClass = "create-account-form-container";
	const imgContainerClass = `${componentClass}__img`;
	const formSideClass = `${componentClass}__form-side`;
	const formContainerClass = `${formSideClass}__form-container`;
	const buttonContainerClass = `${formContainerClass}__button-container`;
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				console.log("clivk");
				submitHandler(values);
			}}
		>
			<div className={componentClass}>
				{" "}
				<div className={imgContainerClass}>
					<img src={CreateAccountSvg} alt="create-account-svg" />
				</div>
				<div className={formSideClass}>
					<h1>Employee Assign Account</h1>
					<Form className={formContainerClass}>
						<TextInput
							type="text"
							id="firstName"
							labelText="First Name:"
							placeholderText="First Name:"
							name="firstName"
						/>

						<TextInput
							type="text"
							id="lastName"
							labelText="Last Name:"
							placeholderText="Last Name:"
							name="lastName"
						/>
						<TextInput
							type="email"
							id="email"
							labelText="Email:"
							placeholderText="Email"
							name="email"
						/>
						<TextInput
							type="password"
							id="password"
							labelText="Password: "
							placeholderText="Password"
							name="password"
						/>
						<TextInput
							type="password"
							id="rePassword"
							labelText="Repeat-Password:"
							placeholderText="Repeat-Password:"
							name="rePassword"
						/>
						<div className={buttonContainerClass}>
							<button type="submit">Register</button>
						</div>
					</Form>
				</div>
			</div>
		</Formik>
	);
};

export default CreateAccountForm;
