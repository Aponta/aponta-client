import React from "react";
import "./SideBar.css";
//import logo from "../../img/logo.png";

export default function SideBar(props : any) {
  return (
    <div className="inSideBar">
      <a href="#main-menu" id="main-menu-toggle" className="menu-toggle">
        <span className="fa fa-bars" aria-hidden="true"></span>
      </a>

      <nav id="main-menu" className="main-menu">
        <ul>
          <li id="main-menu-close">
            <a href="#main-menu-toggle" className="menu-close">
              <span className="fa fa-close close-sidebar" aria-hidden="true"></span>
            </a>
          </li>
          {/* <li>
            <div className="container-logo">
              <img src={logo} className="rounded img-logo" />
            </div>
          </li> */}
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
