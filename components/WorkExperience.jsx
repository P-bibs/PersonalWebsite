import React from "react";
import ReactMarkdown from "react-markdown";

const WorkExperience = ({
  thumbnail,
  company,
  position,
  date,
  description,
  responsibilities,
  location,
}) => (
  <div className="w-full p-4 rounded shadow bg-white space-x-4 flex flex-col lg:flex-row">
    <div className="w-36 h-36 lg:w-32 lg:h-32 relative">
      <div className="w-full h-full relative">
        {thumbnail ? (
          <img
            alt={`${company} logo`}
            className="shadow-inner"
            src={require(`../assets/thumbnails/${thumbnail}`)}
          />
        ) : (
          <div className="w-full h-full text-center text-2xl bg-gray-400 rounded flex flex-col items-center justify-center">
            {company}
          </div>
        )}
      </div>
    </div>
    <div className="lg:w-px flex-grow flex flex-col">
      <div className=" flex flex-row flex-wrap items-center">
        <h4 className="mr-2 font-bold ">{position}</h4>
        <div className="text-gray-600">{location}</div>
        <div className="text-right flex-grow">{date}</div>
      </div>
      <div>
        <h4 className="font-light">{company}</h4>
      </div>
      <div>{description}</div>
      <div>
        <ReactMarkdown className="markdown">
          {responsibilities.join("\n")}
        </ReactMarkdown>
      </div>
    </div>
  </div>
);

export default WorkExperience;
