import React from "react";
import LoginPopup from "./LoginPopup/LoginPopup";
import Overlay from "./Overlay/Overlay";

export default function Modal({isOpen, onClose, onSubmit}) {
  const popup = isOpen ?
    <>
      <LoginPopup onClose={onClose} onSubmit={onSubmit}/>
      <Overlay />
    </> :
    null;

  return popup;
}
