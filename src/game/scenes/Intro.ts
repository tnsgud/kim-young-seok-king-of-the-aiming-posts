import { Scene } from "phaser";
import { screenCenterX, screenCenterY, screenWidth } from "../main";

export class Intro extends Scene {
	constructor(private startButton: Phaser.GameObjects.Text) {
		super("Intro");
	}

	preload() {}

	create() {
		// Title
		this.add
			.text(screenCenterX, screenCenterY, "겨냥대 왕 김영석")
			.setOrigin(0.5, 0.5);

		// Start Button
		this.startButton = this.add
			.text(screenCenterX, screenCenterY + 100, "시작하기")
			.setOrigin(0.5, 0.5);
		this.startButton.setInteractive();

		const enterKey = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.ENTER,
		);

		enterKey?.on("down", () => {
			const playerName = prompt("What is your name?");

			this.scene.start("Main", { playerName });
		});

		this.startButton.on("pointerdown", () => {
			const playerName = prompt("What is your name?");

			this.scene.start("Main", { playerName });
		});
	}
}
