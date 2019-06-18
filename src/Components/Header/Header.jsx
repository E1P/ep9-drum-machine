import React from "react";
import "./Header.css";
import MenuToggle from "../MenuToggle/MenuToggle";

const Header = ({ handleMenuToggle, visible }) => {
  return (
    <div className="header-container">
      <header className="header">EP-9 Drum Machine</header>
      <MenuToggle handleMenuToggle={handleMenuToggle} visible={visible} />
    </div>
  );
};

export default Header;
