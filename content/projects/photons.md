---
title: Volumetric Renderer
category: computerGraphics
screen1: "../assets/screens/PhotonMappingScreen1.png"
screen2: "../assets/screens/PhotonMappingScreen2.png"
interactions:
  - type: GITHUB
    href: https://github.com/neevparikh/rpt/tree/volumetric-photon-mapping
short: A volumetric renderer in Rust implementing state-of-the-art photon mapping algorithms
relevantTopics:
  - Rendering
  - Volumetric Photon Mapping
  - Beam Estimate
  - Rust
---
A global illumination renderer that uses volumetric photon mapping to render physically accurate participating media such as fog and mist. A variety of volumetric photon mapping algorithms are implemented, from the original algorithm published in 1998 up to [recent work using lower-dimensional blurs](http://graphics.ucsd.edu/~henrik/papers/volumetric_radiance_using_photon_points_and_beams.pdf).
