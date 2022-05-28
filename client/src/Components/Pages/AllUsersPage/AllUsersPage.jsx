import React from "react";
import AllUsers from "../../UserComponents/AllUsers/AllUsers";
import "./AllUsersPage.scss";

const AllUsersPage = () => {
	const componentClass = "all-users-page-container";

	return (
		<div className={componentClass}>
			<AllUsers />
		</div>
	);
};

export default AllUsersPage;
