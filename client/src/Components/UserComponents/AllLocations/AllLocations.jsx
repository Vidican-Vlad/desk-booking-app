import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOffice } from "../../../Redux/API/office";
import {
	loadOfficeFail,
	loadOfficeInit,
	loadOfficeSuccess,
} from "../../../Redux/Features/officesSlice";
import "./AllLocations.scss";

const AllLocations = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const loadData = async () => {
			try {
				dispatch(loadOfficeInit());
				const res = await getOffice();
				if (!res) {
					dispatch(loadOfficeFail("Can't load Office!"));
				} else {
					dispatch(loadOfficeSuccess(res));
				}
			} catch (error) {
				console.log(error);
				dispatch(loadOfficeFail(error.message));
			}
		};
		loadData();
	}, [dispatch]);

	const { offices } = useSelector((state) => state.officesState);
	const componentClass = "all-locations-container";
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
			</div>
			<div className={officesContainerClass}>
				{offices &&
					offices.map((item) => {
						return (
							<div className={officeClass} key={item._id}>
								<p className={officeNameClass}>
									<span>Office name:</span> {item.Name}
								</p>
								<p className={officePhoneClass}>
									<span>Phone Number:</span> {item.Telephone}
								</p>
								<p className={officeAddressClass}>
									<span>Address:</span> {item.Address}
								</p>
								<Link to={`/office/${item._id}/`}>
									Show Floors
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default AllLocations;
