import { Vector2 } from '../Types.js';
import CanvasItem from './CanvasItem.js';

export default abstract class Controllable extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
  }

  public setPosition(newPosition: Vector2): void {
    this.position = newPosition;
  }

  public movePosition(increaseXBy: number, increaseYBy: number): void {
    this.position.x += increaseXBy;
    this.position.y += increaseYBy;
  }
}
