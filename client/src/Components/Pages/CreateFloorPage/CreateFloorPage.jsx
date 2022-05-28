import "./CreateFloorPage.scss";
import React from "react";
import CreateFloorForm from "../../Forms/CreateFloorForm/CreateFloorForm";

const CreateFloorPage = () => {
	const componentClass = "create-floor-page-container";
	return (
		<div className={componentClass}>
			<CreateFloorForm />
		</div>
	);
};

export default CreateFloorPage;
