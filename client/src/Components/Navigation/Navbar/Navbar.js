import "./Navbar.scss";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
	const { isConnected } = useSelector((state) => state.auth);

	const classComponent = "navbar-container";
	const logoClass = `${classComponent}__logo`;
	const menuClass = `${classComponent}__menu`;
	const menuListClass = `${menuClass}__list`;
	const menuItemClass = `${menuListClass}__item`;

	return (
		<nav className={classComponent}>
			<div className={logoClass}>
				<a href="/">
					<img src="/images/logo.png" alt="logo" />
				</a>
			</div>
			<div className={menuClass}>
				<ul className={menuListClass}>
					<li className={menuItemClass}>
						<a href="/">Home</a>
					</li>
					<li className={menuItemClass}>
						<a href="/">About</a>
					</li>
					<li className={menuItemClass}>
						<a href="/">Contact</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
