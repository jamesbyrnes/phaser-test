import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import mushroomImg from '../assets/mushroom.png';
import officeTileset from '../assets/officetileset1.png';
import schoolTileset from '../assets/schooltileset1.png';

class playGame extends Phaser.Scene {
  player;
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

    this.player = this.physics.add.sprite(400, 100, 'mushroom');
    this.player.scale = 0.1;

    this.cameras.main.startFollow(this.player);
  }
  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
    if (cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else {
      this.player.setVelocityY(0);
    }

  }
}

export default playGame;
