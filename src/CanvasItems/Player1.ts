import CanvasRenderer from '../Tools/CanvasRenderer.js';
import Controllable from './Controllable.js';
import { Sprite } from '../Types.js';

export default class Player1 extends Controllable {
  private tankBarrel: HTMLImageElement;

  private tankBase: Sprite;

  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number) {
    super(maxX, maxY);

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/tanksPlayer1.png');
    this.tankBase = sprite;
    this.position = {x: posX, y: posY};
  }
}
