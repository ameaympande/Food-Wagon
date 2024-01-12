
import React from "react";

const Button = ({
  onClick,
  buttonText,
  userIcon: UserIcon,
  color = "grey",
  size = 20,
  textColor = "slate-500",
  style,
  textStyle = "ml-4",
}) => {
  return (
    <button
      onClick={onClick}
      className={`shadow-2xl border-red flex flex-row bg-bg-primary text-${textColor} py-2 px-2 rounded-md hover:bg-bg-hover-primary font-semibold ${style}`}
    >
      {UserIcon && <UserIcon size={size} color={color} />}
      <span className={textStyle}>{buttonText}</span>
    </button>
  );
};

export default Button;
