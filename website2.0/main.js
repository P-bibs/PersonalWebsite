import {icon_datas} from './data.js'

// Icon arrangement parameters
const iconAngularDifference = (2*Math.PI)/3

// animation parameters
const iconAnimInitialDelay = 300
const iconAnimSubsequentDelay = 500
const iconAnimDuration = 1000
const subtitleInitialDelay = 2300
const subtitleDuration = 2000

function preprocessIconData() {
    //Remove half of coordinates and scale down
    for (const key in icon_datas) {
        if (icon_datas.hasOwnProperty(key)) {
            let icon_data = icon_datas[key];
            icon_data.coordinates = icon_data.coordinates.filter((v,i) => i % icon_data.sparsify_factor == 0)   
            icon_data.coordinates = icon_data.coordinates.map((x) => [x[0] * icon_data.scale_factor, x[1] * icon_data.scale_factor])     
        }
    }

    // Normalize Coordinates to be centered at 0
    for (const icon_name in icon_datas) {
        if (icon_datas.hasOwnProperty(icon_name)) {
            const icon_data = icon_datas[icon_name];

            let xCoords = icon_data.coordinates.map(x => x[0])
            let yCoords = icon_data.coordinates.map(x => x[1])
            let xRange = [Math.min(...xCoords), Math.max(...xCoords)]
            let yRange = [Math.min(...yCoords), Math.max(...yCoords)]
            let width = xRange[1] - xRange[0]
            let height = yRange[1] - yRange[0]

            // Ensure minimum value on both axis is 0
            icon_data.coordinates = icon_data.coordinates.map(coordinate => {
                return [coordinate[0] - xRange[0], coordinate[1] - yRange[0]]
            });

            // Center on 0
            icon_data.coordinates = icon_data.coordinates.map(coordinate => {
                return [coordinate[0] - width/2, coordinate[1] - height/2]
            })
        }
    }
}


function animateIcons() {
    preprocessIconData()

    let canvas = document.getElementsByClassName("icons")[0]

    let canvasCenter = [canvas.clientWidth / 2, canvas.clientHeight / 2]

    let iconSpreadRadius = canvas.clientHeight * (1/2.68)

    // Define random cluster of starting points
    const startingRadius = 50
    const numPointInCluster = 400;
    let startingCoordinates = []
    for (let i = 0; i < numPointInCluster; i++) {
        let r = Math.random() * startingRadius
        let t = Math.random() * 2*Math.PI
        startingCoordinates.push([r*Math.cos(t) + canvasCenter[0], r*Math.sin(t) + canvasCenter[1]])
    }

    let j = 0
    for (const icon_name in icon_datas) {
        if (icon_datas.hasOwnProperty(icon_name)) {
            const icon_data = icon_datas[icon_name];

            let angle = (Math.PI * 7 / 6) - j*iconAngularDifference
            let canvasLoc = [iconSpreadRadius * Math.cos(angle), iconSpreadRadius * -Math.sin(angle)]

            for (let i = 0; i < icon_data.coordinates.length; i++) {
                let [startX, startY] = startingCoordinates[Math.floor(Math.random() * startingCoordinates.length)]

                let elem = document.createElement("div")
                elem.className = `dot ${icon_name}`
                canvas.appendChild(elem)

                let fromx = startX
                let tox = icon_data.coordinates[i][0] + canvasCenter[0] + canvasLoc[0]
                let fromy = startY
                let toy = icon_data.coordinates[i][1] + canvasCenter[1] + canvasLoc[1]

                anime({
                    targets: elem,
                    translateX: [fromx, tox],
                    translateY: [fromy, toy],
                    // opacity: [fromOpacity, toOpacity],
                    easing: 'easeOutQuint',
                    delay: iconAnimInitialDelay + j * iconAnimSubsequentDelay,
                    duration: iconAnimDuration
                });
            }
            j++;
        }
    }
}

function animateSubtitle() {
    let subtitle = document.getElementsByClassName("subtitle")[0]
    anime({
        targets: subtitle,
        opacity: [0, 1],
        duration: subtitleDuration,
        delay: subtitleInitialDelay,
        easing: 'easeOutCubic'
    })
}

function main() {
    animateIcons()
    animateSubtitle()
}

window.main = main