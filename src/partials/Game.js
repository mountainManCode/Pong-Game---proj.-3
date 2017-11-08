import { SVG_NS, boardGap, paddleWidth, paddleHeight, ballRadius, KEYS, } from '../settings'

import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'
import Score from './Score'
import Winner from './Winner'

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
	
		this.gameElement = document.getElementById(this.element);

		this.score1 = new Score(196, 20, 30);
		this.score2 = new Score(286, 20, 30);

		this.winner = new Winner (20, 120, 50);

		this.board = new Board(this.width, this.height);
			//attributes below set in settings.js
		this.boardGap = boardGap;
		this.paddleWidth = paddleWidth;
		this.paddleHeight = paddleHeight;
		this.ballRadius = ballRadius;
			//Paddle left
		this.paddleOne = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			this.boardGap, 
			(this.height-this.paddleHeight)/2,
			KEYS.a,
			KEYS.z
		);
			//Paddle right
		this.paddleTwo = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			this.width-this.boardGap-this.paddleWidth, 
			(this.height-this.paddleHeight)/2,
			KEYS.up,
			KEYS.down
		);

			//game balls
		this.ball = new Ball(this.ballRadius, this.width, this.height);
		this.ball2 = new Ball(this.ballRadius * 2, this.width, this.height);

		document.addEventListener('keydown', event => {
			if ( event.key === KEYS.spaceBar ) {
				this.pause = !this.pause;
			}
		});
	}
	
	champion(svg, player) {
		this.winner.render(svg, `${player} Wins!!!`);
		this.pause = true;
	}

	render() {
		if (this.pause) {
			return;
		}
		
		this.gameElement.innerHTML = ' ';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.paddleOne.render(svg);
		this.paddleTwo.render(svg);
		this.ball.render(svg, this.paddleOne, this.paddleTwo);
		this.ball2.render(svg, this.paddleOne, this.paddleTwo);

		this.score1.render(svg, this.paddleOne.score);
		this.score2.render(svg, this.paddleTwo.score);

		if (this.paddleOne.score === 3) {
			this.champion(svg, 'Player 1')
		} else if (this.paddleTwo.score === 3) {
			this.champion(svg, 'Player 2')
		}
	}
}