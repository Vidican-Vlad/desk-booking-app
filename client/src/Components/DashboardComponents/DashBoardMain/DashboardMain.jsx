import "./DashboardMain.scss";
import React from "react";
import { Link } from "react-router-dom";
const DashboardMain = () => {
	const componentClass = "dashboard-main-container";
	const headerClass = `${componentClass}__header`;
	const officesContainerClass = `${componentClass}__offices`;
	const officeClass = `${officesContainerClass}__office`;
	const officeNameClass = `${officeClass}--name`;
	const officePhoneClass = `${officeClass}--phone`;
	const officeAddressClass = `${officeClass}--address`;

	return (
		<div className={componentClass}>
			<div className={headerClass}>
				<h2>Offices:</h2>
				<Link to="/dashboard/addOffice">Add new Office</Link>
			</div>
			<div className={officesContainerClass}>
				<div className={officeClass}>
					<p className={officeNameClass}>
						<span>Office name:</span> something sdada
					</p>
					<p className={officePhoneClass}>
						<span>Phone Number:</span> 231313123123
					</p>
					<p className={officeAddressClass}>
						<span>Address:</span> dsada dasdas fdsfsdfjk dasjhdasgdakmaasasfjs
					</p>
					<Link to="/">Show Floors</Link>
				</div>
				<div className={officeClass}>
					<p className={officeNameClass}>
						<span>Office name:</span> something sdada
					</p>
					<p className={officePhoneClass}>
						<span>Phone Number:</span> 231313123123
					</p>
					<p className={officeAddressClass}>
						<span>Address:</span> dsada dasdas fdsfsdfjk dasjhdasgdakmaasasfjs
					</p>
					<Link to="/">Show Floors</Link>
				</div>
				<div className={officeClass}>
					<p className={officeNameClass}>
						<span>Office name:</span> something sdada
					</p>
					<p className={officePhoneClass}>
						<span>Phone Number:</span> 231313123123
					</p>
					<p className={officeAddressClass}>
						<span>Address:</span> dsada dasdas fdsfsdfjk dasjhdasgdakmaasasfjs
					</p>
					<Link to="/">Show Floors</Link>
				</div>
				<div className={officeClass}>
					<p className={officeNameClass}>
						<span>Office name:</span> something sdada
					</p>
					<p className={officePhoneClass}>
						<span>Phone Number:</span> 231313123123
					</p>
					<p className={officeAddressClass}>
						<span>Address:</span> dsada dasdas fdsfsdfjk dasjhdasgdakmaasasfjs
					</p>
					<Link to="/">Show Floors</Link>
				</div>
			</div>
		</div>
	);
};

export default DashboardMain;
