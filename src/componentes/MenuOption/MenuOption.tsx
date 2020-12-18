import React from "react";
import "./MenuOption.css";

function MenuOption(props : any) : JSX.Element{
  return (
    <li>
      <p className="item-menu">
        {props.children}
      </p>
    </li>
  );
}

export default MenuOption
