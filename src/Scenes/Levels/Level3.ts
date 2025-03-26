import BrownTank from '../../CanvasItems/TankTypes/BrownTank.js';
import Tanks from '../../Tanks.js';
import Scene from '../Scene.js';
import SelectLevel from '../SelectLevel.js';
import Level from './Level.js';

export default class Level3 extends Level {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground.src = 'assets/LevelBackgrounds/tanksWorld1Level3Background.png';
    this.levelMapForeground.src = 'assets/LevelForegrounds/tanksWorld1Level3Foreground.png';
    this.levelTitle.src = 'assets/LevelTitles/World1Level3Title.png';

    if (Tanks.multiplayer) {
      this.player1SpawnCoördinates = { x: 9, y: 13 };
    } else {
      this.player1SpawnCoördinates = { x: 12, y: 13 };
    }

    this.spawnTanks();

    this.collisionArray = [ // 1 equals solid tile
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
      8,
      5,
      'BrownTank1',
      'RightDown');
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
      19,
      13,
      'BrownTank2',
      'LeftUp');
    const brownTank3: BrownTank = new BrownTank(
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
      18,
      'BrownTank3',
      'Left');
    const brownTank4: BrownTank = new BrownTank(
      this.maxX,
      this.maxY,
      {
        image: brownTankSpriteSheet,
        x: 0,
        y: 0,
        width: 30,
        height: 28
      },
      4,
      15,
      'BrownTank4',
      'RightDown');

    this.objectArray.push(this.player1, brownTank1, brownTank2, brownTank3, brownTank4);
    this.numberOfEnemyTanks = 4;
  }

  public override getNextScene(): Scene | null {
    if (this.levelState === 'Ended' || this.levelState === 'Aborted') {
      if (Tanks.levelReached <= 3 && this.levelState === 'Ended') {
        Tanks.levelReached = 4;
      }
      return new SelectLevel(this.maxX, this.maxY, 1);
    } else if (this.levelState === 'Restart') {
      return new Level3(this.maxX, this.maxY);
    }
    return null;
  }
}
