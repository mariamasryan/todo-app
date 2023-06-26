import React, { useEffect } from "react";
import { TodoPage } from "./pages/todoPage";
import styles from "./styles.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <TodoPage />
    </div>
  );
};
