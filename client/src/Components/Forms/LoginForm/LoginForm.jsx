import "./LoginForm.scss";
import React, { useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import LoginImg from "../../../Assets/Images/LoginImage.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../TextInput/TextInput";
import {
	loginFail,
	loginInit,
	loginSuccess,
} from "../../../Redux/Features/authenticationSlice";
import { userLogin } from "../../../Redux/API/authentication";
const initialValues = {
	email: "",
	password: "",
};

const LoginForm = () => {
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
		dispatch(loginInit());

		try {
			const loginValues = {
				email: values.email,
				password: values.password,
			};

			const loginResponse = await userLogin(loginValues);
			if (!loginResponse.token) {
				dispatch(loginFail("Can`t register!"));
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
					<img src={LoginImg} alt="login-svg" />
				</div>
				<div className={formSideClass}>
					<h1>Employee Login</h1>
					<Form className={formContainerClass}>
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

						<div className={buttonContainerClass}>
							<button type="submit">Login</button>
							<p>
								Forgot Password? Click <Link to="/">Here</Link>
							</p>
						</div>
					</Form>
				</div>
			</div>
		</Formik>
	);
};

export default LoginForm;
