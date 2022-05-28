import "./CreateAccountsPage.scss";
import React from "react";
import CreateAccountForm from "../../Forms/CreateAccountForm/CreateAccountForm";

const CreateAccountsPage = () => {
	const componentClass = "create-accounts-page-container";
	return (
		<div className={componentClass}>
			<CreateAccountForm />
		</div>
	);
};

export default CreateAccountsPage;
