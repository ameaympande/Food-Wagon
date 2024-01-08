import React from "react";

const Title = ({ text, textColor = "slate-500", style }) => {
  return (
    <div
      className={`flex items-center bg-bg-hover-primary text-${textColor} px-4 py-2 rounded-xl shadow-2xl ${style}`}
    >
      <span className="text-xl font-semibold text-secondary">{text}</span>
    </div>
  );
};

export default Title;
