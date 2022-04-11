import { useState, FC, useEffect } from 'react'
import { Element } from 'react-scroll'
// import { getLocaleKey } from '../../../AppLanguages';
import { useSelector } from '../../../AppStores'
// import { Icon } from '../../../components';
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async/fixed'
import { DateTimeUtils, InputWraper, NumberUtils, useForm } from '../../../modules'
import { SmcService } from '../../../services'
import CountUp from 'react-countup';
import {AppService} from "../../../services";
import language from './../../../../lang/lang.json'
import {useStore} from 'react-redux'

export const SectionHead: FC = () => {

	const store = useStore();
	const smc = useSelector(s => s.smc);
	const [totalStakingAmount, setTotalStakingAmount] = useState(0 as number);
	const [totalPaidAmount, setTotalPaidAmount] = useState(0 as number);
	const lang = useSelector(state => state.app.lang)

	const changeLang = (selectedLang) => {
		if (selectedLang === 'en') {
			AppService.setLang(language.en, store)
		} else {
			AppService.setLang(language.vi, store)
		}

		sessionStorage.setItem('language', selectedLang);
	}

	useEffect(() => {
		let interval: any;
		let interval2: any;

		// Todo
		// interval = setIntervalAsync(async () => {
		setTimeout(()=>{
			fetchTotalStakingAmount();
			fetchTotalPaidAmount();
		}, 3000);
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
				setTotalStakingAmount(+NumberUtils.cryptoConvert('decode', +res, SmcService.contractUBGToken._decimals))
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
				setTotalPaidAmount(+NumberUtils.cryptoConvert('decode', +res, SmcService.contractUBGToken._decimals))
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
							<div className="info-change-language">
								<a onClick={() => changeLang('en')}>English</a>
								<a onClick={() => changeLang('vi')}>Vietnamese</a>
							</div>
							<h1 className="sectionTitle">{lang.hero_title}</h1>
							<p className="sectionExcerpt">{lang.hero_excerpt}</p>
							<div className="stake-stats">
								<p>{lang.total_staking_amount} <CountUp end={totalStakingAmount} suffix=" UBG" /></p>
								<p>{lang.total_paid_amount} <CountUp end={totalPaidAmount} suffix=" UBG" /></p>
							</div>
						</div>
						<img src="/images/head.png" alt="" />
					</div>
				</div>
			</section>
		</Element>
	)
}