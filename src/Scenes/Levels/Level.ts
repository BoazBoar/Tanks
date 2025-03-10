import CanvasItem from '../../CanvasItems/CanvasItem.js';
import Player1 from '../../CanvasItems/Player1.js';
import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import KeyListener from '../../Tools/KeyListener.js';
import MouseListener from '../../Tools/MouseListener.js';
import { Vector2 } from '../../Types.js';
import Scene from '../Scene.js';

export default abstract class Level extends Scene {
  protected levelMapBackground: HTMLImageElement;

  protected levelMapForeground: HTMLImageElement;

  protected player1SpawnCoördinates: Vector2;

  protected player1: Player1;

  protected levelComplete: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground = new Image();
    this.levelMapBackground.src = 'assets/SelectLevelIcons.png';
    this.levelMapForeground = new Image();
    this.levelMapForeground.src = 'assets/SelectLevelIcons.png';

    this.player1SpawnCoördinates = { x: 0, y: 0 };
    const player1SpriteSheet: HTMLImageElement = new Image();
    player1SpriteSheet.src = 'assets/tanksBasePlayer1TanksSpriteSheet.png';
    this.player1 = new Player1(
      maxX,
      maxY,
      {
        image: player1SpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      (Tanks.tileSize * this.player1SpawnCoördinates.x), //X Coordinate
      (Tanks.tileSize * this.player1SpawnCoördinates.y), //Y Coordinate
    );

    this.levelComplete = false;
  }

  public abstract spawnTanks(): void;

  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    this.cursor.setPosition(mouseListener.getMousePosition());

    if (keyListener.isKeyDown(KeyListener.KEY_RIGHT) && keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player1.setMovementDirection('RightUp');
    } else if (keyListener.isKeyDown(KeyListener.KEY_RIGHT) && keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player1.setMovementDirection('RightDown');
    } else if (keyListener.isKeyDown(KeyListener.KEY_LEFT) && keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player1.setMovementDirection('LeftUp');
    } else if (keyListener.isKeyDown(KeyListener.KEY_LEFT) && keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player1.setMovementDirection('LeftDown');
    } else if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player1.setMovementDirection('Right');
    } else if (keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player1.setMovementDirection('Up');
    } else if (keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player1.setMovementDirection('Down');
    } else if (keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player1.setMovementDirection('Left');
    }
  }

  public override update(elapsed: number): void {
    this.player1.update(elapsed);
  }

  /**
 * Check if the given column & row would be a collision cell.
 * Mostly used for blocking movement of GameObjects
 *
 * @param col horizontal value
 * @param row vertical value
 * @returns true if the cell is full, false if the cell is empty
 */
  public checkCollision(col: number, row: number): boolean {
    if (this.collisionArray[Tanks.cols * row + col] === 1) {
      return true;
    } else {
      return false;
    }
  }

  public override getNextScene(): Scene | null {
    return null;
  }

  public override render(canvas: HTMLCanvasElement): void {
    // Background should always be drawn behind every other object
    CanvasRenderer.drawResizedImage(canvas, this.levelMapBackground, 0, 0, this.maxX, this.maxY);

    // Draw the player
    this.player1.render(canvas);

    // Foreground should always be drawn in front of every other object
    CanvasRenderer.drawResizedImage(canvas, this.levelMapForeground, 0, 0, this.maxX, this.maxY);

    // TODO DELETE
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let ctx: CanvasRenderingContext2D;
    if (context === null) {
      throw new Error('2d context not found');
    } else {
      ctx = context;
    }
    // this.drawCollisionMap(ctx);

    // Always render the cursor on top of everything else
    this.cursor.render(canvas);
  }

  /**
* Debug feature: draw the collision map
*
* @param ctx the 2D rendering context of the canvas
*/
  public drawCollisionMap(ctx: CanvasRenderingContext2D): void {
    for (let row: number = 0; row < Tanks.rows; row++) {
      for (let col: number = 0; col < Tanks.cols; col++) {
        if (this.checkCollision(col, row) === true) {
          ctx.fillStyle = 'red';
          ctx.fillRect(
            (col * Tanks.tileSize) * Tanks.resizeFactor,
            (row * Tanks.tileSize) * Tanks.resizeFactor,
            Tanks.tileSize * Tanks.resizeFactor,
            Tanks.tileSize * Tanks.resizeFactor
          );
        }
      }
    }
  }
}
