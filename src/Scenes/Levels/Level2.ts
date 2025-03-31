import BrownTank from '../../CanvasItems/TankTypes/BrownTank.js';
import Tanks from '../../Tanks.js';
import Scene from '../Scene.js';
import SelectLevel from '../SelectLevel.js';
import Level from './Level.js';

export default class Level2 extends Level {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground.src = 'assets/LevelBackgrounds/tanksWorld1Level2Background.png';
    this.levelMapForeground.src = 'assets/LevelForegrounds/tanksWorld1Level2Foreground.png';
    this.levelTitle.src = 'assets/LevelTitles/World1Level2Title.png';

    if (Tanks.multiplayer) {
      this.player1SpawnCoördinates = { x: 3, y: 16 };
    } else {
      this.player1SpawnCoördinates = { x: 4, y: 17 };
    }

    this.spawnTanks();

    this.collisionArray = [ // 1 equals solid tile
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    this.bulletCollisionArray = this.collisionArray;
  }

  public spawnTanks(): void {
    this.player1.setSpawnPoint(this.player1SpawnCoördinates.x, this.player1SpawnCoördinates.y);

    const brownTankSpriteSheet: HTMLImageElement = new Image();
    brownTankSpriteSheet.src = 'assets/TankSprites/tanksBrownTankSpriteSheet.png';
    const brownTank1: BrownTank = new BrownTank(
      this.maxX,
      this.maxY,
      {
        image: brownTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      19,
      14,
      'BrownTank1',
      'Left');
    const brownTank2: BrownTank = new BrownTank(
      this.maxX,
      this.maxY,
      {
        image: brownTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      17,
      9,
      'BrownTank2',
      'LeftDown');

    this.objectArray.push(this.player1, brownTank1, brownTank2);
    this.numberOfEnemyTanks = 2;
  }

  public override getNextScene(): Scene | null {
    if (this.levelState === 'Ended' || this.levelState === 'Aborted') {
      if (Tanks.levelReached <= 2 && this.levelState === 'Ended') {
        Tanks.levelReached = 3;
      }
      return new SelectLevel(this.maxX, this.maxY, 1);
    } else if (this.levelState === 'Restart') {
      return new Level2(this.maxX, this.maxY);
    }
    return null;
  }
}
