import setupAnimations from "./animations.js"

function scrollToAnchor(anchorString) {
  console.log(`Scrolling to ${anchorString}`)
  const anchors = ["web-projects", "hardware-projects", "acoustic-projects"]

  if (anchors.includes(anchorString)) {
    window.scrollTo({
      top: document.getElementById(`${anchorString}`).getBoundingClientRect().top,
      behavior: "smooth"
    })
  }
}

function main() {
  setupAnimations();
}

window.main = main
window.scrollToAnchor = scrollToAnchor