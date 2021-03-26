const object1 = new SquareObject()
const object2 = new SquareObject()
const elasticCollisionSpeed = (m1, m2, v1, v2) => {
  var object2speed = ((2 * m1)/(m1 + m2)) * v1 - ((m1-m2)/(m1 + m2)) * v2
  var object1speed = ((m1-m2)/(m1 + m2)) * v1 + ((2 * m2)/(m1 + m2)) * v2 // http://hyperphysics.phy-astr.gsu.edu/hbase/elacol2.html#c3  
  return ({"v1":object1speed, "v2":object2speed})
}
const momentumBefore = () => {return(object1.velocity.copy().mult(object1.mass) + object2.velocity.copy().mult(object2.mass))}
const kineticEnergy = () => { 
  var ke1 = 0.5 * object1.size * object1.velocity.x * object1.velocity.x  
  var ke2 = 0.5 * object2.size * object2.velocity.x * object2.velocity.x
  return (ke1 + ke2)
}
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  textSize(16);

  //frameRate(30)
  object1.init(100, 50, 4)
  object2.init(0, 25, 64)
  object2.velocity.x = 3
  object2.velocity.mult(-1)
}

function draw() {
  background(200)
  object1.update()
  object2.update()
  if (object1.vector.x <= object2.vector.x + object2.size){
    var velocities = elasticCollisionSpeed(object1.size, object2.size, object1.velocity.x, object2.velocity.x)
    object1.velocity.x = velocities.v1
    object2.velocity.x = velocities.v2
  }

  if (object1.vector.x <= object2.vector.x - object2.size && object2.vector.x < 0){
    var velocities = elasticCollisionSpeed(object1.size, object2.size, object1.velocity.x, object2.velocity.x)
    object1.velocity.x = velocities.v1
    object2.velocity.x = velocities.v2
  }
  object2.display()
  object1.display()
  text("object1 velocity = " + object1.velocity.x + "\nobject2 velocity = " + object2.velocity.x + "\nMomentum = " + momentumBefore()[1] + "\nKE = " + kineticEnergy(), 0, 300 ) 
}
