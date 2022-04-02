import {SmcService} from "../smc";

export class StakingServiceV2 {

	static async fetchFee(): Promise<any> {
		return await SmcService.call({
			contract: SmcService.contractStakingV2,
			method: "fee",
		})
	}

	static async fetchPackages(): Promise<StakePackage[]> {
		const packages = await Promise.all(
			["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(async (value, index) => {
				const packageRes = await SmcService.call(
					{
						contract: SmcService.contractStakingV2,
						method: "getPackInfo",
					},
					value
				);
				
				const data: StakePackage = {
					id: `${value}`,
					name: packageRes.duration / 86400 + ' days',
					roi: +packageRes.interest,
					interest: packageRes.interest,
					numberOfDays: +packageRes.duration / 86400,
				  };
		
				return data;
			})
		);

		return packages.filter((v) => {
            return v.interest > 0;
        });
	}
}

export interface StakePackage {
	id: any;
	name: any;
	roi: number;
	interest: number,
	numberOfDays: number;
}

export interface UserStake {
	initial: number;
	reward: number;
	payAt: Date;
	startAt: Date;
}
