import Level from '../../Scenes/Levels/Level.js';
import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import { Sprite } from '../../Types.js';
import BulletObject from '../BulletTypes/BulletObject.js';
import CanvasItem from '../CanvasItem.js';

export default abstract class TankObjects extends CanvasItem {
  protected tankBase: Sprite;

  protected tankBarrel: HTMLImageElement;

  protected tankBarrelRelativeX: number;

  protected tankBarrelRelativeY: number;

  protected barrelAngle: number;

  protected width: number;

  protected height: number;

  protected speed: number;

  protected bulletsLeft: number;

  protected currentMovementDirection: string;

  protected lastMovementDirection: string;

  protected shouldBeDestroyed: boolean;

  public constructor(maxX: number, maxY: number,
    sprite: Sprite,
    posX: number,
    posY: number,
    name: string,
    facing: string) {
    super(maxX, maxY);

    this.tankBase = sprite;
    this.tankBarrel = CanvasRenderer.loadNewImage('');
    this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2.5)) * Tanks.resizeFactor;
    this.barrelAngle = 0;
    this.position = { x: posX * Tanks.tileSize, y: posY * Tanks.tileSize };
    this.width = sprite.width;
    this.height = sprite.height;
    this.speed = 0;
    this.bulletsLeft = 0;
    this.currentMovementDirection = 'Still';
    this.lastMovementDirection = 'Still';
    if (facing === 'Right') {
      this.barrelAngle = 0;
    } else if (facing === 'Left') {
      this.barrelAngle = Math.PI;
    } else if (facing === 'Up') {
      this.barrelAngle = -Math.PI / 2;
    } else if (facing === 'Down') {
      this.barrelAngle = Math.PI / 2;
    } else if (facing === 'RightUp') {
      this.barrelAngle = -Math.PI / 4;
    } else if (facing === 'RightDown') {
      this.barrelAngle = Math.PI / 4;
    } else if (facing === 'LeftUp') {
      this.barrelAngle = 3 * (-Math.PI / 4);
    } else if (facing === 'LeftDown') {
      this.barrelAngle = 3 * (Math.PI / 4);
    }

    this.shouldBeDestroyed = false;
  }

  public update(elapsed: number): void {
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

    this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2.5)) * Tanks.resizeFactor;

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

  public abstract shoot(): void;

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
      this.width * Tanks.resizeFactor,
      this.height * Tanks.resizeFactor
    );

    // if (this.lastMovementDirection === 'Right') {
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (10)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'Left') {
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (10)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'Up') {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 3)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'Down') {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'RightUp') {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'RightDown') {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'LeftUp') {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // } else if (this.lastMovementDirection === 'LeftDown') {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 2)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 2)) * Tanks.resizeFactor;
    // } else {
    //   this.tankBarrelRelativeX = (this.position.x - (this.tankBarrel.width / 2) + (this.tankBase.width / 1.5)) * Tanks.resizeFactor;
    //   this.tankBarrelRelativeY = (this.position.y - (this.tankBarrel.height / 2) + (this.tankBase.height / 3)) * Tanks.resizeFactor;
    // }

    CanvasRenderer.drawRotatedImage(canvas, this.tankBarrel, this.tankBarrelRelativeX, this.tankBarrelRelativeY, this.tankBarrel.width * Tanks.resizeFactor, this.tankBarrel.height * Tanks.resizeFactor, this.barrelAngle);
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

  public setShouldBeDestroyed(boolean: boolean): void {
    this.shouldBeDestroyed = boolean;
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

  public getBulletsLeft(): number {
    return this.bulletsLeft;
  }

  public abstract getBulletType(): BulletObject;

  public getShouldBeDestroyed(): boolean {
    return this.shouldBeDestroyed;
  }

  /**
   * change the amount of bullets left by a given amount
   * @param changeBy amount bulletsLeft needs to be changed by
   */
  public changeBulletsLeft(changeBy: number): void {
    this.bulletsLeft += changeBy;
  }
}
