import { Scene } from "phaser";
import { screenCenterX, screenCenterY } from "../main";

export class Intro extends Scene {
  constructor() {
    super("Intro");
  }

  preload() {
    //this.load.image("background", "assets/background.png");
    //this.load.image("game_logo", "assets/game_logo.png");
    //this.load.image("company_logo", "assets/coba_games_logo.png");
    this.load.image("intro", "assets/intro.webp")
  }

  create() {
    //this.add.image(0, 0, "background").setScale(0.42, 0.62).setOrigin(0, 0)
    //this.add.image(screenCenterX, 200, "game_logo").setScale(0.5, 0.4).setOrigin(0.5, 0.5)
    //this.add.image(screenCenterX-170, screenCenterY + 420, "company_logo").setScale(0.2, 0.2).setOrigin(0.5, 0.5)

    this.add.image(0, 0, "intro").setScale(0.45, 0.61).setOrigin(0, 0)

    // Start Button
    const text = this.add.text(0, 0, "시작하기", {
      fontSize: "25px",
      fontStyle: "bold",
    }).setOrigin(0.5, 0.5);
		const rectangle = this.add
			.rectangle(0,0, text.width+40, text.height+20, 0xfd305c)
			.setRounded()
			.setOrigin(0.5, 0.5);

		const startButton = this.add.container(screenCenterX, screenCenterY + 300, [
			rectangle,
			text,
		]);

		Phaser.Display.Align.In.Center(text, rectangle);

    rectangle.setInteractive();

    const enterKey = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    enterKey?.on("down", () => {
      const playerName = prompt("What is your name?");

      this.scene.start("Main", { playerName });
    });

    rectangle.on("pointerdown", () => {
      const playerName = prompt("What is your name?");

      this.scene.start("Main", { playerName });
    });
  }
}
