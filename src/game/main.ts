import { Intro } from "./scenes/Intro";
import { AUTO, Game, Scale, Types } from "phaser";
import { Main } from "./scenes/Main";
import { Over } from "./scenes/Over";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
export const screenWidth = 430;
export const screenHeight = 932;
export const screenCenterX = screenWidth / 2;
export const screenCenterY = screenHeight / 2;

const config: Types.Core.GameConfig = {
	type: AUTO,
	width: screenWidth,
	height: screenHeight,
	parent: "game-container",
	backgroundColor: "#028af8",
	scale: {
		mode: Scale.FIT,
		autoCenter: Scale.CENTER_BOTH,
	},
	scene: [Intro, Main, Over],
};

const StartGame = (parent: string) => {
	return new Game({ ...config, parent });
};

export default StartGame;
