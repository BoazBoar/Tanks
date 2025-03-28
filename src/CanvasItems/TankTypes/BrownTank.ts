import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Sprite } from '../../Types.js';
import TankObjects from './TankObjects.js';
import BulletObject from '../BulletTypes/BulletObject.js';
import StandardBullet from '../BulletTypes/StandardBullet.js';
import Tanks from '../../Tanks.js';
import Level from '../../Scenes/Levels/Level.js';

export default class BrownTank extends TankObjects {
  private angleSwitch: boolean;

  private randomShootTime: number;

  private randomMoveTime: number;

  private randomWaitToMoveTime: number;

  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number,
    name: string,
    facing: string) {
    super(maxX, maxY, sprite, posX, posY, name, facing);

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/TankSprites/tanksBrownTankBarrel.png');
    this.barrelTurnSpeed = 1 / 1000;
    this.angleSwitch = false;
    this.speed = 0;
    this.bulletsLeft = 1;
    this.randomShootTime = 4000 + (Math.random() * 6000);
    this.randomMoveTime = 5000 + (Math.random() * 5000);
    this.randomWaitToMoveTime = 2000 + (Math.random() * 2000);
    this.currentMovementDirection = facing;
    this.lastMovementDirection = facing;
  }

  public override update(elapsed: number): void {
    if (!this.shouldBeDestroyed) {
      this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2));
      this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2.5));

      this.changeSprite();

      if (this.randomMoveTime <= 0) {
        if (this.randomWaitToMoveTime <= 0) {
          this.randomMoveTime = 5000 + (Math.random() * 5000);
          this.randomWaitToMoveTime = 2000 + (Math.random() * 2000);
        } else {
          this.randomWaitToMoveTime -= elapsed;
        }
      } else {
        if (this.barrelAngle <= this.barrelAngleOriginal + (Math.PI / 3) && this.angleSwitch === false) {
          this.barrelAngle += (this.barrelTurnSpeed) * elapsed;
        } else {
          this.angleSwitch = true;
        }
        if (this.barrelAngle >= this.barrelAngleOriginal - (Math.PI / 3) && this.angleSwitch === true) {
          this.barrelAngle -= (this.barrelTurnSpeed) * elapsed;
        } else {
          this.angleSwitch = false;
        }
        this.randomMoveTime -= elapsed;
      }

      if (this.randomShootTime <= 0) {
        this.shoot();
        this.randomShootTime = 4000 + (Math.random() * 6000);
      } else {
        this.randomShootTime -= elapsed;
      }
    }
  }

  public override shoot(): void {
    if (!this.shouldBeDestroyed) {
      if (this.bulletsLeft > 0) {
        this.changeBulletsLeft(-1);
        if (Tanks.currentScene instanceof Level) {
          Tanks.currentScene.addToObjectArray(this.getBulletType());
        }
      }
    }
  }

  public override getBulletType(): BulletObject {
    // The bullet spawnpoint now uses hardcoded values, maybe in the future i can use the width and height of the bullet image
    this.bulletSpawnPoint = { x: (this.tankBarrelRelativeX - (12 / 2) + (this.tankBarrel.width / 2)), y: (this.tankBarrelRelativeY - (8 / 2) + (this.tankBarrel.height / 2.5)) };

    return new StandardBullet(this.maxX, this.maxY, this.bulletSpawnPoint.x, this.bulletSpawnPoint.y, this.barrelAngle, this.name);
  }
}
