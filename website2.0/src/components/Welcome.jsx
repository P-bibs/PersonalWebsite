import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import Anime from "react-anime";
import ReactMarkdown from "react-markdown";
import { iconDatas } from "../util/data.js";
import {
  preprocessIconData,
  animateIcons,
  animateSubtitle,
} from "../util/iconPointUtilities";
import projects from "./content";

const l = preprocessIconData(iconDatas);

const Project = (data) => (
  <div class="lg:w-5/6 m-4 p-4 rounded shadow bg-white space-x-4 flex flex-col lg:flex-row items-center">
    <div className="w-2/5 h-64 relative">
      <div className="w-full h-full relative">
        {data.screen ? (
          <div className="w-full h-full relative">
            <img
              className="w-8/12 absolute shadow"
              src={`/screens/${data.screen}Screen1.png`}
            />
            <img
              className="w-8/12 absolute shadow"
              style={{ top: "100px", right: "0px" }}
              src={`/screens/${data.screen}Screen2.png`}
            />
          </div>
        ) : (
          <div className="w-full h-full text-center bg-gray-400 rounded flex flex-col items-center justify-center">
            {data.title}
          </div>
        )}
      </div>
      {/* <div className="w-full h-full absolute top-0 left-0 rounded text-white bg-gray-800 opacity-0 hover:opacity-50 flex flex-col items-center justify-center">
        {data.title}
      </div> */}
    </div>
    <div class="w-1/3 flex-grow flex flex-col">
      <div class="flex flex-row flex-wrap items-center">
        <h2>{data.title}</h2>
        <div className="ml-3 space-x-2">
          {data.interactions.map(({ type, href }) => (
            <span className="px-3 py-1 rounded-full font-semibold text-sm text-gray-700 bg-gray-200 hover:bg-gray-400 cursor-pointer">
              <a className="no-underline" target="_blank" href={href}>
                {type === "GITHUB"
                  ? "Github repository"
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
          <ReactMarkdown source={p} />
        ))}
        <div className="mt-2">
          <strong>Relevant Topics: </strong> {data.relevantTopics.join(", ")}
        </div>
      </div>
    </div>
  </div>
);

const Welcome = () => {
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const canvasRef = useCallback((node) => {
    if (node !== null) {
      setCanvasHeight(node.getBoundingClientRect().height);
      setCanvasWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const adjustedIconData = useMemo(() => preprocessIconData(iconDatas), []);
  const iconAnimeProps = useMemo(
    () => animateIcons(adjustedIconData, canvasWidth, canvasHeight),
    [adjustedIconData, canvasWidth, canvasHeight]
  );
  const subtitleAnimeProps = useMemo(() => animateSubtitle(), []);

  return (
    <>
      <div className="w-full h-screen m-0 p-0 flex flex-col justify-center items-center content-center">
        <div className="flex flex-row justify-center items-center">
          <img
            className="w-16 h-16 rounded-full mr-2"
            src="https://paulbiberstein.me/resources/portrait.jpg"
          />
          <div>Paul Biberstein</div>
        </div>
        <hr />
        <div id="icons" className="w-1/3 h-64 m-3" ref={canvasRef}>
          {!(adjustedIconData && iconAnimeProps && subtitleAnimeProps)
            ? ""
            : Object.keys(iconAnimeProps).map((iconName, i) =>
                iconAnimeProps[iconName].map((props, j) => (
                  <Anime {...props} key={`${iconName} ${j}`}>
                    <div
                      style={{ height: "2px", width: "2px" }}
                      className={`z-10 absolute bg-black rounded-full ${iconName}`}
                    />
                  </Anime>
                ))
              )}
        </div>
        {/* <div className="icons">
        {iconDatas.hardware.coordinates.map((coord, i) => {
          return (
            <div
              className="dot"
              key={i}
              style={{ transform: `translateX(${coord[0]}px) translateY(${coord[1]}px)` }}
            />
          );
        })}
      </div> */}
        <Anime {...subtitleAnimeProps}>
          <div className="text-center">
            <a href="/projects#web">Web</a>,{" "}
            <a href="/projects#hardware">hardware</a>, and{" "}
            <a href="/projects#acoustic">acoustic</a> projects.
          </div>
        </Anime>
        <hr />
        <div>Student at Brown University</div>
        <hr />
        <div className="flex flex-row">
          <a
            className="text-black"
            href="https://github.com/p-bibs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-6 h-6 m-3" src="/githubicon.png" />
          </a>
          <a
            className="text-black"
            href="https://linkedin.com/in/paulbib/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-6 h-6 m-3" src="/linkedinicon.png" />
          </a>
        </div>
      </div>
      <div class="w-full py-3 px-24 bg-gray-300 divide-y flex flex-col items-center">
        {Object.keys(projects).map((key) => (
          <>
            <h2>{key} Projects</h2>
            {projects[key].map((data) => (
              <Project {...data} />
            ))}
          </>
        ))}
      </div>
    </>
  );
};

export default Welcome;
