import { Scene } from 'phaser';

export class Game extends Scene {
    constructor (private startButton:Phaser.GameObjects.Text) {
        super('Game');
    }

    preload () {
    }

    create () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Title
        this.add.text(screenCenterX, screenCenterY, "겨냥대 왕 김영석").setOrigin(0.5, 0.5)

        // Start Button
        this.startButton = this.add.text(screenCenterX, screenCenterY + 100, '시작하기').setOrigin(0.5, 0.5);
        this.startButton.setInteractive()

        this.startButton.on('pointerdown', () => this.scene.start('Game2'))
    }
}
