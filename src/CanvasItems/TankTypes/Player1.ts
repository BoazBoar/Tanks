import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Sprite } from '../../Types.js';
import TankObjects from './TankObjects.js';
import BulletObject from '../BulletTypes/BulletObject.js';
import StandardBullet from '../BulletTypes/StandardBullet.js';
import Tanks from '../../Tanks.js';
import Level from '../../Scenes/Levels/Level.js';

export default class Player1 extends TankObjects {
  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number,
    name: string,
    facing: string) {
    super(maxX, maxY, sprite, posX, posY, name, facing);

    this.tankBarrel = CanvasRenderer.loadNewImage('assets/TankSprites/tanksPlayer1.png');
    this.speed = 0.07;
    this.bulletsLeft = 9;
  }

  public override getBulletType(): BulletObject {
    return new StandardBullet(this.maxX, this.maxY, this.tankBarrelRelativeX, this.tankBarrelRelativeY, this.barrelAngle, this.name);
  }

  public shoot(): void {
    if (!this.shouldBeDestroyed) {
      if (this.bulletsLeft > 0) {
        this.changeBulletsLeft(-1);
        if (Tanks.currentScene instanceof Level) {
          Tanks.currentScene.addToObjectArray(this.getBulletType());
        }
      }
    }
  }
}
