import Phaser from "phaser";
import colours from '../../shared/assets/colours'

import caravanSprite from '../../game/assets/caravan_above.png'
import carSprite from '../../game/assets/car_above.png'
import bushSprite from '../../game/assets/bush.png';
import CarvaningGame from "..";

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
  
  static carConfig = {
    speed: 3,
  };

  static caravanConfig = {
    speed: 1,
  }

  activeVehicle = {
    attached: true,
    name: '',
    vehicle: null,
    config: null,
  }

	preload() {
		this.load.image('caravan', caravanSprite);
		this.load.image('car', carSprite);
		this.load.image('bush', bushSprite);
	}

	create() {
		console.log(`started ${Parking.Name}`);
    this.drawScene();
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, 800, 600);

    this.bindKeyPresses();
  }
  
  drawScene() {
    // SCENERY
    var background = new Phaser.Geom.Rectangle(0,0, 800, 600);
    var leftTrack = new Phaser.Geom.Rectangle(0, 140, 800, 20);
    var rightTrack = new Phaser.Geom.Rectangle(0, 170, 800, 20);

    var lightGreen = this.add.graphics({ fillStyle: { color: colours.LIGHT_GREEN } });
    var grey = this.add.graphics({ fillStyle: { color: colours.GREY }})
    lightGreen.fillRectShape(background);
    grey.fillRectShape(leftTrack).fillRectShape(rightTrack);

    var bush = this.matter.add.image(763, 450, "bush", null, { isStatic: true });
    bush.setScale(1.5, 7)
    var bush = this.matter.add.image(400, 575, "bush", null, { isStatic: true });
    bush.setScale(16, 1)

    // VEHICLES
    this.caravan = this.matter.add.image(500, 150, "caravan", null, { 
      chamfer: { radius: [30, 30, 0, 0] },
      frictionAir: 0.2,
    });
    this.caravan.setFixedRotation();
    this.caravan.setAngle(-90);

    this.car = this.matter.add.image(400, 150, "car", null, {
      chamfer: { radius: 10 },
      frictionAir: 0.2,
    });
    this.car.setAngle(-90);

    this.activeVehicle = {
      name: 'car',
      vehicle: this.car,
      config: Parking.carConfig,
    };
  }

  update() {
    const { vehicle, config } = this.activeVehicle;

    vehicle.setVelocity(0);

    if (this.cursors.left.isDown)
    {
      vehicle.setAngle(vehicle.angle - 1);
    }
    else if (this.cursors.right.isDown)
    {
      vehicle.setAngle(vehicle.angle + 1);
    }
    
    if (this.cursors.up.isDown)
    {
      const speed = -config.speed;

      const { x, y } = calculateVelocity(vehicle.angle, speed);
      vehicle.setVelocityY(y);
      vehicle.setVelocityX(x);
    }
    else if (this.cursors.down.isDown)
    {
      const speed = config.speed;

      const { x, y } = calculateVelocity(vehicle.angle, speed);
      vehicle.setVelocityY(y);
      vehicle.setVelocityX(x);
    }
  }

  bindKeyPresses() {
    var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    var self = this;

    spaceKey.on('up', function (key, event) {
      event.stopPropagation();
      if(self.activeVehicle.name === 'car') {
        self.activeVehicle = {
          name: 'caravan',
          vehicle: self.caravan,
          config: Parking.caravanConfig,
        }
      } else {
        self.activeVehicle = {
          name: 'car',
          vehicle: self.car,
          config: Parking.carConfig,
        };
      }

    });
  }
  
}