import { Scene } from "phaser";

enum Direction {
	DOWN = 0,
	LEFT = 1,
	RIGHT = 2,
	UP = 3,
}

const directionText = ["down", "left", "right", "up"];

export class Game2 extends Scene {
	constructor(
		private currentIndex: number,
		private combo: Direction[],
		private comboImages: Phaser.GameObjects.Image[],
		private resultText: Phaser.GameObjects.Text,
		private score: number,
		private scoreText: Phaser.GameObjects.Text,
		private player: Phaser.GameObjects.Sprite,
		private heartCount: number,
		private heartImages: Phaser.GameObjects.Image[],
		private playerName: string,
	) {
		super("Game2");
	}

	init(data: { playerName: string }) {
		this.playerName = data.playerName;
	}

	preload() {
		this.load.image("player", "assets/test_player.jpg");

		this.load.svg("down", "assets/down-arrow.svg", { scale: 0.8 });
		this.load.svg("left", "assets/left-arrow.svg", { scale: 0.8 });
		this.load.svg("right", "assets/right-arrow.svg", { scale: 0.8 });
		this.load.svg("up", "assets/up-arrow.svg", { scale: 0.8 });

		this.load.svg("down-button", "assets/down-arrow.svg", { scale: 0.9 });
		this.load.svg("left-button", "assets/left-arrow.svg", { scale: 0.9 });
		this.load.svg("right-button", "assets/right-arrow.svg", { scale: 0.9 });
		this.load.svg("up-button", "assets/up-arrow.svg", { scale: 0.9 });

		this.load.svg("heart", "assets/heart.svg", { scale: 0.9 });
		this.load.svg("heart_fill", "assets/heart_fill.svg", { scale: 0.9 });
	}

	createCombo(length: number) {
		if (this.comboImages.length !== 0) {
			for (let i = 0; i < this.comboImages.length; i++) {
				this.comboImages[i].destroy();
			}
		}

		this.currentIndex = 0;
		this.combo = [];
		this.comboImages = [];

		for (let i = 0; i < length; i++) {
			const direction = Math.floor(Math.random() * 4);
			this.combo.push(direction);
		}

		for (let i = 0; i < this.combo.length; i++) {
			this.comboImages.push(
				this.add
					.image(50 * i + 50, 100, directionText[this.combo[i]])
					.setOrigin(0.5, 0.5),
			);
		}
	}

	check(direction: Direction) {
		if (this.combo[this.currentIndex] === direction) {
			this.resultText.setText("Good!");
			this.comboImages[this.currentIndex++].setAlpha(0.5);
			this.score++;

			this.tweens.add({
				targets: this.player,
				duration: 50,
				delay: 0,
				y: { from: this.player.y - 5, to: this.player.y + 10 },
				yoyo: true,
				repeat: 2,
			});
		} else {
			this.resultText.setText("No!");
			this.score--;
			this.cameras.main.shake(400, 0.009);
			this.heartImages[3 - this.heartCount--].setTexture("heart");
		}

		this.scoreText.setText(`Score: ${this.score}`);

		if (this.combo.length === this.currentIndex) {
			this.createCombo(this.combo.length);
		}

		if (this.heartCount === 0) {
			this.scene.start("Game3", {
				score: this.score,
				playerName: this.playerName,
			});
		}
	}

	create() {
		// init
		this.currentIndex = 0;
		this.combo = [];
		this.comboImages = [];
		this.score = 0;
		this.heartCount = 3;
		this.heartImages = [];

		const screenCenterX =
			this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY =
			this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.player = this.add.sprite(screenCenterX, screenCenterY, "player");

		// PC input
		const downArrow = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.DOWN,
		);
		const leftArrow = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.LEFT,
		);
		const rightArrow = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.RIGHT,
		);
		const upArrow = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.UP,
		);

		downArrow?.on("down", () => this.check(Direction.DOWN));
		leftArrow?.on("down", () => this.check(Direction.LEFT));
		rightArrow?.on("down", () => this.check(Direction.RIGHT));
		upArrow?.on("down", () => this.check(Direction.UP));

		// Moblie input
		for (let i = 0; i < 4; i++) {
			const button = this.add
				.sprite(50 + i * 100, screenCenterY + 400, `${directionText[i]}-button`)
				.setOrigin(0.5, 0.5);

			button.setInteractive();
			button.on("pointerdown", () => this.check(i));
		}

		// Result
		this.resultText = this.add
			.text(screenCenterX, screenCenterY + 200, "")
			.setOrigin(0.5, 0.5);

		// Score
		this.scoreText = this.add
			.text(screenCenterX, screenCenterY + 300, `Score: ${this.score}`, {
				fontSize: 30,
			})
			.setOrigin(0.5, 0.5);

		// Heart
		for (let i = 0; i < 3; i++) {
			const image = this.add.image(
				screenCenterX + 125 + i * 25,
				50,
				"heart_fill",
			);

			this.heartImages.push(image);
		}
		this.createCombo(4);
	}
}
