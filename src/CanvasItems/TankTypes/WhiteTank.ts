import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Sprite } from '../../Types.js';
import TankObjects from './TankObjects.js';
import BulletObject from '../BulletTypes/BulletObject.js';
import StandardBullet from '../BulletTypes/StandardBullet.js';

export default class WhiteTank extends TankObjects {
  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number,
    name: string,
    facing: string) {
    super(maxX, maxY, sprite, posX, posY, name, facing);

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/TankSprites/tanksWhiteTankBarrel.png');
    this.name = name;
    this.speed = 0;
    this.bulletsLeft = 0;
    this.currentMovementDirection = facing;
    this.lastMovementDirection = facing;
  }

  public override getBulletType(): BulletObject {
    return new StandardBullet(this.maxX, this.maxY, this.tankBarrelRelativeX, this.tankBarrelRelativeY, this.barrelAngle, this.name);
  }

  public shoot(): void {
    // Not Allowed
  }
}
