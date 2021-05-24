import React from "react";
import ReactMarkdown from "react-markdown";

const Project = (data) => (
  <div className="w-full p-4 rounded shadow bg-white space-x-4 flex flex-col lg:flex-row items-center">
    <div className="w-full h-48 lg:w-4/12 lg:h-64 relative flex items-center justify-center">
      <div className="cube-image-container">
        {/* <img
              alt={`${data.title} image 1`}
              className="project-screen top-0 left-0"
              src={require(`../assets/screens/${data.screen}Screen1.png?webp`)}
            />
            <img
              alt={`${data.title} image 2`}
              className="project-screen bottom-0 right-0"
              src={require(`../assets/screens/${data.screen}Screen2.png?webp`)}
            /> */}
        <div
          className="cube-image"
          style={{ animationDelay: `${data.index * 300}ms` }}
        >
          <div className="cube-image-face cube-front">
            {data.screen ? (
              <img
                alt={`${data.title} image 1`}
                className="w-full h-full object-fill"
                src={require(`../assets/screens/${data.screen}Screen1.png?webp`)}
              />
            ) : (
              <div className="w-full h-full text-center text-2xl bg-gray-400 flex flex-col items-center justify-center">
                {data.title}
              </div>
            )}
          </div>
          <div className="cube-image-face cube-back">
            {data.screen ? (
              <img
                alt={`${data.title} image 2`}
                className="w-full h-full object-fill"
                src={require(`../assets/screens/${data.screen}Screen2.png?webp`)}
              />
            ) : (
              <div className="w-full h-full text-center text-2xl bg-gray-400 flex flex-col items-center justify-center">
                {data.title}
              </div>
            )}
          </div>
          <div className="cube-image-side cube-right"></div>
          <div className="cube-image-side cube-left"></div>
          <div className="cube-image-side cube-top"></div>
          <div className="cube-image-side cube-bottom"></div>
        </div>
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
              <a
                className="no-underline"
                rel="noreferrer"
                target="_blank"
                href={href}
              >
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
