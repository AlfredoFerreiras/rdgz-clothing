import React from "react";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

// Function to determine if the device is a phone based on screen width
const isPhone = () => window.innerWidth <= 768;

const Button = ({ children, buttonType, ...otherProps }) => {
  // Determine the button text based on buttonType and screen width
  let buttonText = children;
  if (buttonType === "google" && isPhone()) {
    buttonText = "Google Sign In";
  }

  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}>
      {buttonText}
    </button>
  );
};

export default Button;
