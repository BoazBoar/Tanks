import CanvasRenderer from '../Tools/CanvasRenderer.js';
import MouseListener from '../Tools/MouseListener.js';
import { Vector2 } from '../Types.js';

export default abstract class CanvasItem {
  protected maxX: number;;

  protected maxY: number;

  protected name: string = '';

  protected image: HTMLImageElement;

  protected position: Vector2;

  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;

    this.image = new Image();
    this.position = {
      x: 100,
      y: 100
    };
  }

  /**
   * TODO: should check if an item overlaps with another
   * @param item item to check collision for
   * @returns true if item is overlapping, otherwise returns false
   */
  public isCollidingWithItem(item: CanvasItem): boolean {
    if (this.position.x < item.position.x + item.getWidth() &&
      this.position.x + this.getWidth() > item.position.x &&
      this.position.y < item.position.y + item.getHeight() &&
      this.position.y + this.getHeight() > item.position.y) {
      return true;
    } else {
      return false;
    }
  }

  /**
 * TODO: should check if an item overlaps with the cursor
 * @param item item to check collision for
 * @returns true if item is overlapping, otherwise returns false
 */
  public isCollidingWithCursor(mouse: MouseListener): boolean {
    if (this.position.x < mouse.getMousePosition().x &&
      this.position.x + this.getWidth() > mouse.getMousePosition().x &&
      this.position.y < mouse.getMousePosition().y &&
      this.position.y + this.getHeight() > mouse.getMousePosition().y) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Will replace the currently rendered image.
   * @param newImage images that will replace the previous image
   */
  public changeImage(newImage: HTMLImageElement): void {
    this.image = newImage;
  }

  /**
   * this draws the CanvasItem onto the canvas
   *
   * @param canvas space on which the CanvasItem is drawn
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.position.x - this.image.width / 2, this.position.y - this.image.height / 2);
  }

  public getPosX(): number {
    return this.position.x;
  }

  public getPosY(): number {
    return this.position.y;
  }

  public getWidth(): number {
    this.verifyImageSrc();
    return this.image.width;
  }

  public getHeight(): number {
    this.verifyImageSrc();
    return this.image.height;
  }

  public getName(): string {
    return this.name;
  }

  /**
   * Compiler error if an item's image source is misconfigured.
   */
  public verifyImageSrc(): void {
    if (this.image.src === '') {
      throw new Error(`${this.constructor.name}: Image was not initialized.`);
    }
  }
}
