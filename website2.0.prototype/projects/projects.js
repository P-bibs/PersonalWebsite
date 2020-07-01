function main() {
  const location = window.location.hash.substr(1);

  const anchors = ["web", "hardware", "acoustic"]

  if (anchors.includes(location)) {
    window.scrollTo({
      top: document.getElementById(`${location}-projects`).getBoundingClientRect().top,
      behavior: "smooth"
    })
  }
}

window.main = main