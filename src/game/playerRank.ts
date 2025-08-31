export enum PlayerRanks {
	ENLISTED_PERSONNEL = "enlistedPersonnel",
	NON_COMMISSIONED_OFFICER = "nonCommissionedOfficer",
	COMMISSIONED_OFFICER = "commissionedOfficer",
}

export type PlayerRank =
	| { name: PlayerRanks.ENLISTED_PERSONNEL; level: EnlistedPersonnel }
	| {
			name: PlayerRanks.NON_COMMISSIONED_OFFICER;
			level: NonCommissionedOfficer;
	  }
	| {
			name: PlayerRanks.COMMISSIONED_OFFICER;
			level: CommissionedOfficer;
	  };

export enum EnlistedPersonnel {
	E_1 = "이병",
	E_2 = "일병",
	E_3 = "상병",
	E_4 = "병장",
}

export enum NonCommissionedOfficer {
	E_5 = "하사",
	E_6 = "중사",
	E_7 = "상사",
	E_8 = "원사",
	W_1 = "준위",
}

export enum CommissionedOfficer {
	O_1 = "소위",
	O_2 = "중위",
	O_3 = "대위",
	O_4 = "소령",
	O_5 = "중령",
	O_6 = "대령",
	O_7 = "준장",
	O_8 = "소장",
	O_9 = "중장",
	O_10 = "대장",
}

export const promotionScore: {
	[key in
		| EnlistedPersonnel
		| NonCommissionedOfficer
		| CommissionedOfficer]: number;
} = {
	[EnlistedPersonnel.E_1]: 1,
	[EnlistedPersonnel.E_2]: 4,
	[EnlistedPersonnel.E_3]: 7,
	[EnlistedPersonnel.E_4]: 10,
	//
	[NonCommissionedOfficer.E_5]: 13,
	[NonCommissionedOfficer.E_6]: 190,
	[NonCommissionedOfficer.E_7]: 220,
	[NonCommissionedOfficer.E_8]: 250,
	[NonCommissionedOfficer.W_1]: 280,
	// 90씩 증가
	[CommissionedOfficer.O_1]: 15,
	[CommissionedOfficer.O_2]: 240,
	[CommissionedOfficer.O_3]: 330,
	[CommissionedOfficer.O_4]: 420,
	[CommissionedOfficer.O_5]: 510,
	[CommissionedOfficer.O_6]: 600,
	[CommissionedOfficer.O_7]: 690,
	[CommissionedOfficer.O_8]: 780,
	[CommissionedOfficer.O_9]: 870,
	[CommissionedOfficer.O_10]: 1000,
};
