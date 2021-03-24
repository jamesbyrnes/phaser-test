import Phaser from "phaser";

import Player from './player';

import logoImg from "../assets/logo.png";
import mushroomImg from '../assets/mushroom.png';
import officeTileset from '../assets/officetileset1.png';
import schoolTileset from '../assets/schooltileset1.png';

class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.image("logo", logoImg);
    this.load.image('mushroom', mushroomImg);
    this.load.spritesheet('office1', officeTileset, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('school1', schoolTileset, { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    const level = new Array(256).fill(
      new Array(256).fill(12)
    );

    const map = this.make.tilemap({data: level});
    const tiles = map.addTilesetImage('schooltileset1', 'school1');
    const layer = map.createLayer(0, tiles);

    this.player1 = new Player({
      scene: this,
      x: 400,
      y: 200,
      keys: {
        left: 'A',
        right: 'D',
        up: 'W',
        down: 'S',
      }
    });

    this.player2 = new Player({
      scene: this,
      x: 0,
      y: 0,
      keys: {
        left: 'H',
        right: 'L',
        up: 'K',
        down: 'J',
      }
    });

    this.player1.tint = 0xf00000;
    this.player2.tint = 0x00f000;

    this.displayText = this.add.text(
      0,
      0,
      'hello world',
      { color: '#f00' }
    );

    this.cameras.main.startFollow(this.player1);
  }
  update() {
    this.player1.update();
    this.player2.update();

    const playerDistance = Phaser.Math.Distance.Squared(
      this.player1.x,
      this.player1.y,
      this.player2.x,
      this.player2.y,
    );

    if (playerDistance < 10000 && !this.displayText.visible) {
      this.displayText.setVisible(true);
    } else if (this.displayText.visible) {
      this.displayText.setVisible(false);
    }
  }
}

export default playGame;
