import CollisionBox from '../CanvasItems/CollisionBox.js';
import CanvasRenderer from '../Tools/CanvasRenderer.js';
import KeyListener from '../Tools/KeyListener.js';
import MouseListener from '../Tools/MouseListener.js';
import Scene from './Scene.js';

export default class SelectLevel extends Scene {
  private levelSelectionArray: CollisionBox[];

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.bgImage.src = 'assets/LevelSelection/tanskLevelSelectionTutorial.png';
    this.levelSelectionArray = [];
  }

  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.cursor.setPosition(mouseListener.getMousePosition());
  }

  public override update(elapsed: number): void {

  }

  public override getNextScene(): Scene | null {
    return null;
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawResizedImage(canvas, this.bgImage, 0, 0, this.maxX, this.maxY);

    // Always render the cursor on top of everything else
    this.cursor.render(canvas);
  }
}
