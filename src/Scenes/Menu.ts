import Scene from './Scene.js';
import KeyListener from '../Tools/KeyListener.js';
import MouseListener from '../Tools/MouseListener.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';
import CollisionBox from '../CanvasItems/CollisionBox.js';

export default class Menu extends Scene {
  private newGameButton: CollisionBox;

  private startNewGame: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.bgImage = CanvasRenderer.loadNewImage('assets/bgMainMenu.png');

    this.newGameButton = new CollisionBox(maxX, maxY, maxX / 2, maxY / 1.5, 256, 64, 'assets/NewGameButton.png');
    this.startNewGame = false;
  }

  /**
   * Process the input from the player.
   * @param KeyListener keyListener
   * @param MouseListener mouseListener
   */
  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.cursor.setPosition(mouseListener.getMousePosition());

    if (this.newGameButton.isCollidingWithCursor(mouseListener) && mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.startNewGame = true;
      console.log('click detected');
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
    // CanvasRenderer.drawResizedImage(canvas, this.bgImage, 0, 0, canvas.width, canvas.height);
    CanvasRenderer.fillCanvas(canvas, 'white');

    this.newGameButton.render(canvas);

    // Always render the cursor on top of everything else
    this.cursor.render(canvas);
  }
}
