import Game from './Tools/Game.js';

import CanvasRenderer from './Tools/CanvasRenderer.js';
import KeyListener from './Tools/KeyListener.js';
import MouseListener from './Tools/MouseListener.js';

import Scene from './Scenes/Scene.js';
import Menu from './Scenes/Menu.js';

export default class Tanks extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  public static cols: number = 24;

  public static rows: number = 24;

  public static tileSize: number = 32;

  public static currentScene: Scene;

  public static multiplayer: boolean;

  public static levelReached: number;

  public static extraLevelReached: number;

  public maxX: number;

  public maxY: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;
    // if (window.innerHeight >= window.innerWidth) {
    //   this.canvas.height = window.innerWidth;
    //   this.canvas.width = window.innerWidth;
    // } else {
    //   this.canvas.height = window.innerHeight;
    //   this.canvas.width = window.innerHeight;
    // }
    // if (this.canvas.width > Tanks.cols * Tanks.tileSize) {
    //   this.canvas.width = Tanks.rows * Tanks.tileSize;
    // }
    // if (this.canvas.height > Tanks.rows * Tanks.tileSize) {
    //   this.canvas.height = Tanks.cols * Tanks.tileSize;
    // }

    this.canvas.width = 768;
    this.canvas.height = 768;

    this.keyListener = new KeyListener;
    this.mouseListener = new MouseListener(this.canvas);

    this.maxX = this.canvas.width;
    this.maxY = this.canvas.height;

    Tanks.currentScene = new Menu(this.maxX, this.maxY);

    Tanks.multiplayer = false;

    Tanks.levelReached = 0;
    Tanks.extraLevelReached = 0;
  }

  /**
   * Called from the Gameloop
   * Calls the processInput function of the currently loaded scene
   */
  public processInput(): void {
    Tanks.currentScene.processInput(this.keyListener, this.mouseListener);
  }

  /**
   * Called from the Gameloop
   * Calls the update function of the currently loaded scene
   * @param elapsed time since last frame in ms
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    Tanks.currentScene.update(elapsed);
    const nextScene: null | Scene = Tanks.currentScene.getNextScene();

    if (nextScene != null) {
      Tanks.currentScene = nextScene;
    }

    return true;
  }

  /**
   * Called from the Gameloop
   * Calls the render function of the currently loaded scene
   * @param canvas space on which the game is drawn
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    Tanks.currentScene.render(this.canvas);
  }
}
