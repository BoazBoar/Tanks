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
    if (!Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) &&
      !Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) &&
      !Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize)) &&
      !Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize))) {
      this.position.x = wantedX;
      this.position.y = wantedY;
    } else {
      if (this.bouncesLeft <= 0) {
        this.shouldBeDestroyed = true;
      } else {
        this.bouncesLeft -= 1;
        if ((Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) &&
          Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize))) ||
          (Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize)) &&
            Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize)))) {
          this.angle *= -1;
        } else if ((Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.resizeFactor / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) &&
        Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor) / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize))) ||
        (Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor(wantedY / Tanks.resizeFactor / Tanks.tileSize)) &&
        Tanks.currentScene.checkCollision(Math.floor((wantedX / Tanks.resizeFactor + this.image.width) / Tanks.tileSize), Math.floor((wantedY / Tanks.resizeFactor + this.image.height) / Tanks.tileSize)))) {
          this.angle = (Math.PI / 2) + ((Math.PI / 2) - this.angle);
        } else {
          throw new Error('Couldn`t discover what side of this bullet collided with the wall');
        }
      }
      // TODO: Implement bounce feature
      // throw new Error('stop');
    }
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawRotatedImage(canvas, this.image, this.position.x, this.position.y, this.image.width * Tanks.resizeFactor, this.image.height * Tanks.resizeFactor, this.angle);
  }

  public getOwner(): string {
    return this.owner;
  }

  public getBouncesLeft(): number {
    return this.bouncesLeft;
  }

  public getShouldBeDestroyed(): boolean {
    return this.shouldBeDestroyed;
  }
}
