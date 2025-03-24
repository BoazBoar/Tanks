import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import CanvasItem from '../CanvasItem.js';

export default abstract class BulletObject extends CanvasItem {
  protected owner: string;

  protected angle: number;

  protected speed: number;

  protected bouncesLeft: number;

  protected gracePeriod: number;

  protected shouldBeDestroyed: boolean;

  public constructor(maxX: number, maxY: number, posX: number, posY: number, angle: number, owner: string) {
    super(maxX, maxY);

    this.position = { x: posX, y: posY };
    this.owner = owner;
    this.angle = angle;
    this.speed = 0;
    this.bouncesLeft = 0;
    this.gracePeriod = 20;
    this.shouldBeDestroyed = false;
  }

  public changePosition(wantedX: number, wantedY: number): void {
    if (Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.tileSize), Math.floor(this.position.y / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((wantedX + this.image.width) / Tanks.tileSize), Math.floor(this.position.y / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.tileSize), Math.floor((this.position.y + this.image.height) / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((wantedX + this.image.width) / Tanks.tileSize), Math.floor((this.position.y + this.image.height) / Tanks.tileSize))) {
      if (this.allowedToBounce()) {
        this.switchAngle('X');
        this.position.x -= wantedX - this.position.x;
      }
    } else {
      this.position.x = wantedX;
    }
    if (Tanks.currentScene.checkCollision(Math.floor(this.position.x / Tanks.tileSize), Math.floor(wantedY / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((this.position.x + this.image.width) / Tanks.tileSize), Math.floor(wantedY / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor(this.position.x / Tanks.tileSize), Math.floor((wantedY + this.image.height) / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((this.position.x + this.image.width) / Tanks.tileSize), Math.floor((wantedY + this.image.height) / Tanks.tileSize))) {
      if (this.allowedToBounce()) {
        this.switchAngle('Y');
        this.position.y -= wantedY - this.position.y;
      }
    } else {
      this.position.y = wantedY;
    }
  }

  public switchAngle(axis: string): void {
    if (axis === 'x' || axis === 'X') {
      this.angle = (Math.PI / 2) + ((Math.PI / 2) - this.angle);
    } else if (axis === 'y' || axis === 'Y') {
      this.angle *= -1;
    }
  }

  public allowedToBounce(): boolean {
    if (this.bouncesLeft <= 0) {
      this.shouldBeDestroyed = true;
      return false;
    } else {
      this.bouncesLeft -= 1;
      return true;
    }
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawRotatedImage(canvas, this.image, this.position.x, this.position.y, this.image.width, this.image.height, this.angle);
  }

  public changeGracePeriod(change: number): void {
    this.gracePeriod += change;
  }

  public setShouldBeDestroyed(boolean: boolean): void {
    this.shouldBeDestroyed = boolean;
  }

  public getOwner(): string {
    return this.owner;
  }

  public getBouncesLeft(): number {
    return this.bouncesLeft;
  }

  public getGracePeriod(): number {
    return this.gracePeriod;
  }

  public getShouldBeDestroyed(): boolean {
    return this.shouldBeDestroyed;
  }
}
