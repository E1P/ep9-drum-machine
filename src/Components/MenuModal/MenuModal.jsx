import React from "react";
import "./MenuModal.css";

const MenuModal = ({ visible }) => {
  return (
    <div className={`modal-container ${visible ? "" : "hidden"}`}>
      <p>Instructions</p>
    </div>
  );
};

export default MenuModal;
