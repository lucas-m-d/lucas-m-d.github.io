const G = 6.6743 * 10 ** -12


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
} // from mozilla page

const b = getRandomArbitrary(200, 400)

const Sun = {
    mass: 1.989 * (10 ** 30),
    x: 300,
    y: 300,
    b: 450,
    mu: G * 1.989 * (10 ** 30)
}

function angularVisVeva(sun, r, a, b) {
    mu = sun.mu
    T = 2 * Math.PI * Math.sqrt(a ** 3 / mu)
    thetadot = (2 * Math.PI * a * b) / (T / 2 * r ** 2)
    return thetadot * 10 ** -8
}

function orbit(x) {
    // focus = sun.x, sun.y
    x_foci = Sun.x
    y_foci = Sun.y
    ellipse_a = Math.sqrt((x_foci - x) ** 2 + Sun.b ** 2)
    return {
        x: (ellipse_a + Sun.x) / 2,
        y: Sun.y,
        a: ellipse_a,
        b: Sun.b,
        x_foci: x_foci,
        y_foci: y_foci
    }
}

function planet(t, orbit) {
    planetx = orbit.x + orbit.a / 2 * Math.cos(t)
    planety = orbit.y + orbit.b / 2 * Math.sin(t)
    stroke("grey")
    strokeWeight(4)
    line(planetx, planety, Sun.x, Sun.y)
    strokeWeight(1)
    planetr = Math.sqrt(((planetx - Sun.x) ** 2) + ((planety - Sun.y) ** 2))
    return {
        x: planetx,
        y: planety,
        r: planetr,
    }
}

const orbit1 = orbit(getRandomArbitrary(300, 750))

var t;
function setup() {
    createCanvas(1000, 600);
    textSize(16);
    t = 0
}


function draw() {
    background(0)
    color('white')
    ellipse(orbit1.x, orbit1.y, orbit1.a, orbit1.b)
    fill("yellow")
    circle(Sun.x, Sun.y, (Sun.mass * (10 ** -28)) / 2)
    fill("green")
    planet1 = planet(t, orbit1)
    circle(planet1.x, planet1.y, 20)
    noFill()
    omega = angularVisVeva(Sun, planet1.r, orbit1.a, orbit1.b)
    t = t + omega


}