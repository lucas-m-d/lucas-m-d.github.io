const screen = {
    "x":400,
    "y":400
}

class SquareObject {
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
       square(this.vector.x, this.vector.y, this.size)
   }
   update (collision=false) {
       if (this.vector.x <= 0 || this.vector.x + this.size >= screen.x){
           this.velocity.x *= -1
       } else if (this.vector.y <=0 || this.vector.y + this.size >= screen.y){
           this.velocity.y *= -1
       }
       this.vector.add(this.velocity)
       
   }
}