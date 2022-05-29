import "./ResetPasswordForm.scss";
import React, { useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import ForgotImg from "../../../Assets/Images/ForgotPasswordImage.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../TextInput/TextInput";
import {
	changePasswordInit,
	changePasswordFail,
	changePasswordSuccess,
} from "../../../Redux/Features/authenticationSlice";
import { userLogin } from "../../../Redux/API/authentication";
const initialValues = {
	email: "",
	password: "",
};

const ResetPasswordForm = () => {
	const { isConnected } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isConnected) navigate("/");
	}, [isConnected, navigate]);

	const validate = Yup.object({
		email: Yup.string()
			.email("Enter a valid email!")
			.required("Email required!"),
		password: Yup.string().required("Password required!"),
	});

	const submitHandler = async (values) => {
		dispatch(changePasswordInit());

		try {
			const loginValues = {
				email: values.email,
				password: values.password,
			};

			const loginResponse = await userLogin(loginValues);
			if (!loginResponse.token) {
				dispatch(loginFail("Can`t login!"));
			}
			console.log(loginResponse);
			dispatch(loginSuccess(loginResponse.isAdmin));

			navigate("/");
		} catch (error) {
			dispatch(loginFail(error.message));
		}
	};

	const componentClass = "login-form-container";
	const imgContainerClass = `${componentClass}__img`;
	const formSideClass = `${componentClass}__form-side`;
	const formContainerClass = `${formSideClass}__form-container`;
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
				<div className={imgContainerClass}>
					<img src={ForgotImg} alt="login-svg" />
				</div>
				<div className={formSideClass}>
					<h1>Reset Password</h1>
					<Form className={formContainerClass}>
						<TextInput
							type="text"
							id="key"
							labelText="Key:"
							placeholderText="Key"
							name="key"
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
							id="confirmPassword"
							labelText="Confirm Password: "
							placeholderText="Confirm Password"
							name="confirmPassword"
						/>

						<div className={buttonContainerClass}>
							<button type="submit">Reset Password</button>
						</div>
					</Form>
				</div>
			</div>
		</Formik>
	);
};

export default ResetPasswordForm;
