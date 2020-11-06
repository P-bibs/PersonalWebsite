import React from "react";
import ReactMarkdown from "react-markdown";

const Project = (data) => (
  <div className="w-full p-4 rounded shadow bg-white space-x-4 flex flex-col lg:flex-row items-center">
    <div className="w-full h-48 lg:w-4/12 lg:h-64 relative">
      <div className="w-full h-full relative">
        {data.screen ? (
          <div className="w-full h-full relative">
            <img
              className="project-screen top-0 left-0"
              src={`/screens/${data.screen}Screen1.png`}
            />
            <img
              className="project-screen bottom-0 right-0"
              src={`/screens/${data.screen}Screen2.png`}
            />
          </div>
        ) : (
          <div className="w-full h-full text-center text-2xl bg-gray-400 rounded flex flex-col items-center justify-center">
            {data.title}
          </div>
        )}
      </div>
    </div>
    <div className="lg:w-px flex-grow flex flex-col">
      <div className=" flex flex-row flex-wrap items-center">
        <h2 className="mr-2">{data.title}</h2>
        <div className="h-full space-x-2 flex flex-row flex-wrap justify-center">
          {data.interactions.map(({ type, href }) => (
            <span
              key={href}
              className="px-3 py-1 rounded-full font-semibold text-sm text-gray-700 bg-gray-200 hover:bg-gray-400 cursor-pointer"
            >
              <a className="no-underline" target="_blank" href={href}>
                {type === "GITHUB"
                  ? "Github"
                  : type === "DEMO"
                  ? "See it live"
                  : type === "DOCUMENTATION"
                  ? "Documentation"
                  : type == "PYPI"
                  ? "Install from PYPI"
                  : "<unknown>"}
              </a>
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3>{data.short}</h3>
      </div>
      <div>
        {data.content.map((p) => (
          <ReactMarkdown key={p} source={p} />
        ))}
        <div className="mt-2">
          <strong>Relevant Topics: </strong> {data.relevantTopics.join(", ")}
        </div>
      </div>
    </div>
  </div>
);

export default Project;
