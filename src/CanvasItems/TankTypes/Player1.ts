import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Sprite } from '../../Types.js';
import TankObjects from './TankObjects.js';
import BulletObject from '../BulletTypes/BulletObject.js';
import StandardBullet from '../BulletTypes/StandardBullet.js';

export default class Player1 extends TankObjects {
  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number) {
    super(maxX, maxY, sprite, posX, posY);

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/TankSprites/tanksPlayer1.png');
    this.name = 'Player1';
    this.speed = 0.07;
    this.bulletsLeft = 9;
  }

  public getBulletType(): BulletObject {
    return new StandardBullet(this.maxX, this.maxY, this.tankBarrelRelativeX, this.tankBarrelRelativeY, this.barrelAngle, this.name);
  }
}
