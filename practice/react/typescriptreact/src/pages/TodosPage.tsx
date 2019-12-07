import React, { useState, useEffect } from "react";

import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { ITodo } from "../intefaces";

declare var confirm: (question: string) => boolean;

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const parse = localStorage.getItem("todos") || "[]";
    const saved = JSON.parse(parse) as ITodo[];

    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false
    };
    // setTodos([newTodo, ...todos]);
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleHandler = (id: number) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  };

  const removeHandler = (id: number) => {
    const shoudRemove = confirm("Вы уверены?");

    if (shoudRemove) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  };

  return (
    <>
      <TodoForm onAdd={addHandler} />

      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </>
  );
};
