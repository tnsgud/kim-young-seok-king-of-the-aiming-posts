/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { Scene } from "phaser";

import { Player } from "../player";
import { screenCenterX, screenCenterY } from "../main";
import { Direction, directionText } from "../direction";
import { EnlistedPersonnel, PlayerRanks } from "../playerRank";

export class Main extends Scene {
	constructor(
		private player: Player,
		private currentIndex: number,
		private currentCombo: number,
		private maxCombo: number,
		private notes: Direction[],
		private comboText: Phaser.GameObjects.Text,
		private resultText: Phaser.GameObjects.Text,
		private rankText: Phaser.GameObjects.Text,
		private noteImages: Phaser.GameObjects.Image[],
		private heartImages: Phaser.GameObjects.Image[],
		private heartCount: number,
	) {
		super("Main");

		this.player = new Player();
	}

	init(data: { playerName: string }) {
		this.player.setName(data.playerName);
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
		if (this.noteImages.length !== 0) {
			for (let i = 0; i < this.noteImages.length; i++) {
				this.noteImages[i].destroy();
			}
		}

		this.currentIndex = 0;
		this.notes = [];
		this.noteImages = [];

		for (let i = 0; i < Math.min(length, 10); i++) {
			const direction = Math.floor(Math.random() * 4);
			this.notes.push(direction);
		}

		for (let i = 0; i < this.notes.length; i++) {
			this.noteImages.push(
				this.add
					.image(50 * i + 50, 100, directionText[this.notes[i]])
					.setOrigin(0.5, 0.5),
			);
		}
	}

	check(direction: Direction) {
		if (this.notes[this.currentIndex] !== direction) {
			this.resultText.setText("No!");
			this.cameras.main.shake(400, 0.009);
			this.heartImages[3 - this.heartCount--].setTexture("heart");
			this.currentCombo = 0;
			this.createCombo(4);

			if (this.heartCount === 0) {
				this.scene.start("Over", {
					score: this.maxCombo,
					playerName: this.player,
				});
			}

			return;
		}

		this.resultText.setText("Good!");
		this.noteImages[this.currentIndex++].setAlpha(0.5);
		this.currentCombo++;
		this.maxCombo =
			this.maxCombo > this.currentCombo ? this.maxCombo : this.currentCombo;

		this.tweens.add({
			targets: this.player.getSprite(),
			duration: 50,
			delay: 0,
			y: {
				from: this.player.getSprite().y - 5,
				to: this.player.getSprite().y + 10,
			},
			yoyo: true,
			repeat: 2,
		});

		this.comboText.setText(`${this.currentCombo}\nCombo!`);

		if (this.notes.length === this.currentIndex) {
			this.upgratePlayerClass();

			this.createCombo(
				this.notes.length +
					(this.notes.length ** 2 * 2 <= this.currentCombo ? 1 : 0),
			);
		}
	}

	upgratePlayerClass() {
		const { name, level } = this.player.getRank();
		if (name === PlayerRanks.ENLISTED_PERSONNEL) {
			if (level === EnlistedPersonnel.E_1 && this.currentCombo >= 10) {
				this.player.setRank({
					name: PlayerRanks.ENLISTED_PERSONNEL,
					level: EnlistedPersonnel.E_2,
				});
				return;
			}
			if (level === EnlistedPersonnel.E_2 && this.currentCombo >= 30) {
				this.player.setRank({
					name: PlayerRanks.ENLISTED_PERSONNEL,
					level: EnlistedPersonnel.E_3,
				});
				return;
			}
			if (level === EnlistedPersonnel.E_3 && this.currentCombo >= 50) {
				this.player.setRank({
					name: PlayerRanks.ENLISTED_PERSONNEL,
					level: EnlistedPersonnel.E_4,
				});
				return;
			}
		}

		this.rankText.setText(`계급: ${this.player.getRank().level}`);
	}

	create() {
		// init
		this.currentCombo = 0;
		this.maxCombo = 0;
		this.maxCombo = 0;
		this.currentCombo = 0;
		this.currentIndex = 0;
		this.notes = [];
		this.noteImages = [];
		this.heartCount = 3;
		this.heartImages = [];
		// Player init
		this.player.setRank({
			name: PlayerRanks.ENLISTED_PERSONNEL,
			level: EnlistedPersonnel.E_1,
		});
		this.player.setSprite(
			this.add.sprite(screenCenterX, screenCenterY, "player"),
		);

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

		// Combo
		this.comboText = this.add
			.text(screenCenterX - 150, screenCenterY - 300, "0\nCombo!", {
				align: "center",
				lineSpacing: 10,
			})
			.setOrigin(0.5, 0.5);

		// Rank
		this.rankText = this.add
			.text(
				screenCenterX + 150,
				screenCenterY - 300,
				`계급: ${this.player.getRank().level}`,
				{
					align: "center",
				},
			)
			.setOrigin(0.5, 0.5);

		// Result
		this.resultText = this.add
			.text(screenCenterX, screenCenterY + 200, "")
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
