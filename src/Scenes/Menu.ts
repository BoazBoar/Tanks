import Scene from './Scene.js';
import KeyListener from '../Tools/KeyListener.js';
import MouseListener from '../Tools/MouseListener.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';
import CollisionBox from '../CanvasItems/CollisionBox.js';
import SelectLevel from './SelectLevel.js';
import Tanks from '../Tanks.js';
import { Vector2 } from '../Types.js';

export default class Menu extends Scene {
  private startNewGame: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.bgImage.src = 'assets/tanksMainMenu.png';

    this.startNewGame = false;

    this.collisionArray = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 0, 0, 0, 0,
      0, 0, 0, 0, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 0, 0, 0, 0,
      0, 0, 0, 0, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 0, 0, 0, 0,
      0, 0, 0, 0, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  /**
   * Process the input from the player.
   * @param KeyListener keyListener
   * @param MouseListener mouseListener
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      const xDivider: number = this.maxX / Tanks.rows;
      const yDivider: number = this.maxY / Tanks.cols;

      const mouseRowOnGrid: number = Math.floor(mouseListener.getMousePosition().x / xDivider);
      const mouseColOnGrid: number = Math.floor(mouseListener.getMousePosition().y / yDivider);

      this.checkCollision(mouseRowOnGrid, mouseColOnGrid);
    }
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

  public override checkCollision(col: number, row: number): boolean {
    if (this.collisionArray[Tanks.cols * row + col] === 300) {
      this.startNewGame = true;
      return true;
    }
    return false;
  }

  public override checkBulletCollision(col: number, row: number): boolean {
    return false;
  }

  /**
   * Get the NextScene (Store) when the player is ready.
   * @returns (Scene | null)
   */
  public override getNextScene(): Scene | null {
    if (this.startNewGame === true) {
      return new SelectLevel(this.maxX, this.maxY, 0);
    }
    return null;
  }

  /**
   * Render the Menu.
   * @param HTMLCanvasElement canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawResizedImage(canvas, this.bgImage, 0, 0, this.maxX, this.maxY);
  }
}
