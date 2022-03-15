import { useState, FC, useEffect } from 'react'
import { Element } from 'react-scroll'
// import { getLocaleKey } from '../../../AppLanguages';
import { useSelector } from '../../../AppStores'
// import { Icon } from '../../../components';
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async/fixed'
import { DateTimeUtils, InputWraper, NumberUtils, useForm } from '../../../modules'
import { AppService, ESMCStatus, SmcService } from '../../../services'
import { StakingServiceV2, StakePackage, UserStake } from '../../../services/staking/stakingv2.service'
import CountUp from 'react-countup';

export const SectionHead: FC = () => {

	const smc = useSelector(s => s.smc);
	const [totalStakingAmount, setTotalStakingAmount] = useState(0 as number);
	const [totalPaidAmount, setTotalPaidAmount] = useState(0 as number);

	useEffect(() => {
		let interval: any;
		let interval2: any;

		// Todo
		// interval = setIntervalAsync(async () => {
		fetchTotalStakingAmount();
		fetchTotalPaidAmount();
		// }, 1000);

		// interval2 = setIntervalAsync(async () => {
		// 	await fetchTotalPaidAmount();
		// }, 1000);
	})

	const fetchTotalStakingAmount = async () => {
		return SmcService.call({
			contract: SmcService.contractStakingV2,
			method: 'stakingAmount'
		})
			.then(res => {
				console.log('stakingAmount: ', res)
			})
			.catch(() => false);
	}

	const fetchTotalPaidAmount = async () => {
		await SmcService.call({
			contract: SmcService.contractStakingV2,
			method: 'totalPaidAmount',
		})
			.then(res => {
				console.log('totalPaidAmount: ', res)
			})
			.catch((err) => {
				return false;
			});
	}

	return (
		<Element name="SectionHead">
			<section className="SectionHead">
				<div className="container">
					<div className="banner">
						<div className="info">
							<h1 className="sectionTitle">UBG Token was borned for a mission:</h1>
							<p className="sectionExcerpt">UBG Token was borned for a mission: Breaking through all limits of Payment by Crypto Currencies wherever and whenever. We create a new payment method for E- Commercial and Travel, making it faster, transparent, profitable, secure and great in future..</p>
							<div className="stake-stats">
								<p>Total Staking Amount: <CountUp end={totalStakingAmount} suffix=" UBG" /></p>
								<p>Total Paid Amount: <CountUp end={totalPaidAmount} suffix=" UBG" /></p>
							</div>
						</div>
						<img src="/images/head.png" alt="" />
					</div>
				</div>
			</section>
		</Element>
	)
}