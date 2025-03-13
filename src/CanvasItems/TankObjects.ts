import Tanks from '../Tanks.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';
import { Sprite } from '../Types.js';
import CanvasItem from './CanvasItem.js';

export default abstract class TankObjects extends CanvasItem {
  protected tankBarrel: HTMLImageElement;

  protected barrelAngle: number;

  protected tankBase: Sprite;

  protected width: number;

  protected height: number;

  protected speed: number;

  protected currentMovementDirection: string;

  protected lastMovementDirection: string;

  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number) {
    super(maxX, maxY);

    this.tankBarrel = CanvasRenderer.loadNewImage('');
    this.barrelAngle = 0;
    this.tankBase = sprite;
    this.position = { x: posX, y: posY };
    this.width = sprite.width * Tanks.resizeFactor;
    this.height = sprite.height * Tanks.resizeFactor;
    this.speed = 0;
    this.currentMovementDirection = 'Still';
    this.lastMovementDirection = 'Still';
  }

  public update(elapsed: number): void {
    // console.log(this.barrelAngle);

    if (this.currentMovementDirection === 'Right') {
      this.changePosition(this.position.x + elapsed * this.speed, this.position.y);
    } else if (this.currentMovementDirection === 'Left') {
      this.changePosition(this.position.x - elapsed * this.speed, this.position.y);
    } else if (this.currentMovementDirection === 'Up') {
      this.changePosition(this.position.x, this.position.y - elapsed * this.speed);
    } else if (this.currentMovementDirection === 'Down') {
      this.changePosition(this.position.x, this.position.y + elapsed * this.speed);
    } else if (this.currentMovementDirection === 'RightUp') {
      this.changePosition(this.position.x + elapsed * this.speed, this.position.y - elapsed * this.speed);
    } else if (this.currentMovementDirection === 'RightDown') {
      this.changePosition(this.position.x + elapsed * this.speed, this.position.y + elapsed * this.speed);
    } else if (this.currentMovementDirection === 'LeftUp') {
      this.changePosition(this.position.x - elapsed * this.speed, this.position.y - elapsed * this.speed);
    } else if (this.currentMovementDirection === 'LeftDown') {
      this.changePosition(this.position.x - elapsed * this.speed, this.position.y + elapsed * this.speed);
    }
    if (this.currentMovementDirection !== 'Still') {
      this.lastMovementDirection = this.currentMovementDirection;
    }

    this.changeSprite();
  }

  public changeSprite(): void {
    if (this.currentMovementDirection === 'Left' || this.currentMovementDirection === 'Right') {
      this.tankBase.x = 0;
      this.tankBase.y = 0;
    } else if (this.currentMovementDirection === 'Up' || this.currentMovementDirection === 'Down') {
      this.tankBase.x = 1;
      this.tankBase.y = 0;
    } else if (this.currentMovementDirection === 'RightUp' || this.currentMovementDirection === 'LeftDown') {
      this.tankBase.x = 0;
      this.tankBase.y = 1;
    } else if (this.currentMovementDirection === 'LeftUp' || this.currentMovementDirection === 'RightDown') {
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

    if (this.currentMovementDirection === 'RightUp' || this.currentMovementDirection === 'RightDown' || this.currentMovementDirection === 'LeftUp' || this.currentMovementDirection === 'LeftDown') {
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
    // console.log(this.position.x + this.tankBase.width);

    let tankBarrelRelativeX: number = 0;
    let tankBarrelRelativeY: number = 0;

    tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2.5)) * Tanks.resizeFactor;

    // if (this.lastMovementDirection === 'Right') {
    //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (10)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'Left') {
    //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (10)) * Tanks.resizeFactor;
    // // } else if (this.lastMovementDirection === 'Up') {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 3)) * Tanks.resizeFactor;
    // // } else if (this.lastMovementDirection === 'Down') {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // // } else if (this.lastMovementDirection === 'RightUp') {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // // } else if (this.lastMovementDirection === 'RightDown') {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // // } else if (this.lastMovementDirection === 'LeftUp') {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // // } else if (this.lastMovementDirection === 'LeftDown') {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // // } else {
    // //   tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 1.5)) * Tanks.resizeFactor;
    // //   tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 3)) * Tanks.resizeFactor;
    // }

    CanvasRenderer.drawRotatedImage(canvas, this.tankBarrel, tankBarrelRelativeX, tankBarrelRelativeY, this.tankBarrel.width * Tanks.resizeFactor, this.tankBarrel.height * Tanks.resizeFactor, this.barrelAngle);
  }

  public setMovementDirection(direction: string): void {
    this.currentMovementDirection = direction;
  }

  public setBarrelAngle(x: number, y: number): void {
    this.barrelAngle = Math.atan2(y, x);
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

  public getBarrelWidth(): number {
    return this.tankBarrel.width;
  }

  public getBarrelHeight(): number {
    return this.tankBarrel.height;
  }
}
