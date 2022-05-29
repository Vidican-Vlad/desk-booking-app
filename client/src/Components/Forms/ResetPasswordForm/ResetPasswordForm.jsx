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
	registerFail,
} from "../../../Redux/Features/authenticationSlice";
import {
	generatePassResetKey,
	resetPassword,
	userLogin,
} from "../../../Redux/API/authentication";
const initialValues = {
	email: "",
	password: "",
};

const ResetPasswordForm = () => {
	const { isConnected } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validate = Yup.object({
		key: Yup.string().required("Key required!"),
		password: Yup.string().required("Password required!"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Password need to match!")
			.required("Re-Password required!"),
	});

	const submitKeyHandler = async () => {
		try {
			const response = await generatePassResetKey();
		} catch (error) {
			dispatch(changePasswordFail(error.message));
		}
	};

	const submitHandler = async (values) => {
		dispatch(changePasswordInit());

		try {
			const loginValues = {
				token: values.key,
				password: values.password,
			};

			const loginResponse = await resetPassword(loginValues);
			if (!loginResponse.token) {
				dispatch(changePasswordFail("Can`t change password!"));
			}
			console.log(loginResponse);
			dispatch(changePasswordSuccess(loginResponse));
			navigate("/");
		} catch (error) {
			dispatch(changePasswordFail(error.message));
		}
	};

	const componentClass = "reset-password-form-container";
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
					<button onClick={submitKeyHandler}>Generate Key</button>
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
