import type { GameObjects } from "phaser";
import {
	CommissionedOfficer,
	EnlistedPersonnel,
	NonCommissionedOfficer,
	PlayerRanks,
	promotionScore,
	type PlayerRank,
} from "./playerRank";

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

	isCommissionAvaliable(combo: number): boolean {
		if (
			this.rank.name === PlayerRanks.ENLISTED_PERSONNEL &&
			combo === promotionScore.하사 - 2
		) {
			return true;
		}

		if (
			this.rank.name === PlayerRanks.ENLISTED_PERSONNEL &&
			combo === promotionScore.소위 - 2
		) {
			return true;
		}

		return false;
	}
	isPromotionAvailable(combo: number): boolean {
		console.log(combo >= promotionScore[this.rank.level]);
		return combo >= promotionScore[this.rank.level];
	}

	promoteRank() {
		// 병사, 간부, 장교를 구분해줘야 함
		// 병사에서 완료하면 간부로 갈지 장교로 갈지 정해야함

		if (this.rank.level === EnlistedPersonnel.E_1) {
			this.setRank({ level: EnlistedPersonnel.E_2, name: this.rank.name });
		} else if (this.rank.level === EnlistedPersonnel.E_2) {
			this.setRank({ level: EnlistedPersonnel.E_3, name: this.rank.name });
		} else if (this.rank.level === EnlistedPersonnel.E_3) {
			this.setRank({ level: EnlistedPersonnel.E_4, name: this.rank.name });
		} else if (this.rank.level === NonCommissionedOfficer.E_5) {
			this.setRank({ level: NonCommissionedOfficer.E_6, name: this.rank.name });
		} else if (this.rank.level === NonCommissionedOfficer.E_6) {
			this.setRank({ level: NonCommissionedOfficer.E_7, name: this.rank.name });
		} else if (this.rank.level === NonCommissionedOfficer.E_7) {
			this.setRank({ level: NonCommissionedOfficer.E_8, name: this.rank.name });
		} else if (this.rank.level === NonCommissionedOfficer.E_8) {
			this.setRank({ level: NonCommissionedOfficer.W_1, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_1) {
			this.setRank({ level: CommissionedOfficer.O_2, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_2) {
			this.setRank({ level: CommissionedOfficer.O_3, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_3) {
			this.setRank({ level: CommissionedOfficer.O_4, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_4) {
			this.setRank({ level: CommissionedOfficer.O_5, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_5) {
			this.setRank({ level: CommissionedOfficer.O_6, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_6) {
			this.setRank({ level: CommissionedOfficer.O_7, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_7) {
			this.setRank({ level: CommissionedOfficer.O_8, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_8) {
			this.setRank({ level: CommissionedOfficer.O_9, name: this.rank.name });
		} else if (this.rank.level === CommissionedOfficer.O_9) {
			this.setRank({ level: CommissionedOfficer.O_10, name: this.rank.name });
		}
		/*
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

		*/
	}
}
