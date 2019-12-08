import React from "react";
import { useHistory } from "react-router-dom";

export const AboutPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <h1>Страница информации</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus est
        recusandae numquam unde non. Odit praesentium accusamus mollitia
        expedita, laboriosam, assumenda eaque tempora atque quo perspiciatis
        omnis dicta facilis ducimus!
      </p>
      <button className="btn" onClick={() => history.push("/")}>
        Обратно к списку дела
      </button>
    </>
  );
};
