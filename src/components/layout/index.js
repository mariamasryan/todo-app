import React from "react";
import {Aside} from '../aside'
import styles from "./styles.module.css";

export const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<Aside />
			<div className={styles.content}>{children}</div>
		</div>
	);
};
