/**
 * Helper class for managing the mouse
 *
 * @author Frans Blauw
 */

export interface MouseCoordinates {
  x: number;
  y: number;
}

export default class MouseListener {
  public static readonly BUTTON_LEFT: number = 0;

  public static readonly BUTTON_MIDDLE: number = 1;

  public static readonly BUTTON_RIGHT: number = 2;

  private mouseCoordinates: MouseCoordinates = { x: 0, y: 0 };

  private buttonDown: Record<number, boolean> = {};

  private buttonQueried: Record<number, boolean> = {};

  /**
   *
   * @param canvas the canvas element to which the relative coordinates should given
   * @param disableContextMenu true to disable the context (right click) menu. Default: false
   */
  public constructor(canvas: HTMLCanvasElement, disableContextMenu: boolean = false) {
    canvas.addEventListener('mousemove', (ev: MouseEvent) => {
      // this.mouseCoordinates = {
      //   x: ev.offsetX,
      //   y: ev.offsetY,
      // };
      this.mouseCoordinates = this.getMousePos(canvas, ev);
    });
    canvas.addEventListener('mousedown', (ev: MouseEvent) => {
      this.buttonDown[ev.button] = true;
    });
    canvas.addEventListener('mouseup', (ev: MouseEvent) => {
      this.buttonDown[ev.button] = false;
      this.buttonQueried[ev.button] = false;
    });
    if (disableContextMenu) {
      canvas.addEventListener('contextmenu', (ev: MouseEvent) => {
        ev.preventDefault();
      });
    }
  }

  /**
   * Checks whether a mouse button is currently down.
   *
   * @param buttonCode the mouse button to check
   * @returns `true` when the specified button is currently down
   */
  public isButtonDown(buttonCode: number = 0): boolean {
    return this.buttonDown[buttonCode];
  }

  /**
   *
   * @param buttonCode the mouse button to check
   * @returns `true` when the specified button was pressed
   */
  public buttonPressed(buttonCode: number = 0): boolean {
    if (this.buttonQueried[buttonCode] === true) {
      return false;
    }
    if (this.buttonDown[buttonCode] === true) {
      this.buttonQueried[buttonCode] = true;
      return true;
    }
    return false;
  }

  /**
   * Returns the current mouse coordinates in an object
   *
   * @returns MouseCoordinates object with current position of mouse
   */
  public getMousePosition(): MouseCoordinates {
    return this.mouseCoordinates;
  }

  private getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent): MouseCoordinates {
    const rect: DOMRect = canvas.getBoundingClientRect(), // abs. size of element
      ratio: number = rect.width / rect.height,
      fullScreenCanvasWidth: number = canvas.height * ratio,
      xOffset: number = (fullScreenCanvasWidth - canvas.width) / 2,
      scaleX: number = (fullScreenCanvasWidth) / rect.width,    // relationship bitmap vs. element for x
      scaleY: number = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
      x: (evt.clientX - rect.left) * scaleX - xOffset,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    };
  }
}
