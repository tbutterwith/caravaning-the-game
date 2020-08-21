import Phaser from "phaser";
import colours from '../../shared/assets/colours'

import caravanSprite from '../../game/assets/caravan_above.png'

export default class Parking extends Phaser.Scene {
  /**
	 * Unique name of the scene.
	 */
  static Name = "CaravanParking";
  
  caravanState = {
    rotation: 0,
    speed: 100,
  }

	preload() {
		this.load.image('caravan', caravanSprite);
	}

	create() {
		console.log(`started ${Parking.Name}`);
    this.drawScene();
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
  }
  
  drawScene() {
    var rect = new Phaser.Geom.Rectangle(0,0, 800, 600);
    var graphics = this.add.graphics({ fillStyle: { color: colours.LIGHT_GREEN } });
    graphics.fillRectShape(rect);

    this.caravan = this.physics.add.sprite(400, 150, "caravan");
  }

  update() {
    this.caravan.setVelocity(0);

    if (this.cursors.left.isDown)
    {
      this.caravanState.rotation = this.caravanState.rotation - 1;
      this.caravan.setAngle(this.caravanState.rotation);
    }
    else if (this.cursors.right.isDown)
    {
      this.caravanState.rotation = this.caravanState.rotation + 1;
      this.caravan.setAngle(this.caravanState.rotation);
    }
    else if (this.cursors.up.isDown)
    {
      const angle = this.caravanState.rotation + 90;
      const speed = -this.caravanState.speed;
      this.physics.velocityFromAngle(angle, speed, this.caravan.body.velocity)
    }
    else if (this.cursors.down.isDown)
    {
      const angle = this.caravanState.rotation + 90;
      const speed = this.caravanState.speed;
      this.physics.velocityFromAngle(angle, speed, this.caravan.body.velocity)
    }
  }
}