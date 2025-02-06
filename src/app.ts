import Tanks from './Tanks.js';

const wereldWinkel: Tanks = new Tanks(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  wereldWinkel.start();
});
