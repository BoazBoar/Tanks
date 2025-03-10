import Tanks from '../Tanks.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';
import { Sprite } from '../Types.js';
import CanvasItem from './CanvasItem.js';

export default abstract class TankObjects extends CanvasItem {
  protected tankBarrel: HTMLImageElement;

  protected tankBase: Sprite;

  protected width: number;

  protected height: number;

  protected speed: number;

  protected movementDirection: string;

  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number) {
    super(maxX, maxY);

    this.tankBarrel = CanvasRenderer.loadNewImage('');
    this.tankBase = sprite;
    this.position = { x: posX, y: posY };
    this.width = sprite.width * Tanks.resizeFactor;
    this.height = sprite.height * Tanks.resizeFactor;
    this.speed = 0;
    this.movementDirection = 'Still';
  }

  public update(elapsed: number): void {
    if (this.movementDirection === 'Right') {
      this.changePosition(this.position.x + elapsed * this.speed, this.position.y);
    } else if (this.movementDirection === 'Left') {
      this.changePosition(this.position.x - elapsed * this.speed, this.position.y);
    } else if (this.movementDirection === 'Up') {
      this.changePosition(this.position.x, this.position.y - elapsed * this.speed);
    } else if (this.movementDirection === 'Down') {
      this.changePosition(this.position.x, this.position.y + elapsed * this.speed);
    } else if (this.movementDirection === 'RightUp') {
      this.changePosition(this.position.x + elapsed * this.speed, this.position.y - elapsed * this.speed);
    } else if (this.movementDirection === 'RightDown') {
      this.changePosition(this.position.x + elapsed * this.speed, this.position.y + elapsed * this.speed);
    } else if (this.movementDirection === 'LeftUp') {
      this.changePosition(this.position.x - elapsed * this.speed, this.position.y - elapsed * this.speed);
    } else if (this.movementDirection === 'LeftDown') {
      this.changePosition(this.position.x - elapsed * this.speed, this.position.y + elapsed * this.speed);
    }
    this.changeSprite();
    this.movementDirection = 'Still';
  }

  public changeSprite(): void {
    if (this.movementDirection === 'Left' || this.movementDirection === 'Right') {
      this.tankBase.x = 0;
      this.tankBase.y = 0;
    } else if (this.movementDirection === 'Up' || this.movementDirection === 'Down') {
      this.tankBase.x = 1;
      this.tankBase.y = 0;
    } else if (this.movementDirection === 'RightUp' || this.movementDirection === 'LeftDown') {
      this.tankBase.x = 0;
      this.tankBase.y = 1;
    } else if (this.movementDirection === 'LeftUp' || this.movementDirection === 'RightDown') {
      this.tankBase.x = 1;
      this.tankBase.y = 1;
    }
  }

  public changePosition(wantedX: number, wantedY: number): void {
    if (!Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.tileSize), Math.floor(wantedY / Tanks.tileSize)) &&
      !Tanks.currentScene.checkCollision(Math.floor((wantedX + this.tankBase.width) / Tanks.tileSize), Math.floor(wantedY / Tanks.tileSize)) &&
      !Tanks.currentScene.checkCollision(Math.floor(wantedX / Tanks.tileSize), Math.floor((wantedY + this.tankBase.height) / Tanks.tileSize)) &&
      !Tanks.currentScene.checkCollision(Math.floor((wantedX + this.tankBase.width) / Tanks.tileSize), Math.floor((wantedY + this.tankBase.height) / Tanks.tileSize))) {
      this.position.x = wantedX;
      this.position.y = wantedY;
    } else {
      this.changePositionScrape(wantedX, wantedY);
    };
  }

  public changePositionScrape(wantedX: number, wantedY: number): void {
    const newWantedX: number = (wantedX - this.position.x) / 2 + this.position.x;
    const newWantedY: number = (wantedY - this.position.y) / 2 + this.position.y;

    if (this.movementDirection === 'RightUp' || this.movementDirection === 'RightDown' || this.movementDirection === 'LeftUp' || this.movementDirection === 'LeftDown') {
      if (!Tanks.currentScene.checkCollision(Math.floor(newWantedX / Tanks.tileSize), Math.floor(this.position.y / Tanks.tileSize)) &&
        !Tanks.currentScene.checkCollision(Math.floor((newWantedX + this.tankBase.width) / Tanks.tileSize), Math.floor(this.position.y / Tanks.tileSize)) &&
        !Tanks.currentScene.checkCollision(Math.floor(newWantedX / Tanks.tileSize), Math.floor((this.position.y + this.tankBase.height) / Tanks.tileSize)) &&
        !Tanks.currentScene.checkCollision(Math.floor((newWantedX + this.tankBase.width) / Tanks.tileSize), Math.floor((this.position.y + this.tankBase.height) / Tanks.tileSize))) {
        this.position.x = newWantedX;
      } else if (!Tanks.currentScene.checkCollision(Math.floor(this.position.x / Tanks.tileSize), Math.floor(newWantedY / Tanks.tileSize)) &&
        !Tanks.currentScene.checkCollision(Math.floor((this.position.x + this.tankBase.width) / Tanks.tileSize), Math.floor(newWantedY / Tanks.tileSize)) &&
        !Tanks.currentScene.checkCollision(Math.floor(this.position.x / Tanks.tileSize), Math.floor((newWantedY + this.tankBase.height) / Tanks.tileSize)) &&
        !Tanks.currentScene.checkCollision(Math.floor((this.position.x + this.tankBase.width) / Tanks.tileSize), Math.floor((newWantedY + this.tankBase.height) / Tanks.tileSize))) {
        this.position.y = newWantedY;
      }
    };
  }

  /**
* Draw itself on the given context
* @param ctx the 2D rendering context of the canvas
*/
  public override render(canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let ctx: CanvasRenderingContext2D;
    if (context === null) {
      throw new Error('2d context not found');
    } else {
      ctx = context;
    }
    //Draw the object
    ctx.drawImage(this.tankBase.image,
      this.tankBase.x * this.tankBase.width,
      this.tankBase.y * this.tankBase.height,
      this.tankBase.width,
      this.tankBase.height,
      (this.position.x) * Tanks.resizeFactor,
      (this.position.y) * Tanks.resizeFactor,
      this.width * 1,
      this.height * 1
    );
  }

  public setMovementDirection(direction: string): void {
    this.movementDirection = direction;
  }

  public setSpawnPoint(col: number, row: number): void {
    this.position.x = Tanks.tileSize * col;
    this.position.y = Tanks.tileSize * row;
  }

  public override getWidth(): number {
    return this.width;
  }

  public override getHeight(): number {
    return this.height;
  }
}
