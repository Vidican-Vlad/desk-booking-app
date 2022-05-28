import "./Navbar.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faMapLocationDot,
	faArrowRightToBracket,
	faArrowRightFromBracket,
	faLocation,
	faUsers,
	faCircleInfo,
	faChartLine
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../Redux/Features/authenticationSlice";
import { deleteCookies } from "../../../Utils/UtilFunctions";

const Navbar = () => {
	const { isConnected } = useSelector((state) => state.auth);
	const { isAdmin } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const classComponent = "navbar-container";
	const logoClass = `${classComponent}__logo`;
	const menuClass = `${classComponent}__menu`;
	const menuHeaderClass = `${menuClass}__header`;
	const menuListClass = `${menuClass}__list`;
	const menuItemClass = `${menuListClass}__item`;
	const navbarDividerClass = `${classComponent}__divider`;
	const navbarUserClass = `${classComponent}__user`;
	const navbarUserAvatarClass = `${navbarUserClass}__avatar`;
	const navbarUserInfoClass = `${navbarUserClass}__info`;
	const navbarUserInfoName = `${navbarUserInfoClass}__name`;
	const navbarUserInfoEmail = `${navbarUserInfoClass}__email`;
	const navbarUserInfoRole = `${navbarUserInfoClass}__role`;

	return (
		<nav className={classComponent}>
			<div className={logoClass}>
				<Link to="/">
					<FontAwesomeIcon icon={faMapLocationDot} />
					Book Desk
				</Link>
			</div>
			<div className={navbarDividerClass}></div>
			<div className={menuClass}>
				<span className={menuHeaderClass}>General</span>
				<ul className={menuListClass}>
					<li className={menuItemClass}>
						<Link to="/">
							<FontAwesomeIcon icon={faHouse} />
							Home
						</Link>
					</li>
					<li className={menuItemClass}>
						<Link to="/">
							<FontAwesomeIcon icon={faLocation} />
							Locations
						</Link>
					</li>
					<li className={menuItemClass}>
						<Link to="/">
							<FontAwesomeIcon icon={faUsers} />
							Users
						</Link>
					</li>
					<li className={menuItemClass}>
						<Link to="/">
							<FontAwesomeIcon icon={faCircleInfo} />
							About
						</Link>
					</li>
				</ul>
			</div>
			{ isAdmin && (
				<>
					<div className={navbarDividerClass}></div>
					<span className={menuHeaderClass}>Admin</span>
					<ul className={menuListClass}>
						<li className={menuItemClass}>
							<Link to="/dashboard">
								<FontAwesomeIcon icon={faChartLine} />
								Dashboard
							</Link>
						</li>
					</ul>
				</>
			)}
			{isConnected ? (
			<>			
				<div className={navbarDividerClass}></div>
				<span className={menuHeaderClass}>Welcome</span>
				<div className={navbarUserClass}>
					<div className={navbarUserAvatarClass}>

					</div>
					<div className={navbarUserInfoClass}>
						<span className={navbarUserInfoName}>
							FirstName LastName
						</span>
						<span className={navbarUserInfoEmail}>
							email@mail.com
						</span>
						<span className={navbarUserInfoRole}>
							{ isAdmin ? "Admin" : "User" }
						</span>
					</div>
				</div>
			</>
			) : null}
			<div className={navbarDividerClass}></div>
			<div className={menuClass}>
				<ul className={menuListClass}>
					{isConnected ? (
						<li className={menuItemClass}>
							<button
								onClick={() => {
									deleteCookies();
									dispatch(logout());
								}}
							>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
								Logout
							</button>
						</li>
					) : (
						<li className={menuItemClass}>
							<Link to="/login">
								<FontAwesomeIcon icon={faArrowRightToBracket} />
								Login
							</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
