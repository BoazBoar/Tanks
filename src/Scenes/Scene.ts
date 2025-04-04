import CanvasItem from '../CanvasItems/CanvasItem.js';
import KeyListener from '../Tools/KeyListener.js';
import MouseListener from '../Tools/MouseListener.js';

export default abstract class Scene {
  protected maxX: number;

  protected maxY: number;

  protected bgImage: HTMLImageElement;

  protected collisionArray: number[];

  protected objectArray: CanvasItem[];

  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.bgImage = new Image();
    this.collisionArray = [];
    this.objectArray = [];
  }

  /**
   * processInput takes user-input and turns it into gameloop tasks.
   *
   * @public
   * @abstract
   * @param {KeyListener} keyListener
   * @param {MouseListener} mouseListener
   */
  public abstract processInput(keyListener: KeyListener, mouseListener: MouseListener): void;

  /**
   * update is run more often on better machines, so we use elapsed (ms)
   * to achieve consistent physics, new_pos = curr_pos + (vector * elapsed)
   *
   * @public
   * @abstract
   * @param elapsed
   */
  public abstract update(elapsed: number): void;

  public abstract checkCollision(col: number, row: number): boolean;

  public abstract checkBulletCollision(col: number, row: number): boolean;

  /**
   * getNextScene returns null and does nothing, if it returns a Scene
   * we change WereldWinkel.currentScene to provided Scene
   *
   * @public
   * @abstract
   * @returns (Scene | null)
   */
  public abstract getNextScene(): Scene | null;

  /**
   * render quite obviously allows us to draw on our provided canvas.
   *
   * @public
   * @abstract
   * @param HTMLCanvasElement canvas
   */
  public abstract render(canvas: HTMLCanvasElement): void;
}
