function drawArrow(base, vec, myColor) { // from p5 docs
  push();
  stroke(myColor);
  strokeWeight(1);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 3, 0, -arrowSize / 3, arrowSize, 0);
  pop();
}
var arrow = true

function changeArrow(){
  
  if (arrow){arrow = false} else { arrow = true}
  console.log("arrow changed")
}

class CircleObject {
   constructor(){
       this.vector;
       this.velocity;
       //this.momentum;
       this.size;     
   }
   init (x, y, size){
    this.vector = createVector(x, y)
    this.velocity = createVector(Math.round(random(-3, 3)), Math.round(random(-3, 3)))
    //this.momentum = this.velocity.mult(this.size)
    this.size = size
   }
   display(){
       circle(this.vector.x, this.vector.y, this.size * 2)
       if (arrow){
       drawArrow(this.vector, p5.Vector.mult(this.velocity, 10), 'blue');
       }
    }
   update () {
       if (this.vector.x - this.size <= 0){
           if (this.velocity.x <= 0){
             this.velocity.x *= -1
           }
       }
       if (this.vector.x + this.size >= screen.x){
         if (this.velocity.x >= 0){
             this.velocity.x *= -1
           }
       }
       if (this.vector.y - this.size<=0){
          if (this.velocity.y <= 0){this.velocity.y *= -1}
       }
       if (this.vector.y + this.size >= screen.y){
         if (this.velocity.y >= 0){this.velocity.y *= -1}
       }
       this.vector.add(this.velocity)
       
   }
}