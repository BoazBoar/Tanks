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
import Symbol from '../../Symbol.js';

export default abstract class Level extends Scene {
  protected bulletCollisionArray: number[];

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

  protected numberOfTanksDestroyed: number;

  protected levelState: string;

  protected waitTimer: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.bulletCollisionArray = this.collisionArray;
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
    this.numberOfTanksDestroyed = 0;

    // Ongoing = run as normal, Complete = show results screen, Ended = go to levelselect with succes, Failed = show defeat screen, Aborted = go to levelselect with failure, Restart = replay the level
    this.levelState = 'Ongoing';
    this.waitTimer = 1000;
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
      if ((keyListener.keyPressed(KeyListener.KEY_SPACE) || mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) && this.waitTimer <= 0) {
        this.levelState = 'Ended';
      }
    } else if (this.levelState === 'Failed') {
      if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT) && this.waitTimer <= 0) {
        if (this.leaveButton.isCollidingWithCursor(mouseListener)) {
          this.levelState = 'Aborted';
        } else if (this.againButton.isCollidingWithCursor(mouseListener)) {
          this.levelState = 'Restart';
        }
      }
    }
    if (keyListener.keyPressed(KeyListener.KEY_M)) {
      this.levelState = 'Aborted';
    }
  }

  public override update(elapsed: number): void {
    // Only if the level is still being played
    if (this.levelState === 'Ongoing') {
      for (const object of this.objectArray) {
        object.update(elapsed);
        // For every bullet inside the objectArray
        if (object instanceof BulletObject) {
          for (const checkObject of this.objectArray) {
            if (object.isCollidingWithItem(checkObject)) {
              // If a bullet collides with a tank
              if (checkObject instanceof TankObjects) {
                if (object.getOwner() !== checkObject.getName() || object.getGracePeriod() <= 0) {
                  console.log(object.getName() + ' collided with: ' + checkObject.getName());
                  this.numberOfTanksDestroyed += 1;
                  // TODO implement check for player2
                  // If it wasn't a player that was destroyed reduce the amount of enemy tanks left
                  if (!(checkObject instanceof Player1)) {
                    if (Tanks.currentScene instanceof Level) {
                      Tanks.currentScene.changeNumberOfEnemyTanks(-1);
                    }
                  }
                  // If the bullet belonged to a player increase their kill count
                  if (object.getOwner() === 'Player1') {
                    this.player1.changeTanksDestroyed(1);
                  }
                  // Destroy both the bullet and the tank
                  object.setShouldBeDestroyed(true);
                  checkObject.setShouldBeDestroyed(true);
                }
                // If a bullet collides with a different bullet
              } else if (checkObject instanceof BulletObject && object !== checkObject) {
                console.log(object.getName() + ' collided with: ' + checkObject.getName());
                object.setShouldBeDestroyed(true);
                checkObject.setShouldBeDestroyed(true);
              }
            }
          }
          // If a bullet is destroyed give the original owner a bullet back
          if (object.getShouldBeDestroyed()) {
            for (const ownerObject of this.objectArray) {
              if (ownerObject instanceof TankObjects) {
                if (object.getOwner() === ownerObject.getName()) {
                  ownerObject.changeBulletsLeft(1);
                };
              }
            }
            this.objectArray.splice(this.objectArray.indexOf(object), 1);
          }
        }
        // For every tank inside the objectArray
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
    } else {
      this.waitTimer -= elapsed;
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

  /**
* Check if the given column & row would be a collision cell.
* Mostly used for blocking movement of GameObjects
*
* @param col horizontal value
* @param row vertical value
* @returns true if the cell is full, false if the cell is empty
*/
  public override checkBulletCollision(col: number, row: number): boolean {
    if (this.bulletCollisionArray[Tanks.cols * row + col] === 1) {
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

    // Victory screen should be drawn on top of everything
    // 3.76 used by the level title was determined by eye, not sure how to calculate otherwise
    if (this.levelState === 'Complete') {
      CanvasRenderer.drawImage(canvas, this.resultsScreen, (this.maxX / 2) - (this.resultsScreen.width / 2), (this.maxY / 2) - (this.resultsScreen.height / 2));
      CanvasRenderer.drawImage(canvas, this.levelTitle, (this.maxX / 2) - (this.levelTitle.width / 2), (this.maxY / 3.76) - (this.levelTitle.height / 2));
      // Show the amount of tanks destroyed by the player
      const symbolSpritesheet: HTMLImageElement = CanvasRenderer.loadNewImage('assets/SymbolsBeige.png');
      const tanksDestroyedPlayer1Array: Symbol[] = [new Symbol(
        symbolSpritesheet,
        480,
        400,
        1,
        this.player1.getTanksDestroyed().toLocaleString().at(0),
        0,
      ),
      new Symbol(
        symbolSpritesheet,
        480,
        400,
        1,
        this.player1.getTanksDestroyed().toLocaleString().at(1),
        1,
      )];
      for (let numberIndex: number = tanksDestroyedPlayer1Array.length - 1; numberIndex >= 0; numberIndex--) {
        const numberInput: Symbol = tanksDestroyedPlayer1Array[numberIndex];
        numberInput.render(canvas);
      }
      // Show the total amount of tanks destroyed
      const tanksDestroyedTotalArray: Symbol[] = [new Symbol(
        symbolSpritesheet,
        480,
        488,
        1,
        this.numberOfTanksDestroyed.toLocaleString().at(0),
        0,
      ),
      new Symbol(
        symbolSpritesheet,
        480,
        488,
        1,
        this.numberOfTanksDestroyed.toLocaleString().at(1),
        1,
      )];
      for (let numberIndex: number = tanksDestroyedTotalArray.length - 1; numberIndex >= 0; numberIndex--) {
        const numberInput: Symbol = tanksDestroyedTotalArray[numberIndex];
        numberInput.render(canvas);
      }
    }
    if (this.levelState === 'Failed') {
      CanvasRenderer.drawImage(canvas, this.defeatScreen, (this.maxX / 2) - (this.defeatScreen.width / 2), (this.maxY / 2) - (this.defeatScreen.height / 2));
      if (this.waitTimer <= 0) {
        this.againButton.render(canvas);
        this.leaveButton.render(canvas);
      }
    }

    // TODO DELETE
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let ctx: CanvasRenderingContext2D;
    if (context === null) {
      throw new Error('2d context not found');
    } else {
      ctx = context;
    }
    // this.drawCollisionMap(ctx);
  }

  public drawDefeatScreen(canvas: HTMLCanvasElement): void {

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
        if (this.checkBulletCollision(col, row) === true) {
          ctx.fillStyle = 'green';
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
