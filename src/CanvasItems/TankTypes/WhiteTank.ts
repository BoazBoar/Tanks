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
    this.speed = 0;
    this.bulletsLeft = 0;
    this.currentMovementDirection = facing;
    this.lastMovementDirection = facing;
  }

  public override update(elapsed: number): void {
    if (!this.shouldBeDestroyed) {
      this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2));
      this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2.5));

      this.changeSprite();
    }
  }

  public override shoot(): void {
    // Not Allowed
  }

  public override getBulletType(): BulletObject {
    // The bullet spawnpoint now uses hardcoded values, maybe in the future i can use the width and height of the bullet image
    this.bulletSpawnPoint = { x: (this.tankBarrelRelativeX - (12 / 2) + (this.tankBarrel.width / 2)), y: (this.tankBarrelRelativeY - (8 / 2) + (this.tankBarrel.height / 2.5)) };

    return new StandardBullet(this.maxX, this.maxY, this.bulletSpawnPoint.x, this.bulletSpawnPoint.y, this.barrelAngle, this.name);
  }
}
