import type { GameObjects } from "phaser";
import type { PlayerRank } from "./playerRank";

export class Player {
	private name: string;
	private rank: PlayerRank;
	private sprite: GameObjects.Sprite;

	setName(name: string) {
		this.name = name;
	}

	getName(): string {
		return this.name;
	}

	setRank(rank: PlayerRank) {
		this.rank = rank;
	}
	getRank(): PlayerRank {
		return this.rank;
	}

	setSprite(sprite: GameObjects.Sprite) {
		this.sprite = sprite;
	}
	getSprite(): GameObjects.Sprite {
		return this.sprite;
	}
}
