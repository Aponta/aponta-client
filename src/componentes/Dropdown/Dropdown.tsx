import React from 'react'
import "./Dropdown.css";

function Dropdown(props : any) : JSX.Element {

   


    return (
        <>
        <div className={props.cor + " dropdown"}>
            <span>
                <i className="fa fa-caret-down"></i>
            </span>
            <div className="dropdown-content">
                {props.children}
            </div>
        </div>
      </>
    )
}

export default Dropdown;
