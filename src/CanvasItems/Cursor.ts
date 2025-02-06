import CanvasRenderer from '../Tools/CanvasRenderer.js';
import Controllable from './Controllable.js';

export default class Cursor extends Controllable {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/AimCursorNew.png');
  }
}
