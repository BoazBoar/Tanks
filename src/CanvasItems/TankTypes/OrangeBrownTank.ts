import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Sprite } from '../../Types.js';
import TankObjects from './TankObjects.js';
import BulletObject from '../BulletTypes/BulletObject.js';
import Tanks from '../../Tanks.js';
import Level from '../../Scenes/Levels/Level.js';
import NoBounceBullet from '../BulletTypes/NoBounceBullet.js';

export default class OrangeBrownTank extends TankObjects {
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

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/TankSprites/tanksOrangeBrownTankBarrel.png');
    this.barrelTurnSpeed = 1.4 / 1000;
    this.angleSwitch = false;
    this.speed = 0;
    this.bulletsLeft = 2;
    this.randomShootTime = 2000 + (Math.random() * 3500);
    this.randomMoveTime = 5000 + (Math.random() * 2000);
    this.randomWaitToMoveTime = 1000 + (Math.random() * 2000);
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
          this.randomMoveTime = 5000 + (Math.random() * 2000);
          this.randomWaitToMoveTime = 1000 + (Math.random() * 2000);
        } else {
          this.randomWaitToMoveTime -= elapsed;
        }
      } else {
        if (this.barrelAngle <= this.barrelAngleOriginal + (Math.PI / 4) && this.angleSwitch === false) {
          this.barrelAngle += (this.barrelTurnSpeed) * elapsed;
        } else {
          this.angleSwitch = true;
        }
        if (this.barrelAngle >= this.barrelAngleOriginal - (Math.PI / 4) && this.angleSwitch === true) {
          this.barrelAngle -= (this.barrelTurnSpeed) * elapsed;
        } else {
          this.angleSwitch = false;
        }
        this.randomMoveTime -= elapsed;
      }

      if (this.randomShootTime <= 0) {
        this.shoot();
        this.randomShootTime = 2000 + (Math.random() * 3500);
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
    return new NoBounceBullet(this.maxX, this.maxY, this.tankBarrelRelativeX, this.tankBarrelRelativeY, this.barrelAngle, this.name);
  }
}
