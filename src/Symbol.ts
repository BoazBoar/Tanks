import Tanks from './Tanks.js';
import CanvasRenderer from './Tools/CanvasRenderer.js';
import { Sprite, Vector2 } from './Types.js';

export default class Symbol {
  private tileSize: number;

  protected position: Vector2;

  protected sprite: Sprite;

  protected scale: number;

  protected width: number;

  protected height: number;

  protected symbolName: string | undefined;

  public constructor(
    spriteSheet: HTMLImageElement,
    posX: number,
    posY: number,
    scale: number,
    symbolName: string | undefined,
    sequence: number,
  ) {
    let sourceX: number = 0;
    let sourceY: number = 0;

    if (symbolName === undefined) {
      if (sequence === 0) {
        throw new Error('symbolName of first symbol received at Symbol.constructor was somehow undefined');
      } else {
        // 8, 8 should be a blank space
        sourceX = 8;
        sourceY = 8;
      }
    } else if (symbolName === '1') {
      sourceX = 2;
      sourceY = 3;
    } else if (symbolName === '2') {
      sourceX = 3;
      sourceY = 3;
    } else if (symbolName === '3') {
      sourceX = 4;
      sourceY = 3;
    } else if (symbolName === '4') {
      sourceX = 5;
      sourceY = 3;
    } else if (symbolName === '5') {
      sourceX = 6;
      sourceY = 3;
    } else if (symbolName === '6') {
      sourceX = 7;
      sourceY = 3;
    } else if (symbolName === '7') {
      sourceX = 0;
      sourceY = 4;
    } else if (symbolName === '8') {
      sourceX = 1;
      sourceY = 4;
    } else if (symbolName === '9') {
      sourceX = 2;
      sourceY = 4;
    } else if (symbolName === '0') {
      sourceX = 3;
      sourceY = 4;
    }

    this.tileSize = Tanks.tileSize;
    this.sprite = {
      image: spriteSheet,
      x: sourceX,
      y: sourceY,
      width: 32,
      height: 32,
    };
    this.scale = scale;
    this.width = this.sprite.width * scale;
    this.height = this.sprite.height * scale;
    this.position = { x: posX + (sequence * this.width), y: posY };
    this.symbolName = symbolName;
  }

  /**
   * Draws the chosen sprite from the spritesheet onto the canvas
   * @param canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('2d context not found');
    }
    //Draw the object
    ctx.drawImage(this.sprite.image,
      this.sprite.x * this.sprite.width,
      this.sprite.y * this.sprite.height,
      this.sprite.width,
      this.sprite.height,
      this.position.x - this.width / 2,
      this.position.y - this.height,
      this.width * 1,
      this.height * 1
    );
  }
}
