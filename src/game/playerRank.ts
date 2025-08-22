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
