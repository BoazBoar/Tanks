import CanvasItem from '../../CanvasItems/CanvasItem.js';
import Player1 from '../../CanvasItems/Player1.js';
import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import KeyListener from '../../Tools/KeyListener.js';
import MouseListener from '../../Tools/MouseListener.js';
import Scene from '../Scene.js';

export default abstract class Level extends Scene {
  protected levelMapBackground: HTMLImageElement;

  protected levelMapForeground: HTMLImageElement;

  protected collisionArray: number[];

  protected objectArray: CanvasItem[];

  protected player1: Player1;

  protected levelComplete: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground = new Image();
    this.levelMapBackground.src = 'assets/SelectLevelIcons.png';
    this.levelMapForeground = new Image();
    this.levelMapForeground.src = 'assets/SelectLevelIcons.png';
    this.collisionArray = [];
    this.objectArray = [];

    const player1SpriteSheet: HTMLImageElement = new Image();
    player1SpriteSheet.src = 'assets/tanksBaseTanksSpriteSheet.png';
    this.player1 = new Player1(
      maxX,
      maxY,
      {
        image: player1SpriteSheet,
        x: 0,
        y: 0,
        width: 32,
        height: 32
      },
      Tanks.tileSize * 4, //X Coordinate
      Tanks.tileSize * 8, //Y Coordinate
    );

    this.levelComplete = false;
  }

  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {

  }

  public override update(elapsed: number): void {

  }

  public override getNextScene(): Scene | null {
    return null;
  }

  public override render(canvas: HTMLCanvasElement): void {
    // Background should always be drawn behind every other object
    CanvasRenderer.drawImage(canvas, this.levelMapBackground, 0, 0);

    // Draw the player
    this.player1.render(canvas);

    // Foreground should always be drawn in front of every other object
    CanvasRenderer.drawImage(canvas, this.levelMapForeground, 0, 0);
    // Always render the cursor on top of everything else
    this.cursor.render(canvas);
  }
}
