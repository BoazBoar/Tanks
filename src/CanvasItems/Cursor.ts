import CanvasRenderer from '../Tools/CanvasRenderer.js';
import { Vector2 } from '../Types.js';
import CanvasItem from './CanvasItem.js';

export default class Cursor extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/AimCursorNew.png');
  }

  public setPosition(newPosition: Vector2): void {
    this.position = newPosition;
  }
}
