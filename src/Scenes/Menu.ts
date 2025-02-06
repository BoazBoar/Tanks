import Scene from './Scene.js';
import KeyListener from '../Tools/KeyListener.js';
import MouseListener from '../Tools/MouseListener.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';

export default class Menu extends Scene {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.timeLeft = 300 * 1000;
    this.image = CanvasRenderer.loadNewImage('./assets/img/backgroundmenu.png');
  }

  /**
   * Process the input from the player.
   * @param KeyListener keyListener
   * @param MouseListener mouseListener
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {

  }

  /**
   * changes the image when hovering over it.
   * IMAGES WILL NEED TO BE CHANGED WHEN WE HAVE MADE THEM.
   */
  public hoverImage(): void {

  }

  /**
   * Update Menu.timeLeft and starts the game after 1 minute has passed.
   * @param number elapsed
   */
  public override update(elapsed: number): void {

  }

  /**
   * Get the NextScene (Store) when the player is ready.
   * @returns (Scene | null)
   */
  public override getNextScene(): Scene | null {
    return null;
  }

  /**
   * Render the Menu.
   * @param HTMLCanvasElement canvas
   */
  public override render(canvas: HTMLCanvasElement): void {

  }
}
