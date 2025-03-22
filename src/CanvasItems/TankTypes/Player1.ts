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
