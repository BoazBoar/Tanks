import CanvasRenderer from '../Tools/CanvasRenderer.js';
import { Sprite, Vector2 } from '../Types.js';
import Tanks from '../Tanks.js';
import TankObjects from './TankObjects.js';

export default class Player1 extends TankObjects {
  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number) {
    super(maxX, maxY, sprite, posX, posY);

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/tanksPlayer1.png');
    this.speed = 0.07;
  }
}
