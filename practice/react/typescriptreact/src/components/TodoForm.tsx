import React from "react";

export const TodoForm: React.FC = () => {
  return (
    <div className="input-field mt2">
      <input type="text" id="title" placeholder="Введите название дела" />
      <label htmlFor="title" className="active">
        Введите название дела
      </label>
    </div>
  );
};
