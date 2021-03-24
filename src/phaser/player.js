import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
  constructor({
    scene,
    x,
    y,
    keys,
  }) {
    super(scene, x, y, 'mushroom');

    this.scene = scene;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.keys = this.scene.input.keyboard.addKeys({
      left: keys.left,
      right: keys.right,
      up: keys.up,
      down: keys.down,
    });

    this.displayWidth = 32;
    this.displayHeight = 32;
  }

  update() {
    if (this.keys.left.isDown) {
      this.body.setVelocityX(-160);
    } else if (this.keys.right.isDown) {
      this.body.setVelocityX(160);
    } else {
      this.body.setVelocityX(0);
    }
    if (this.keys.down.isDown) {
      this.body.setVelocityY(160);
    } else if (this.keys.up.isDown) {
      this.body.setVelocityY(-160);
    } else {
      this.body.setVelocityY(0);
    }
  }
}

export default Player;

