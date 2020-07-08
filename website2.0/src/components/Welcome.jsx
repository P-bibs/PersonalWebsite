import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import Anime from "react-anime";
import { iconDatas } from "../util/data.js";
import {
  preprocessIconData,
  animateIcons,
  animateSubtitle,
} from "../util/iconPointUtilities";

import "../styles/Welcome.css";

const l = preprocessIconData(iconDatas);

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
    <div className="welcome-root">
      <div className="name">
        <img
          className="portrait"
          src="https://paulbiberstein.me/resources/portrait.jpg"
        />
        <div>Paul Biberstein</div>
      </div>
      <hr />
      <div className="icons" ref={canvasRef}>
        {!(adjustedIconData && iconAnimeProps && subtitleAnimeProps)
          ? ""
          : Object.keys(iconAnimeProps).map((iconName, i) =>
              iconAnimeProps[iconName].map((props, j) => (
                <Anime {...props} key={`${iconName} ${j}`}>
                  <div className={`dot ${iconName}`} />
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
        <div className="subtitle">
          <a href="/projects#web">Web</a>,{" "}
          <a href="/projects#hardware">hardware</a>, and{" "}
          <a href="/projects#acoustic">acoustic</a> projects.
        </div>
      </Anime>
      <hr />
      <div className="education">Student at Brown University</div>
      <hr />
      <div className="external-links">
        <a
          className="icon-link invert"
          href="https://github.com/p-bibs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src="https://paulbiberstein.me/resources/githubicon.png"
          />
        </a>
        <a
          className="icon-link"
          href="https://linkedin.com/in/paulbib/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src="https://paulbiberstein.me/resources/linkedinicon.png"
          />
        </a>
      </div>
    </div>
  );
};

export default Welcome;
