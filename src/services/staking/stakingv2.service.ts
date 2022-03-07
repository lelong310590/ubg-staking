import {NumberUtils} from "../../modules";
import {SmcService} from "../smc";

export class StakingServiceV2 {
  static async fetchPackages(): Promise<StakePackage[]> {
    const packages = await Promise.all(
      [1, 2, 3].map(async (name, index) => {
        const packageRes = await SmcService.call(
          {
            contract: SmcService.contractStakingV2,
            method: "getPackInfo",
          },
          name
        );
        console.log("M: (" + name + ")", packageRes);

        return packageRes;
      })
    );
    console.log("M:", packages);

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
