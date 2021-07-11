import Head from "next/head";
import React, { useCallback, useState, useEffect } from "react";
import Project from "../components/Project";
import projects from "../content/projects";
import { iconDatas } from "../util/data.js";
import {
  preprocessIconData,
  makeCoordinateSpread,
  centerIconData,
} from "../util/iconPointUtilities";
import { initializeAnimation, SCALE } from "../util/animate";
import smoothscroll from "smoothscroll-polyfill";

const adjustedIconData = preprocessIconData(iconDatas);

const Welcome = () => {
  useEffect(() => {
    // Trigger smooth scroll polyfill on initial load
    smoothscroll.polyfill();
  });

  const [canvasHeight, setCanvasHeight] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  // Set the width/height of the canvas once its container has loaded
  const canvasRef = useCallback((node) => {
    if (node !== null) {
      setCanvasHeight(node.getBoundingClientRect().height);
      setCanvasWidth(node.getBoundingClientRect().width);
    }
  }, []);

  // Once the canvas has been created and sized, we can start the animation cycle
  useEffect(() => {
    if (canvasWidth && canvasHeight) {
      const startCoordinates = makeCoordinateSpread(
        40,
        400,
        canvasWidth,
        canvasHeight
      );
      centerIconData(adjustedIconData, canvasWidth, canvasHeight);
      initializeAnimation(startCoordinates, adjustedIconData);
    }
  }, [canvasWidth, canvasHeight]);

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
        document
          .getElementById(anchorString)
          .scrollIntoView({ behavior: "smooth" });
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
        <div className="w-1/2 flex-grow flex flex-col items-center justify-center">
          <div className="flex flex-row justify-center items-center">
            <img
              alt="Portrait of Paul Biberstein"
              className="w-16 h-16 rounded-full mr-2"
              src={require("../assets/portrait.jpg")}
            />
            <div>Paul Biberstein</div>
          </div>
          <hr className="w-full" />
          <div className="flex flex-row items-center justify-center">
            <div id="icons" className="w-64 h-64 m-3" ref={canvasRef}>
              {canvasHeight && canvasWidth ? (
                <canvas
                  id="canvas"
                  height={canvasHeight * SCALE}
                  width={canvasWidth * SCALE}
                  className="w-full h-full"
                />
              ) : (
                ""
              )}
            </div>
            <div
              id="welcome-subtitle"
              className="welcome-subtitle welcome-link-section w-1/3 flex-grow"
            >
              I'm an undergraduate at Brown University interested in{" "}
              <a
                className="welcome-link"
                onClick={() => scrollToAnchor("Hardware-projects")}
              >
                programming language
              </a>{" "}
              and compiler design, as well as CS education. In my free time, I
              like exploring applications of CS to{" "}
              <a
                className="welcome-link"
                onClick={() => scrollToAnchor("Hardware-projects")}
              >
                music
              </a>
              , including computer music compositions and computational
              musicology.
              <br />
              You can find more about me below, as well as some past projects
              spanning all the topics above as well as{" "}
              <a
                className="welcome-link"
                onClick={() => scrollToAnchor("Hardware-projects")}
              >
                hardware
              </a>{" "}
              and{" "}
              <a
                className="welcome-link"
                onClick={() => scrollToAnchor("Web-projects")}
              >
                web development
              </a>
              .
            </div>
          </div>
          <hr className="w-full" />
          <div className="flex flex-row">
            <a
              className="text-black"
              href="https://github.com/p-bibs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Paul Biberstein's Github"
                className="w-6 h-6 m-3"
                src={require("../assets/githubicon.png")}
              />
            </a>
            <a
              className="text-black"
              href="https://linkedin.com/in/paulbib/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Paul Biberstein's LinkedIn"
                className="w-6 h-6 m-3"
                src={require("../assets/linkedinicon.png")}
              />
            </a>
          </div>
          <hr className="w-full" />
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
            <h2 id={`${key}-projects`} className="text-center my-2 text-3xl">
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
