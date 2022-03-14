import { NumberUtils } from "../../modules";
import { SmcService } from "../smc";

export class StakingServiceV2 {
	static async fetchPackages(): Promise<StakePackage[]> {
		const packages = await Promise.all(
			["1", "2", "3"].map(async (value, index) => {
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

		return packages.filter((v) => !["1 months"].includes(v.name));
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
