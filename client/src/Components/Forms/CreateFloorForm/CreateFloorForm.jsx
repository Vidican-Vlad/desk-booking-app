import "./CreateFloorForm.scss";
import React, { useState } from "react";
import imageToBase64 from "image-to-base64/browser";
import { useDispatch } from "react-redux";
import {
	createFloorStateFail,
	createFloorStateInit,
	createFloorStateSuccess,
} from "../../../Redux/Features/officeDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { createFloor } from "../../../Redux/API/office";
const CreateFloorForm = () => {
	const { officeId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [files, setFiles] = useState({});
	const [jsonUploaded, setJsonUploaded] = useState(false);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const handleChangeJson = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			setFiles(JSON.parse(e.target.result));
			setJsonUploaded(true);
		};
	};

	const handleChangePng = (e) => {
		imageToBase64(e.target.files) // Path to the image
			.then((response) => {
				const updatedFiles = files;
				updatedFiles.Image = response;
				setFiles(updatedFiles);
				updatedFiles.console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSubmit = async () => {
		try {
			dispatch(createFloorStateInit());
			let res;
			if (officeId) {
				res = await createFloor(officeId, files);
			}

			if (!res) {
				dispatch(createFloorStateFail("Can't create floor!"));
			} else {
				dispatch(createFloorStateSuccess());
				navigate(`/dashboard/office/${officeId}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const componentClass = "create-floor-form-container";
	const inputContainerClass = `${componentClass}__input-container`;
	return (
		<div className={componentClass}>
			<h1>Add a new Floor</h1>

			<div className={inputContainerClass}>
				<label htmlFor="jsonFile">File to upload</label>
				<input
					type="file"
					id="jsonFile"
					accept=".json"
					onChange={handleChangeJson}
				></input>
			</div>
			<div className={inputContainerClass}>
				<label htmlFor="floorPlan">Upload floor plan with .png extension</label>
				<input
					type="file"
					name="floorPlan"
					id="floorPlan"
					accept="image/png"
					onChange={handleChangePng}
					disabled={!jsonUploaded}
					onClick={() => {
						setSubmitDisabled(false);
					}}
				/>
			</div>
			<button
				disabled={submitDisabled}
				onClick={() => {
					handleSubmit();
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default CreateFloorForm;
