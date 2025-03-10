import CanvasItem from './CanvasItem.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';
import { Vector2 } from '../Types.js';

export default class CollisionBox extends CanvasItem {
  private width: number;

  private height: number;

  public constructor(maxX: number, maxY: number, posX: number, posY: number, width: number, height: number, imageName: string) {
    super(maxX, maxY);
    this.position = {x: posX - (width / 2), y: posY - (height / 2)};
    this.width = width;
    this.height = height;
    this.image = CanvasRenderer.loadNewImage(imageName);
  }

  /**
   * Draw the collision object on the provided canvas.
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawResizedImage(canvas, this.image, this.position.x, this.position.y, this.width, this.height);
  }

  public override getHeight(): number {
    return this.height;
  }

  public override getWidth(): number {
    return this.width;
  }
}
