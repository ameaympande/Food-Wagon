import React from "react";
import Button from "./Button";
import Title from "./Title"; // Assuming it's Title, not Tittle

const WorkCard = ({ backgroundImage, title, content }) => {
  return (
    <div className="mr-2 flex flex-col items-center">
      <div className="flex">
        <div>
          <img src={backgroundImage} alt="" />
        </div>
      </div>

      <div className="flex flex-col mt-3 text-center p-4 text-wrap">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p
          className="max-w-18 whitespace-pre-line text-slate-600"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
    </div>
  );
};

export default WorkCard;
