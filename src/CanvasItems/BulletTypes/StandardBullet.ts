import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Vector2 } from '../../Types.js';
import BulletObject from './BulletObject.js';

export default class StandardBullet extends BulletObject {
  public constructor(maxX: number, maxY: number, posX: number, posY: number, angle: number, owner: string) {
    super(maxX, maxY, posX, posY, angle, owner);

    this.image = CanvasRenderer.loadNewImage('assets/tanksStandardBullet.png');

    this.name = 'Standard';
    this.speed = 0.12;
    this.bouncesLeft = 2;
  }

  public override update(elapsed: number): void {
    this.changePosition(this.position.x + elapsed * this.speed * Math.cos(this.angle), this.position.y + elapsed * this.speed * Math.sin(this.angle));
  }

  public getImageSize(): Vector2 {
    return { x: this.image.width, y: this.image.height };
  }
}
