import BulletObject from '../../CanvasItems/BulletTypes/BulletObject.js';
import CanvasItem from '../../CanvasItems/CanvasItem.js';
import CollisionBox from '../../CanvasItems/CollisionBox.js';
import Player1 from '../../CanvasItems/TankTypes/Player1.js';
import TankObjects from '../../CanvasItems/TankTypes/TankObjects.js';
import Tanks from '../../Tanks.js';
import CanvasRenderer from '../../Tools/CanvasRenderer.js';
import KeyListener from '../../Tools/KeyListener.js';
import MouseListener from '../../Tools/MouseListener.js';
import { Vector2 } from '../../Types.js';
import Scene from '../Scene.js';

export default abstract class Level extends Scene {
  protected levelMapBackground: HTMLImageElement;

  protected levelMapForeground: HTMLImageElement;

  protected levelTitle: HTMLImageElement;

  protected resultsScreen: HTMLImageElement;

  protected defeatScreen: HTMLImageElement;

  protected leaveButton: CanvasItem;

  protected againButton: CanvasItem;

  protected player1SpawnCoördinates: Vector2;

  protected player1: Player1;

  protected player2SpawnCoördinates: Vector2;

  protected numberOfEnemyTanks: number;

  protected levelState: string;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground = new Image();
    this.levelMapBackground.src = 'assets/SelectLevelIcons.png';
    this.levelMapForeground = new Image();
    this.levelMapForeground.src = 'assets/SelectLevelIcons.png';
    this.levelTitle = new Image();
    this.levelTitle.src = '';
    this.resultsScreen = new Image();
    this.resultsScreen.src = 'assets/ResultScreens/tanksVictoryResultsScreen.png';
    this.defeatScreen = new Image();
    this.defeatScreen.src = 'assets/ResultScreens/tanksDefeatScreen.png';
    this.leaveButton = new CollisionBox(maxX, maxY, (this.maxX / 2.67), (this.maxY / 1.848), 176, 64, 'assets/ResultScreens/tanksLeaveButton.png');
    this.againButton = new CollisionBox(maxX, maxY, (this.maxX / 1.6), (this.maxY / 1.848), 176, 64, 'assets/ResultScreens/tanksAgainButton.png');

    this.player1SpawnCoördinates = { x: 0, y: 0 };
    const player1SpriteSheet: HTMLImageElement = new Image();
    player1SpriteSheet.src = 'assets/TankSprites/tanksBasePlayer1TanksSpriteSheet.png';
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
      this.player1SpawnCoördinates.x, //X Coordinate
      this.player1SpawnCoördinates.y, //Y Coordinate
      'Player1',
      'Still',
    );

    this.player2SpawnCoördinates = { x: 0, y: 0 };
    // TODO: Player 2 here

    this.numberOfEnemyTanks = 0;
    // Ongoing = run as normal, Complete = show results screen, Ended = go to levelselect with succes, Failed = show defeat screen, Aborted = go to levelselect with failure, Restart = replay the level
    this.levelState = 'Ongoing';
  }

  public abstract spawnTanks(): void;

  public override processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    if (this.levelState === 'Ongoing') {
      const calcAngleX: number = mouseListener.getMousePosition().x - ((this.player1.getPosX() + (this.player1.getBarrelWidth() / 2)));
      const calcAngleY: number = mouseListener.getMousePosition().y - ((this.player1.getPosY() + (this.player1.getBarrelHeight() / 2)));
      this.player1.setBarrelAngle(calcAngleX, calcAngleY);

      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT) || keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.player1.shoot();
      }

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
      } else {
        this.player1.setMovementDirection('Still');
      }
    } else if (this.levelState === 'Complete') {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.levelState = 'Ended';
      }
    } else if (this.levelState === 'Failed') {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.leaveButton.isCollidingWithCursor(mouseListener)) {
          this.levelState = 'Aborted';
        } else if (this.againButton.isCollidingWithCursor(mouseListener)) {
          this.levelState = 'Restart';
        }
      }
    }
  }

  public override update(elapsed: number): void {
    if (this.levelState === 'Ongoing') {
      for (const object of this.objectArray) {
        object.update(elapsed);
        if (object instanceof BulletObject) {
          for (const checkObject of this.objectArray) {
            if (checkObject instanceof TankObjects) {
              if (object.getOwner() !== checkObject.getName()) {
                if (object.isCollidingWithItem(checkObject)) {
                  console.log(object.getName() + ' collided with: ' + checkObject.getName());

                  object.setShouldBeDestroyed(true);

                  // TODO implement check for player2
                  if (!(checkObject instanceof Player1)) {
                    if (Tanks.currentScene instanceof Level) {
                      Tanks.currentScene.changeNumberOfEnemyTanks(-1);
                    }
                  }
                  checkObject.setShouldBeDestroyed(true);
                }
              }
            }
          }
          if (object.getShouldBeDestroyed()) {
            if (object.getOwner() === 'Player1' || object.getOwner() === 'FreeFromPlayer1') {
              this.player1.changeBulletsLeft(1);
            }
            this.objectArray.splice(this.objectArray.indexOf(object), 1);
          }
        }
        if (object instanceof TankObjects) {
          if (object.getShouldBeDestroyed()) {
            this.objectArray.splice(this.objectArray.indexOf(object), 1);
          }
        }
      }

      if (this.numberOfEnemyTanks <= 0) {
        this.levelState = 'Complete';
      }
      if (this.player1.getShouldBeDestroyed()) {
        this.levelState = 'Failed';
      }
    }
  }

  public addToObjectArray(object: CanvasItem): void {
    this.objectArray.push(object);
  }

  public changeNumberOfEnemyTanks(change: number): void {
    this.numberOfEnemyTanks += change;
  }

  /**
 * Check if the given column & row would be a collision cell.
 * Mostly used for blocking movement of GameObjects
 *
 * @param col horizontal value
 * @param row vertical value
 * @returns true if the cell is full, false if the cell is empty
 */
  public override checkCollision(col: number, row: number): boolean {
    if (this.collisionArray[Tanks.cols * row + col] === 1) {
      return true;
    } else {
      return false;
    }
  }

  public override render(canvas: HTMLCanvasElement): void {
    // Background should always be drawn behind every other object
    CanvasRenderer.drawResizedImage(canvas, this.levelMapBackground, 0, 0, this.maxX, this.maxY);

    // render everything inside the objectArray
    for (const object of this.objectArray) {
      object.render(canvas);
    }

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

    // Victory screen should be drawn on top of everything
    // 3.76 used by the level title was determined by eye, not sure how to calculate otherwise
    if (this.levelState === 'Complete') {
      CanvasRenderer.drawImage(canvas, this.resultsScreen, (this.maxX / 2) - (this.resultsScreen.width / 2), (this.maxY / 2) - (this.resultsScreen.height / 2));
      CanvasRenderer.drawImage(canvas, this.levelTitle, (this.maxX / 2) - (this.levelTitle.width / 2), (this.maxY / 3.76) - (this.levelTitle.height / 2));
    }
    if (this.levelState === 'Failed') {
      CanvasRenderer.drawImage(canvas, this.defeatScreen, (this.maxX / 2) - (this.defeatScreen.width / 2), (this.maxY / 2) - (this.defeatScreen.height / 2));
      this.againButton.render(canvas);
      this.leaveButton.render(canvas);
    }
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
            (col * Tanks.tileSize),
            (row * Tanks.tileSize),
            Tanks.tileSize,
            Tanks.tileSize
          );
        }
      }
    }
  }
}
