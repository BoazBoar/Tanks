import { Sprite, Vector2 } from './Types.js';

export default class Symbol {
  private tileSize: number;

  protected position: Vector2;

  protected sprite: Sprite;

  protected scale: number;

  protected width: number;

  protected height: number;

  public constructor(
    sprite: Sprite,
    posX: number,
    posY: number,
    scale: number,
  ) {
    this.tileSize = 32;
    this.position = { x: posX * this.tileSize, y: posY * this.tileSize };
    this.sprite = sprite;
    this.scale = scale;
    this.width = this.sprite.width * scale;
    this.height = this.sprite.height * scale;
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
      this.position.x + this.tileSize / 2 - this.width / 2,
      this.position.y + this.tileSize - this.height,
      this.width * 1,
      this.height * 1
    );
  }
}
