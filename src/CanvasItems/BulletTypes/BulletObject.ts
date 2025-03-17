import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import CanvasItem from '../CanvasItem.js';

export default abstract class BulletObject extends CanvasItem {
  protected owner: string;

  protected angle: number;

  protected speed: number;

  protected bouncesLeft: number;

  protected shouldBeDestroyed: boolean;

  public constructor(maxX: number, maxY: number, posX: number, posY: number, angle: number, owner: string) {
    super(maxX, maxY);

    this.position = { x: posX, y: posY };
    this.owner = owner;
    this.angle = angle;
    this.speed = 0;
    this.bouncesLeft = 0;
    this.shouldBeDestroyed = false;
  }

  public changePosition(wantedX: number, wantedY: number): void {
    if (Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor(this.position.y / Tanks.resizeFactor / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor(this.position.y / Tanks.resizeFactor / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor((this.position.y / Tanks.resizeFactor + this.image.height) / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor((this.position.y / Tanks.resizeFactor + this.image.height) / Tanks.tileSize))) {
      if (this.allowedToBounce()) {
        this.switchAngle('X');
        this.position.x -= wantedX - this.position.x;
      }
    } else {
      this.position.x = wantedX;
    }
    if (Tanks.currentScene.checkCollision(Math.floor(this.position.x / Tanks.resizeFactor / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((this.position.x / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor(this.position.x / Tanks.resizeFactor / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize)) ||
    Tanks.currentScene.checkCollision(Math.floor((this.position.x / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize))) {
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

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawRotatedImage(canvas, this.image, this.position.x, this.position.y, this.image.width * Tanks.resizeFactor, this.image.height * Tanks.resizeFactor, this.angle);
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

  public allowedToBounce(): boolean {
    if (this.bouncesLeft <= 0) {
      this.shouldBeDestroyed = true;
      return false;
    } else {
      if (this.owner === 'Player1') {
        this.owner = 'FreeFromPlayer1';
      }
      if (this.owner === 'Player2') {
        this.owner = 'FreeFromPlayer2';
      }
      this.bouncesLeft -= 1;
      return true;
    }
  }

  public getShouldBeDestroyed(): boolean {
    return this.shouldBeDestroyed;
  }
}
