import {SVG_NS} from '../settings'

export default class Ball {
  constructor(ballRadius, boardWidth, boardHeight) {
    this.ballRadius = ballRadius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  }

  render(svg) {

    let circle = document.createElementNS(SVG_NS, 'circle');
  
      circle.setAttributeNS(null, 'r', this.ballRadius);
      circle.setAttributeNS(null, 'fill', 'orange');
      circle.setAttributeNS(null, 'cx', this.boardWidth/2);
      circle.setAttributeNS(null, 'cy', this.boardHeight/2);
      
      svg.appendChild(circle);
  }
}