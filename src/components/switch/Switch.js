import React from "react";
import "./Switch.css";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

function Switch({ checked }) {
  return (
    <div className="toggle">
      {!checked ? (
        <div className="toggle-bg-left">
          <div className="toggle-left">
            <IoIosClose className="close-icon" />
          </div>
        </div>
      ) : (
        <div className="toggle-bg-right">
          <div className="toggle-right">
            <IoIosCheckmark className="checkmark-icon" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Switch;