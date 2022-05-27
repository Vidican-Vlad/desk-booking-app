import React from "react";
import LoginForm from "../../Forms/LoginForm/LoginForm";

const LoginPage = () => {
	const componentClass = "login-page-container";
	return (
		<div className={componentClass}>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
