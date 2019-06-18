import React from "react";
import "./MenuToggle.css";
const MenuToggle = ({ handleMenuToggle, visible }) => {
  return (
    <div className="menu-container">
      <div className="toggle-box" onClick={handleMenuToggle}>
        info
      </div>
    </div>
  );
};

export default MenuToggle;
