import Level from './Level';

export default class Level1 extends Level {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.levelMapBackground.src = 'assets/LevelBackgrounds/tanksLevel1Background.png';
    this.levelMapForeground.src = 'assets/LevelForegrounds/tanksLevel1Foreground.png';
  }
}
