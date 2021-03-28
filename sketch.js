const object1 = new SquareObject()
const object2 = new SquareObject()
// NOTE - THERE IS A DIFFERENT EQUATION FOR 2D MOMENTUM
// https://imada.sdu.dk/~rolf/Edu/DM815/E10/2dcollisions.pdf

const elasticCollision1D = (m1, m2, v1, v2) => {
  var object2speed = ((2 * m1)/(m1 + m2)) * v1 - ((m1-m2)/(m1 + m2)) * v2
  var object1speed = ((m1-m2)/(m1 + m2)) * v1 + ((2 * m2)/(m1 + m2)) * v2 // http://hyperphysics.phy-astr.gsu.edu/hbase/elacol2.html#c3  
  return ({"v1":object1speed, "v2":object2speed})
}
const collision2d = ( m1, m2, p1, p2, v1, v2) => {
  const normal = p5.Vector.sub(p2, p1)  
  //const unitNormal = normal.copy().div(p5.Vector.mag(normal))
  const unitNormal = p5.Vector.div(normal, normal.mag())
  const unitTan = createVector(-unitNormal.copy().y, unitNormal.copy().x) 
  let v1n = p5.Vector.dot(unitNormal, v1)
  let v1t = p5.Vector.dot(unitTan, v1) // v1t = v1tp && v2t = v2tp
  let v2n = p5.Vector.dot(unitNormal, v2)
  let v2t = p5.Vector.dot(unitTan, v2)
  //let v1np = ((v1n * (m1 - m2)) + (2 * (m2 * v2n))) / (m1 + m2) //scalars
  let normalVelocities = elasticCollision1D(m1, m2, v1n, v2n)
  let v1np = normalVelocities.v1
  let v2np = normalVelocities.v2
  let tangentVelocities = elasticCollision1D(m1, m2, v1t, v2t)
  let v1tp = tangentVelocities.v1
  let v2tp = tangentVelocities.v2
  //let v1tp = v1t
  //let v2tp = v2t
  let vec1np = p5.Vector.mult(unitNormal, v1np) //vectors
  let vec1tp = p5.Vector.mult(unitTan, v1tp)
  let vec2np = p5.Vector.mult(unitNormal, v2np)
  let vec2tp = p5.Vector.mult(unitTan, v2tp)
  var finalv1 = p5.Vector.add(vec1np, vec1tp)
  var finalv2 = p5.Vector.add(vec2np, vec2tp)//vec2np.copy().add(vec2tp)
  return ({ "v1" : finalv1, "v2" : finalv2}) 
}
const momentumBefore = () => {return(object1.velocity.copy().mult(object1.mass).add(object2.velocity.copy().mult(object2.mass)))}
const kineticEnergy = () => { 
  var ke1 = 0.5 * object1.size * object1.velocity.x * object1.velocity.x  
  var ke2 = 0.5 * object2.size * object2.velocity.x * object2.velocity.x
  return (ke1 + ke2)
}
const collide = () => {
  var velocities = collision2d(object1.size, object2.size, object1.vector, object2.vector, object1.velocity, object2.velocity)
  object1.velocity.set( velocities.v1);
  object2.velocity.set(velocities.v2, object2)
}
function setup() {
  createCanvas(400, 400);
  textSize(16);
  object1.init(Math.round(random(0, 400)), Math.round(random(0, 396)), 4)
  object2.init(Math.round(random(0, 346)), Math.round(random(0, 346)), 64)
  //object2.velocity.x = 3
  //object2.velocity.mult(-1)
}

function draw() {
  background(200)
  object1.update()
  object2.update()
  if (object1.vector.x <= object2.vector.x + object2.size && object1.vector.x >= object2.vector.x && (object1.vector.y >= object2.vector.y && object1.vector.y <= object2.vector.y + object2.size )){
    p1 = momentumBefore()
    p1add = p1.x + p1.y
    collide()
    p2 = momentumBefore()
    p2add = p2.x + p2.y
    console.log("momentum before = "+ p1add + "momentum after = " + p2add )
    object1.update()
  object2.update()
  }  
  object2.display()
  object1.display()
  text("object1 velocity = " + object1.velocity.x + "\nobject2 velocity = " + object2.velocity.x + "\nMomentum X, Y = " + momentumBefore().x + ", " + momentumBefore().y + "\nKE = " + kineticEnergy(), 0, 300 ) 
}