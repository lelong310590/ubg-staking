import { NumberUtils } from "../../modules";
import { SmcService } from "../smc";

export class StakingService {
	static async calculateReward(amount: number, days: number) {
		return SmcService.call(
			{
				contract: SmcService.contractStaking,
				method: "calculateReward",
			},
			NumberUtils.cryptoConvert(
				"encode",
				amount,
				SmcService.contractUBGToken._decimals
			),
			days
		).then(
			(res) =>
				+NumberUtils.cryptoConvert(
					"decode",
					+res,
					SmcService.contractUBGToken._decimals
				)
		);
	}

	static async fetchPackages(): Promise<StakePackage[]> {
		const packages = await Promise.all(
			["1 month", "3 months", "6 months", "12 months"].map(
				async (name, index) => {
					const packageRes = await SmcService.call(
						{
							contract: SmcService.contractStakingV2,
							method: "packages",
						},
						index
					);

					const data: StakePackage = {
						id: `${index}`,
						name,
						roi: +packageRes.roi,
						numberOfDays: +packageRes.numberOfDays,
					};

					return data;
				}
			)
		);

		return packages.filter((v) => !["1 month"].includes(v.name));
	}
}

export interface StakePackage {
	id: any;
	name: string;
	roi: number;
	numberOfDays: number;
}

export interface UserStake {
	initial: number;
	reward: number;
	payAt: Date;
	startAt: Date;
}
