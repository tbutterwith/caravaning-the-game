import Phaser from "phaser";
import colours from '../../shared/assets/colours'

import caravanSprite from '../../game/assets/caravan_above.png'

const calculateVelocity = (angle, distance) => {
  const radians = (angle + 90) * (Math.PI/180);

  const x = distance * Math.cos(radians);
  const y = distance * Math.sin(radians);

  return {x, y};
}

export default class Parking extends Phaser.Scene {
  /**
	 * Unique name of the scene.
	 */
  static Name = "CaravanParking";
  
  caravanState = {
    rotation: 0,
    speed: 5,
  }

	preload() {
		this.load.image('caravan', caravanSprite);
	}

	create() {
		console.log(`started ${Parking.Name}`);
    this.drawScene();
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, 800, 600);
  }
  
  drawScene() {
    var background = new Phaser.Geom.Rectangle(0,0, 800, 600);
    var leftTrack = new Phaser.Geom.Rectangle(0, 145, 800, 15);
    var rightTrack = new Phaser.Geom.Rectangle(0, 170, 800, 15);
    var lightGreen = this.add.graphics({ fillStyle: { color: colours.LIGHT_GREEN } });
    var grey = this.add.graphics({ fillStyle: { color: colours.GREY }})
    lightGreen.fillRectShape(background);
    grey.fillRectShape(leftTrack).fillRectShape(rightTrack);

    this.caravan = this.matter.add.image(400, 150, "caravan");
    this.caravan.setFixedRotation()
    // this.caravan.setCollideWorldBounds(true);
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
      const angle = this.caravanState.rotation;
      const speed = -this.caravanState.speed;

      const { x, y } = calculateVelocity(angle, speed);
      this.caravan.setVelocityY(y);
      this.caravan.setVelocityX(x);
    }
    else if (this.cursors.down.isDown)
    {
      const angle = this.caravanState.rotation;
      const speed = this.caravanState.speed;

      const { x, y } = calculateVelocity(angle, speed);
      this.caravan.setVelocityY(y);
      this.caravan.setVelocityX(x);
    }
  }

  
}