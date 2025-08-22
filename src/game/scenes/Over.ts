import { Scene } from "phaser";

export class Over extends Scene {
	constructor(
		private score: number,
		private playerName: string,
	) {
		super("Over");
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

		const rectangle = this.add
			.rectangle(0, 0, 120, 30, 0x000000)
			.setRounded()
			.setOrigin(0.5, 0.5);
		const text = this.add.text(0, 0, "Restart ?").setOrigin(0.5, 0.5);

		const container = this.add.container(screenCenterX, screenCenterY + 150, [
			rectangle,
			text,
		]);

		Phaser.Display.Align.In.Center(text, rectangle);

		rectangle.setInteractive();
		rectangle.on("pointerdown", () => this.scene.start("Game"));
	}
}
