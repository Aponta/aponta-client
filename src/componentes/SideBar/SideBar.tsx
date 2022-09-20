import React from 'react';
import "./SideBar.css";
//import logo from "../../img/logo.png";

function SideBar(props : any) : JSX.Element {
  return (
    <div className="inSideBar">
      {/* eslint-disable-next-line */}
      <a href="#main-menu" id="main-menu-toggle" className="menu-toggle">
        <span className="fa fa-bars" aria-hidden="true"></span>
      </a>

      <nav id="main-menu" className="main-menu">
        <ul>
          {props.children}
        </ul>
      </nav>
      <a
        href="#main-menu-toggle"
        className="backdrop"
        aria-hidden="true"
      ></a>
    </div>
  );
}

export default SideBar;
