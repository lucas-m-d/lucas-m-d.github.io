const object1 = new CircleObject()
const object2 = new CircleObject()
// NOTE - THERE IS A DIFFERENT EQUATION FOR 2D MOMENTUM
// https://imada.sdu.dk/~rolf/Edu/DM815/E10/2dcollisions.pdf

const screen = {
    "x":600,
    "y":600
}

const circleCollide = (x1, x2, y1, y2, r1, r2) => {
  var dist = Math.sqrt((x2 - x1 ) ** 2 + (y2 - y1) ** 2);
  if (dist <= r1 + r2){
    return true;  
  } return false;
}

const elasticCollision1D = (m1, m2, v1, v2) => {
  var object2speed = ((2 * m1)/(m1 + m2)) * v1 - ((m1-m2)/(m1 + m2)) * v2
  var object1speed = ((m1-m2)/(m1 + m2)) * v1 + ((2 * m2)/(m1 + m2)) * v2 // http://hyperphysics.phy-astr.gsu.edu/hbase/elacol2.html#c3  
  return ({"v1":object1speed, "v2":object2speed})
}

const collision2d = ( m1, m2, p1, p2, v1, v2) => {
  const normal = p5.Vector.sub(p2, p1)  
  const unitNormal = p5.Vector.div(normal, normal.mag())
  const unitTan = createVector(-unitNormal.copy().y, unitNormal.copy().x) 
  let v1n = p5.Vector.dot(unitNormal, v1)
  let v1t = p5.Vector.dot(unitTan, v1) 
  let v2n = p5.Vector.dot(unitNormal, v2)
  let v2t = p5.Vector.dot(unitTan, v2)
  
  let normalVelocities = elasticCollision1D(m1, m2, v1n, v2n)
  let v1np = normalVelocities.v1
  let v2np = normalVelocities.v2
  let tangentVelocities = elasticCollision1D(m1, m2, v1t, v2t)
  let v1tp = tangentVelocities.v1
  let v2tp = tangentVelocities.v2

  let vec1np = p5.Vector.mult(unitNormal, v1np) //vectors
  let vec1tp = p5.Vector.mult(unitTan, v1tp)
  let vec2np = p5.Vector.mult(unitNormal, v2np)
  let vec2tp = p5.Vector.mult(unitTan, v2tp)
  var finalv1 = p5.Vector.add(vec1np, vec1tp)
  var finalv2 = p5.Vector.add(vec2np, vec2tp)
  return ({ "v1" : finalv1, "v2" : finalv2}) 
}
const momentum = () => {
  let momentum1 = p5.Vector.mult(object1.velocity, object1.size)
  let momentum2 = p5.Vector.mult(object2.velocity, object2.size)
  return (momentum1.add(momentum2).mag())
}
const kineticEnergy = () => { 
  var ke1 = 0.5 * object1.size * object1.velocity.mag() * object1.velocity.mag()
  var ke2 = 0.5 * object2.size * object2.velocity.mag() * object2.velocity.mag()
  return (ke1 + ke2)
}
const collide = () => {
  var velocities = collision2d(object1.size, object2.size, object1.vector, object2.vector, object1.velocity, object2.velocity)
  object1.velocity.set( velocities.v1);
  object2.velocity.set(velocities.v2, object2)
}
function setup() {
  createCanvas(screen.x, screen.y);
  textSize(16);
  object1.init(0, 0, 4)
  object1.vector.x = Math.round(random(object1.size, screen.x - object1.size))
  object1.vector.y = Math.round(random(object1.size, screen.y - object1.size))
  object2.init(0, 0, 64)
  object2.vector.x = Math.round(random(object2.size, screen.x - object2.size))
  object2.vector.y = Math.round(random(object2.size, screen.y - object2.size))
  
  
}
var mouseSpeed;
obj2update = true
obj1update = true
obj2drag = false
obj1drag = false

for (let element of document.getElementsByClassName("p5Canvas")) { // https://stackoverflow.com/questions/60853612/p5-js-on-right-mouse-click-shows-the-browser-context-menu-and-not-the-drawing-fu
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
function mouseDragged(){
  
  var dx2 = (object2.vector.x - mouseX) ** 2
  var dy2 = (object2.vector.y - mouseY) ** 2
  var dist2 = Math.sqrt(dx2 + dy2)
  if (dist2 <= object2.size){
    if (obj1drag === false){
      obj2drag = true
      //object2.velocity = mouseSpeed // drag mouse velocity
      object2.vector = createVector(mouseX, mouseY)
      obj2update = false 
    }
  }
  
    var dx1 = (object1.vector.x - mouseX) ** 2
    var dy1 = (object1.vector.y - mouseY) ** 2
    var dist1 = Math.sqrt(dx1 + dy1)
    if (dist1 <= (object1.size + 10)){
      if (obj2drag === false){
        obj1drag = true
        object1.vector = createVector(mouseX, mouseY)
        //object1.velocity = mouseSpeed
        obj1update = false
    }
  }
  if (mouseButton === RIGHT){if(obj1drag){object1.velocity = createVector(movedX, movedY)};if(obj2drag){object2.velocity = createVector(movedX, movedY)}
  }
}
function mouseReleased(){
  obj2update = true
  obj1update = true
  obj2drag = false
  obj1drag = false
}



function draw() {
  background(0)
  noStroke()
  const size1Div = document.getElementById("size1")
  size1Div.oninput = () => {
    object1.size = parseInt(document.getElementById("size1").value)
    console.log(size1Div.value)
  }
  const size2Div = document.getElementById("size2")
  size2Div.oninput = () => {
    object2.size = parseInt(document.getElementById("size2").value)
    console.log(size2Div.value)
  }
  if (obj1update){object1.update()}
  
  if(obj2update){object2.update()}
  if (circleCollide(object1.vector.x, object2.vector.x, object1.vector.y, object2.vector.y, object1.size, object2.size)){
    console.log("hit")
    p1 = momentum()
    collide()
    p2 = momentum()
    console.log("momentum before = "+ p1 + " momentum after = " + p2)
  }
 
  object2.display()
  object1.display()

  document.getElementById("info").innerHTML = "<p> Object 1 Velocity = " + round(object1.velocity.mag(), 2) + "</p> <p> Object 2 Velocity = " +round(object2.velocity.mag(), 2) + "</p> <p> Momentum = " + round(momentum(), 2) + "</p><p>Kinetic Energy = " + round(kineticEnergy(), 2) + "</p>"
}