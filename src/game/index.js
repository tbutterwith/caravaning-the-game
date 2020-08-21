import Phaser from "phaser";
import CaravanParking from  './scenes/parking'

const gameConfig = {
	width: 800,
	height: 600,
	type: Phaser.AUTO,
	parent: "content",
  title: "Caravaning: The Game",
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 0
      },
      debug: true,
    }
  }
};

export default class CarvaningGame extends Phaser.Game {
	constructor(config) {
    super(config);
    
    console.log(CaravanParking.Name)

		this.scene.add(CaravanParking.Name, CaravanParking);
		this.scene.start(CaravanParking.Name);
	}
}

window.onload = () => {
	var game = new CarvaningGame(gameConfig);
};