import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { setViewType ,} from "../../features/todoSlice";

export const Aside = () => {
	const dispatch = useDispatch();
	const todosAllData = useSelector(({ todo }) => todo.todosAllData);
	const todosData = useSelector(({ todo }) => todo.todosData);
	const viewType = useSelector(({ todo }) => todo.viewType);
	const todosLoading = useSelector(({ todo }) => todo.todosLoading);

	const [toggleType, setToggleType] = useState(viewType);

	useEffect(() => {
		setTimeout(()=>dispatch(setViewType(toggleType)))
	}, [toggleType]);

	return (
		<div className={styles.container}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.titleText}>To Do App</h1>
			</div>
			<div className={styles.toggleWrapper}>

				<span
					className={`${styles.toggleBtn} ${toggleType === "completed" && styles.activeBtn}`}
					onClick={() => setToggleType("completed")}
				>
					Completed {todosData?.filter(item=>item.completed).length} 
				</span>

				<span
					className={`${styles.toggleBtn} ${toggleType === "pending" && styles.activeBtn}`}
					onClick={() => setToggleType("pending")}
				>
					In progress {todosData?.filter(item=>!item.completed).length}
				</span>

				<span
					className={`${styles.toggleBtn} ${toggleType === "all" && styles.activeBtn}`}
					onClick={() => {
						setToggleType("all");
					}}
				>
					All {todosData?.length}
				</span>
			</div>
			<div className={styles.footerWrapper}>
				<span className={styles.footerText}>
					Copyright &copy; {new Date().getFullYear()}
				</span>
			</div>
		</div>
	);
};
