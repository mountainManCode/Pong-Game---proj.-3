import {SVG_NS} from '../settings'

export default class Ball {
  constructor(ballRadius, boardWidth, boardHeight) {
    this.ballRadius = ballRadius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.reset();
  }
  
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    
    this.vy = 0;
    
    while ( this.vy ===0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
        //Vector of the ball below
      this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  
  wallCollision(paddleOne, paddleTwo) {
    const hitLeft = this.x - this.ballRadius <= 0;
    const hitRight = this.x + this.ballRadius >= this.boardWidth;
    const hitTop = this.y - this.ballRadius <= 0;
    const hitBottom = this.y + this.ballRadius >= this.boardHeight;
    
    if (hitLeft) {
      this.direction = 1;
      this.goal(paddleTwo);
    } else if (hitRight) {
      this.direction = -1;
      this.goal(paddleOne)
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }
  
  paddleCollision(paddleOne, paddleTwo) {
    if (this.vx > 0) {
          //Detect collision on right side (paddleTwo)
      let paddle = paddleTwo.coordinates(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
      let { leftX, topY, bottomY } = paddle; 
      
      if (
          // right edge of the ball is >= left edge of the paddle
           //ball Y is >= paddle top Y && ball Y is <= paddle bottom Y
        this.x + this.ballRadius >= leftX 
        && this.y >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    } else {
          //Detect collision on left side (paddleOne)
      let paddle = paddleOne.coordinates(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
      let { rightX, topY, bottomY } = paddle;
      if (
         //detect collision on left
        this.x - this.ballRadius <= rightX
        && this.y >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      } 
    }
  }
  
  goal (paddle) {
    paddle.score++
    this.reset();
  }
  
  render (svg, paddleOne, paddleTwo) {
    this.x += this.vx;
    this.y += this.vy;
    
    this.wallCollision(paddleOne, paddleTwo);
    this.paddleCollision(paddleOne, paddleTwo);
    
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.ballRadius);
    circle.setAttributeNS(null, 'fill', 'orange');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    
    svg.appendChild(circle);
  }
}