import React from "react";
import CreateOfficeForm from "../../Forms/CreateOfficeForm/CreateOfficeForm";
import "./CreateOfficePage.scss";

const CreateOfficePage = () => {
	const componentClass = "create-offices-page-container";
	return (
		<div className={componentClass}>
			<CreateOfficeForm />
		</div>
	);
};

export default CreateOfficePage;
