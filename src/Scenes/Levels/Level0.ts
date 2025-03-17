import TankObjects from '../../CanvasItems/TankTypes/TankObjects.js';
import WhiteTank from '../../CanvasItems/TankTypes/WhiteTank.js';
import Tanks from '../../Tanks.js';
import Level from './Level.js';

export default class Level0 extends Level {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground.src = 'assets/LevelBackgrounds/tanksWorld0Level0Background.png';
    this.levelMapForeground.src = 'assets/LevelForegrounds/tanksWorld0Level0Foreground.png';

    if (Tanks.multiplayer) {
      this.player1SpawnCoördinates = { x: 3, y: 17 };
    } else {
      this.player1SpawnCoördinates = { x: 4, y: 18 };
    }

    this.spawnTanks();

    this.collisionArray = [ // 1 equals solid tile
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
  }

  public spawnTanks(): void {
    this.player1.setSpawnPoint(this.player1SpawnCoördinates.x, this.player1SpawnCoördinates.y);

    const whiteTankSpriteSheet: HTMLImageElement = new Image();
    whiteTankSpriteSheet.src = 'assets/TankSprites/tanksWhiteTankSpriteSheet.png';
    const whiteTank1: WhiteTank = new WhiteTank(
      this.maxX,
      this.maxY,
      {
        image: whiteTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      3,
      8,
      'WhiteTank1',
      'Right');
    const whiteTank2: WhiteTank = new WhiteTank(
      this.maxX,
      this.maxY,
      {
        image: whiteTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      16,
      8,
      'WhiteTank2',
      'Down');
    const whiteTank3: WhiteTank = new WhiteTank(
      this.maxX,
      this.maxY,
      {
        image: whiteTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      20,
      8,
      'WhiteTank3',
      'Down');
    const whiteTank4: WhiteTank = new WhiteTank(
      this.maxX,
      this.maxY,
      {
        image: whiteTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      18,
      18,
      'WhiteTank4',
      'Up');

    this.objectArray.push(this.player1, whiteTank1, whiteTank2, whiteTank3, whiteTank4);
  }
}
