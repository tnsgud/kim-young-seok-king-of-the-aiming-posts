import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game, Scale, Types } from "phaser";
import { Game2 } from "./scenes/Game2";
import { Game3 } from "./scenes/Game3";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
	type: AUTO,
	width: 430,
	height: 932,
	parent: "game-container",
	backgroundColor: "#028af8",
	scale: {
		mode: Scale.FIT,
		autoCenter: Scale.CENTER_BOTH,
	},
	scene: [MainGame, Game2, Game3],
};

const StartGame = (parent: string) => {
	return new Game({ ...config, parent });
};

export default StartGame;
