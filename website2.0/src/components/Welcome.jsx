import React, { useCallback, useMemo, useState } from "react";
import Anime from "react-anime";
import { iconDatas } from "../util/data.js";
import {
  animateIcons,
  animateSubtitle,
  preprocessIconData,
} from "../util/iconPointUtilities";
import projects from "./content";
import Project from "./Project";

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
      <div className="w-full bg-gray-300 flex flex-col items-center">
        {Object.keys(projects).map((key) => (
          <>
            <h2 className="text-center">{key} Projects</h2>
            <div className="w-full lg:w-5/6 px-4 space-y-4">
              {projects[key].map((data) => (
                <Project {...data} />
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Welcome;
