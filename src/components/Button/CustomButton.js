import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.scss";

const CustomButton = ({
  children,
  className,
  type,
  variant,
  shape,
  disabled,
  icon,
  onClick,
  fullWidth,
}) => {
  // const btnClasses = classNames("custom-button", className, {
  //   "custom-button--filled": variant === "filled",
  //   "custom-button--unfilled": variant === "unfilled",
  //   "custom-button--rounded": shape === "rounded",
  //   "custom-button--square": shape === "square",
  //   "custom-button--disabled": disabled,
  //   "custom-button--full-width": fullWidth,
  // });

  const buttonClassNames = classNames(styles["custom-button"], className, {
    [styles["custom-button--disabled"]]: disabled,
    [styles["custom-button--unfilled"]]: variant === "unfilled",
    [styles["custom-button--filled"]]: variant === "filled",
    [styles["custom-button--rounded"]]: shape === "rounded",
    [styles["custom-button--square"]]: shape === "square",
    [styles["custom-button--full-width"]]: fullWidth,
  });

  const iconClasses = classNames(styles["custom-button__icon"], {
    [styles["custom-button__icon--left"]]: icon && icon.position === "left",
    [styles["custom-button__icon--right"]]: icon && icon.position === "right",
  });

  return (
    <button
      className={buttonClassNames}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && icon.position === "left" && (
        <span className={iconClasses}>{icon.component}</span>
      )}
      {children}
      {icon && icon.position === "right" && (
        <span className={iconClasses}>{icon.component}</span>
      )}
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["filled", "unfilled"]),
  shape: PropTypes.oneOf(["rounded", "square"]),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.shape({
    position: PropTypes.oneOf(["left", "right"]),
    component: PropTypes.element.isRequired,
  }),
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
};

CustomButton.defaultProps = {
  className: "",
  type: "button",
  variant: "unfilled",
  shape: "rounded",
  disabled: false,
  icon: null,
  onClick: () => {},
  fullWidth: false,
};

export default CustomButton;
