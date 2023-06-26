import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getData,
  deleteTodo,
  updateTodo,
  addTodo,
  setCompletedTodo,
} from "../../features/todoSlice";

import { Todo } from "../../components/todo";
import { Layout } from "../../components/layout";
import { FloatingButton } from "../../components/floatingButton";

import styles from "./styles.module.css";

export const TodoPage = () => {
  const dispatch = useDispatch();
  const todosData = useSelector(({ todo }) => todo.todosData);
  const todosLoading = useSelector(({ todo }) => todo.todosLoading);
  const todosError = useSelector(({ todo }) => todo.todosError);
  const [selectedTodoId, setSelectedTodoId] = useState();
  const [isAddActive, setIsAddActive] = useState(false);

  useMemo(() => {
    dispatch(getData());
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        {todosData &&
          !todosError &&
          todosData.map((item) => {
            return (
              <Todo
                key={item.id}
                todoText={item.title}
                title={item.completed ? "Completed" : "In Progress"}
                onUpdate={() => {
                  dispatch(updateTodo(item));
                  setSelectedTodoId(item.id);
                }}
                onDelete={() => dispatch(deleteTodo(item.id))}
                isLoading={item.id === selectedTodoId && todosLoading}
                onComplete={() => {
                  dispatch(setCompletedTodo(item.id));
                }}
              />
            );
          })}
        {isAddActive && (
          <Todo
            key={"new"}
            todoText={"do awesome work"}
            title="In Progress"
            onUpdate={() => {
              dispatch(addTodo("do awesome work")).then(() => {
                setIsAddActive(false);
              });
            }}
            isFocused={true}
            isLoading={todosLoading}
            onDelete={() => setIsAddActive(false)}
          />
        )}
      </div>
      <div className={styles.floatingButtonWrapper}>
        <FloatingButton onPress={() => setIsAddActive(true)} />
      </div>
    </Layout>
  );
};
