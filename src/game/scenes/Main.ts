/** biome-ignore-all assist/source/organizeImports: 왜 하라는지 모르겠음 */
import { Scene } from "phaser";
import { Player } from "../player";
import { Direction, directionText } from "../direction";
import { screenCenterX, screenCenterY, screenWidth } from "../main";
import {
  CommissionedOfficer,
  EnlistedPersonnel,
  NonCommissionedOfficer,
  PlayerRanks,
  promotionScore,
} from "../playerRank";

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
    private dialogActive: boolean,
    private refusal: boolean
  ) {
    super("Main");

    this.dialogActive = false;
    this.refusal = false;
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

    const width = screenWidth - 120;

    for (let i = 0; i < this.notes.length; i++) {
      if (i === 0) {
        this.noteImages.push(
          this.add.image(60, 100, directionText[this.notes[i]])
        );
        continue;
      }

      if (i === this.notes.length - 1) {
        this.noteImages.push(
          this.add
            .image(370, 100, directionText[this.notes[i]])
            .setOrigin(0.5, 0.5)
        );
        continue;
      }

      this.noteImages.push(
        this.add
          .image(
            (width / (this.notes.length - 1)) * i + 60,
            100,
            directionText[this.notes[i]]
          )
          .setOrigin(0.5, 0.5)
      );
    }
  }

  comboMiss() {
    this.resultText.setText("No!");
    this.cameras.main.shake(400, 0.009);
    this.heartImages[3 - this.heartCount--].setTexture("heart");
    this.currentCombo = 0;
    this.createCombo(4);

    if (this.heartCount === 0) {
      this.scene.start("Over", {
        score: this.maxCombo,
        player: this.player,
      });
    }
  }

  comboGood() {
    this.resultText.setText("Good!");
    this.noteImages[this.currentIndex++].setAlpha(0.5);
    this.maxCombo =
      this.maxCombo > ++this.currentCombo ? this.maxCombo : this.currentCombo;

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
  }

  createDialog(options: {
    closeButtonAction: () => void;
    messageText: string;
    buttonText: string;
    buttonAction: () => void;
  }) {
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.7); // 검은색, 투명도 70%
    background.fillRect(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );

    // 다이얼로그 창 (사각형)
    const dialogBox = this.add.graphics();
    const boxWidth = 400;
    const boxHeight = 200;
    const boxX = (this.cameras.main.width - boxWidth) / 2;
    const boxY = (this.cameras.main.height - boxHeight) / 2;

    dialogBox.fillStyle(0xffffff, 1);
    dialogBox.fillRect(boxX, boxY, boxWidth, boxHeight);

    const closeText = this.add
      .text(boxX + boxWidth - 20, boxY + 10, "X", {
        color: "#000000",
      })
      .setInteractive();

    closeText.on("pointerdown", () => {
      options.closeButtonAction();
      destry();
    });

    const message = this.add
      .text(this.cameras.main.centerX, boxY + 50, options.messageText, {
        fontSize: "24px",
        color: "#000",
        align: "center",
        wordWrap: { width: boxWidth - 40 },
      })
      .setOrigin(0.5, 0.5);

    const exitButton = this.add
      .text(this.cameras.main.centerX, boxY + 150, options.buttonText, {
        fontSize: "20px",
        color: "#000",
        backgroundColor: "#ddd",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    // 버튼에 클릭 이벤트 추가
    exitButton.on("pointerdown", () => {
      options.buttonAction();
      destry();
    });

    function destry() {
      background.destroy();
      dialogBox.destroy();
      closeText.destroy();
      message.destroy();
      exitButton.destroy();
    }
  }

  check(direction: Direction) {
    if (this.dialogActive) {
      return;
    }

    if (this.notes[this.currentIndex] !== direction) {
      this.comboMiss();

      return;
    }

    this.comboGood()
    this.comboText.setText(`${this.currentCombo}\nCombo!`);

    if (this.refusal && this.player.isCommissionAvaliable(this.maxCombo)) {
      this.dialogActive = true;
      const isNonCommissionOfficer = this.maxCombo === promotionScore.하사 - 2;

      const closeButtonAction = () => {
        this.dialogActive = false;
        this.refusal = true;
      };
      const buttonAction = () => {
        this.dialogActive = false;

        if (isNonCommissionOfficer) {
          this.player.setRank({
            name: PlayerRanks.NON_COMMISSIONED_OFFICER,
            level: NonCommissionedOfficer.E_5,
          });
        } else {
          this.player.setRank({
            name: PlayerRanks.COMMISSIONED_OFFICER,
            level: CommissionedOfficer.O_1,
          });
        }

        this.rankText.setText(`계급: ${this.player.getRank().level}`);
      };

      this.createDialog({
        closeButtonAction,
        messageText: `${
          isNonCommissionOfficer ? "하사" : "소위"
        } 로 임관하시겠습니까?`,
        buttonText: "임관하기",
        buttonAction,
      });
    }

    if (this.player.isPromotionAvailable(this.maxCombo)) {
      if (
        !this.refusal &&
        this.player.getRank().level === EnlistedPersonnel.E_4
      ) {
        const closeButtonAction = () => {
          this.dialogActive = false;
          this.refusal = true;
        };
        const buttonAction = () => {
          this.dialogActive = false;
          this.scene.start("Over", {
            score: this.currentCombo,
            player: this.player,
          });
        };

        this.createDialog({
          closeButtonAction,
          messageText: "축하합니다! 전역할 수 있습니다!",
          buttonText: "전역하기",
          buttonAction,
        });
        return;
      }

      this.player.promoteRank();
      this.rankText.setText(`계급: ${this.player.getRank().level}`);
    }

    if (this.notes.length === this.currentIndex) {
      this.createCombo(
        this.notes.length +
          (this.notes.length ** 2 * 2 <= this.currentCombo ? 1 : 0)
      );
    }
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
      this.add.sprite(screenCenterX, screenCenterY, "player")
    );

    // PC input
    const downArrow = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    const leftArrow = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    const rightArrow = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    const upArrow = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );

    downArrow?.on("down", () => this.check(Direction.DOWN));
    leftArrow?.on("down", () => this.check(Direction.LEFT));
    rightArrow?.on("down", () => this.check(Direction.RIGHT));
    upArrow?.on("down", () => this.check(Direction.UP));

    // Moblie input
    for (let i = 0; i < 4; i++) {
      const button = this.add
        .sprite(50 + i * 100, screenCenterY + 400, directionText[i])
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
        }
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
        "heart_fill"
      );

      this.heartImages.push(image);
    }

    this.createCombo(4);
  }
}
