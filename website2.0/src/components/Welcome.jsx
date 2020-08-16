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
import projects from "./content";

import "../styles/Welcome.css";

const l = preprocessIconData(iconDatas);

const Project = (data) => (
  <div class="project">
    {data.image ? (
      <img src={`/${data.image}`} class="project-image" />
    ) : (
      <div className="project-image-replacement">{data.title}</div>
    )}
    <div class="project-description">
      <div class="project-title">
        <h2>{data.title}</h2>
        {data.interactions.map(({ type, href }) => (
          <a target="_blank" href={href}>
            {type === "GITHUB"
              ? "[Github repository]"
              : type === "DEMO"
              ? "[See it live]"
              : "<unknown>"}
          </a>
        ))}
      </div>
      <div class="project-subtitle">
        <h3>{data.short}</h3>
      </div>
      <div class="project-body">
        {data.content.map((p) => (
          <p>{p}</p>
        ))}
        <p>
          <strong>Relevant Topics: </strong> {data.relevantTopics.join(", ")}
        </p>
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
      <div class="projects">
        <h1 id="web-projects">Web Projects</h1>
        {projects.map((data) => (
          <Project {...data} />
        ))}
      </div>
    </>
  );
};

export default Welcome;
