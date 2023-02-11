const G = 6.6743 * 10 ** -12

const sun = {
    mass: 1.989 * (10 ** 30),
    x: 300,
    y: 300,
    b: 300,
    mu: G * 1.989 * (10 ** 30)
}

function angularVisVeva(Sun, r, a, b) {
    mu = Sun.mu
    T = 2 * Math.PI * Math.sqrt(a ** 3 / mu)
    thetadot = (2 * Math.PI * a * b) / (T / 2 * r ** 2)
    return thetadot * 10 ** -8
}

function orbit(x) {
    // focus = sun.x, sun.y
    x_foci = sun.x
    y_foci = sun.y
    ellipse_a = Math.sqrt((x_foci - x) ** 2 + sun.b ** 2)
    return {
        x: (ellipse_a + sun.x) / 2,
        y: sun.y,
        a: ellipse_a,
        b: sun.b,
        x_foci: x_foci,
        y_foci: y_foci
    }
}

function planet(t, orbit) {
    planetx = orbit.x + orbit.a / 2 * Math.cos(t)
    planety = orbit.y + orbit.b / 2 * Math.sin(t)
    line(planetx, planety, sun.x, sun.y)
    planetr = Math.sqrt(((planetx - sun.x) ** 2) + ((planety - sun.y) ** 2))
    return {
        x: planetx,
        y: planety,
        r: planetr,
    }
}

const orbit1 = orbit(Math.random() * 750)

var t;
function setup() {
    createCanvas(1000, 600);
    textSize(16);
    t = 0
}



function draw() {
    background(200)
    ellipse(orbit1.x, orbit1.y, orbit1.a, orbit1.b)
    circle(sun.x, sun.y, (sun.mass * (10 ** -28)) / 2)
    planet1 = planet(t, orbit1)
    circle(planet1.x, planet1.y, 20)
    omega = angularVisVeva(sun, planet1.r, orbit1.a, orbit1.b)
    t = t + omega

}