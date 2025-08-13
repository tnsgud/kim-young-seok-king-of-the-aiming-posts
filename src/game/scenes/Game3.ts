import { Scene } from "phaser";

export class Game3 extends Scene {
	constructor(
		private score: number,
		private playerName: string,
	) {
		super("Game3");
	}

	init(data: { score: number; playerName: string }) {
		this.score = data.score;
		this.playerName = data.playerName;

		console.log(data);
	}

	create() {
		const screenCenterX =
			this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY =
			this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.add
			.text(screenCenterX, screenCenterY, "Game Over")
			.setOrigin(0.5, 0.5);

		this.add
			.text(screenCenterX, screenCenterY + 50, this.playerName)
			.setOrigin(0.5, 0.5);
		this.add
			.text(screenCenterX, screenCenterY + 100, `Score: ${this.score}`)
			.setOrigin(0.5, 0.5);
	}
}
