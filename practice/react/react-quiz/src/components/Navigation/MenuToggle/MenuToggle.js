import React from "react";
import "./MenuToggle.css";

const MenuToggle = props => {
  const cls = [`MenuToggle`];
  if (props.isOpen) {
    cls.push(`open`);
  }

  return (
    <span className={cls.join(` `)} onClick={props.onToggle}>
      {props.isOpen ? `x` : `|||`}
    </span>
  );
};

export default MenuToggle;
