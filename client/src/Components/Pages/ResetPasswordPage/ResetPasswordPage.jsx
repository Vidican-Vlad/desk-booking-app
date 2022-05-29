import React from "react";
import ResetPasswordForm from "../../Forms/ResetPasswordForm/ResetPasswordForm";
import "./ResetPasswordPage.scss";

const ResetPasswordPage = () => {
	const componentClass = "reset-password-page-container";
	return (
		<div className={componentClass}>
			<ResetPasswordForm />
		</div>
	);
};

export default ResetPasswordPage;
