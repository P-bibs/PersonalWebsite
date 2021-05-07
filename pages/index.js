import Head from "next/head";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import Anime from "react-anime";
import Project from "../components/Project";
import projects from "../content/projects";
import { iconDatas } from "../util/data.js";
import {
  animateIcons,
  animateSubtitle,
  preprocessIconData,
} from "../util/iconPointUtilities";

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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollToAnchor = (anchorString) => {
    if (mounted) {
      const anchors = [
        "Web-projects",
        "Hardware-projects",
        "Acoustic-projects",
      ];

      if (anchors.includes(anchorString)) {
        window.scrollTo({
          top: document.getElementById(anchorString).getBoundingClientRect()
            .top,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Paul Biberstein</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen m-0 p-0 flex flex-col justify-center items-center content-center">
        <div className="w-full flex-grow flex flex-col items-center justify-center">
          <div className="flex flex-row justify-center items-center">
            <img className="w-16 h-16 rounded-full mr-2" src="portrait.jpg" />
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
              <a href="#" onClick={() => scrollToAnchor("Web-projects")}>
                Web
              </a>
              ,{" "}
              <a href="#" onClick={() => scrollToAnchor("Hardware-projects")}>
                hardware
              </a>
              , and{" "}
              <a href="#" onClick={() => scrollToAnchor("Acoustic-projects")}>
                acoustic
              </a>{" "}
              projects.
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
        <div className="w-full mb-8 text-center">
          <div
            className="scroll-arrow"
            onClick={() => scrollToAnchor(`Web-projects`)}
          ></div>
        </div>
      </div>
      <div className="w-full pb-8 bg-gray-300 flex flex-col items-center">
        {Object.keys(projects).map((key) => (
          <>
            <h2 id={`${key}-projects`} className="text-center">
              {key} Projects
            </h2>
            <div className="w-full lg:w-5/6 px-4 space-y-4">
              {projects[key].map((data) => (
                <Project key={data.title} {...data} />
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Welcome;