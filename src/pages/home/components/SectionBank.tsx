import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { FC } from 'react'
import { Element } from 'react-scroll'
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async/fixed'
import { getLocaleKey } from '../../../AppLanguages'
import { useSelector } from '../../../AppStores'
import { Button, Icon, InputNumber, Message } from '../../../components'
import { InputTagSelect } from '../../../components/input/tag-select'
import { DateTimeUtils, InputWraper, NumberUtils, useForm } from '../../../modules'
import { AppService, ESMCStatus, SmcService } from '../../../services'
import { StakingServiceV2, StakePackage, UserStake } from '../../../services/staking/stakingv2.service'
import { OnModalWallet } from '../../../modals'
import _ from 'lodash'
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";
import {isMobile} from 'react-device-detect';

export const SectionBank: FC = () => {
	return (
		<Element name="SectionBank" className="Section SectionBank">
			<div className="container">
				<div className="sectionTitle">Staking</div>

				<div className="row justify-content-center">
					<Form />
				</div>
			</div>
		</Element>
	)
}

const Form: FC = () => {
	const smc = useSelector(s => s.smc);
	const lang = useSelector(state => state.app.lang);
	const [isFetched, setIsFetched] = useState(false);
	const [balance, setBalance] = useState(null as null | number);
	const [packages, setPackages] = useState(null as null | StakePackage[]);
	const [userStake, setUserStake] = useState(null as null | UserStake);
	const [isClaiming, setIsClaiming] = useState(false);
	const [seekedTime, setseekedTime] = useState(null as null | any)
	const [now, setNow] = useState(new Date());
	const [ref, setRef] = useState('0x0000000000000000000000000000000000000000')
	const [fee, setFee] = useState(null as null | number)

	const validateAmount = (value: number) => {
		if (value && typeof balance === 'number') {
			if (value > balance) return 'Your balance not enough';
		}
	}

	const { handleSubmit, isSubmitting, inputProps, values } = useForm({
		enableReinitialize: true,
		fields: {
			amount: {
				isRequired: true,
				label: lang.enter_your_amount_to_earn,
				validate: validateAmount,
			},
			packageId: {
				isRequired: true,
				label: lang.saving_duration,
				exProps: {
					options: packages ? packages.map(v => ({ label: v.name, value: v.id })) : [],
				},
				defaultValue: packages ? packages[0].id : '',
			}
		},
		onSubmit: async ({ values }) => {
			await SmcService.requestApprove({
				fromAddress: SmcService.configs.SMC_STAKING_V2_ADDRESS,
				toContract: SmcService.contractUBGToken,
			}, values.amount)
				.then(async () => {
					return SmcService.send({
						contract: SmcService.contractStakingV2,
						method: 'stake',
						params: {value: fee}
					}, values.packageId, NumberUtils.cryptoConvert('encode', values.amount, SmcService.contractUBGToken._decimals), ref ?? '0x0000000000000000000000000000000000000000')
						.then(async (res) => {
							await fetchUserBalance();
							await fetchUserStake();
							SmcService.transactionSuccessAlert(res, 'Stake successfully.');
						})
						.catch(async (err) => {
							console.log('err: ', err)
							SmcService.transactionErrorAlert(err, 'Stake failed.');
						})
				})
				.catch(() => {
					return AppService.createErrNoti('Approve amount failed.');
				})
		}
	})

	const fetchTime = async () => {
		return SmcService.call({
			contract: SmcService.contractStaking,
			method: '_getBlockchainTimestamp'
		})
			.then(res => {
				setNow(new Date(+res * 1000));
			});
	}

	// get current user balance
	const fetchUserBalance = async () => {
		await SmcService.call({
			contract: SmcService.contractUBGToken,
			method: 'balanceOf',
		}, SmcService.address)
			.then(res => {
				setBalance(+NumberUtils.cryptoConvert('decode', +res, SmcService.contractUBGToken._decimals));
			})
			.catch((err) => {
				return false;
			});
	}

	const fetchUserStake = async () => {
		return SmcService.call({
			contract: SmcService.contractStakingV2,
			method: 'getMyStakingData'
		})
			.then(res => {
				console.log('getMyStakingData: ', res)
				setUserStake(res)
			})
			.catch(() => false);
	}

	const fetchPackagesV2 = async () => {
		return StakingServiceV2.fetchPackages()
			.then((res) => {
				setPackages(res)
			})
			.catch(() => false);
	}

	const fetchFee = async () => {
		return StakingServiceV2.fetchFee()
			.then((res) => {
				setFee(res)
			})
			.catch(() => {
				setFee(5e15)
			})
	}

	const initialize = async () => {
		console.log("MM: initialize");
		// setTimeout(() => {connectWallet()},3000);
		// await fetchTime();
		// TODO: uncomment it when go to v1
		// await fetchPackages();
		await fetchPackagesV2();
		await fetchFee();
		//await fetchSeekedTime();
		// setIsFetched(true);
	}

	const connectWallet = async () => {
		console.log("MM 2: connectWallet");
		const providerOptions = {
			/* See Provider Options Section */
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: "460f40a260564ac4a4f4b3fffb032dad", // required,
				},
				qrcode: true,
			}
		};
		console.log("MM2 ", providerOptions);

		const web3Modal = new Web3Modal({
			network: "mainnet", // optional
			cacheProvider: true, // optional
			providerOptions // required
		});

		const provider = await web3Modal.connect()

		// Subscribe to accounts change
		provider.on("accountsChanged", (accounts: string[]) => {
			console.log("MM3: accountsChanged");
			window.location.reload
		});

		provider.on("chainChanged", (chainId: number) => {
			console.log(chainId);
		});

		provider.on("connect", (info: { chainId: number }) => {
			console.log('info: ', info)
		});

		provider.on("disconnect", (error: { code: number; message: string }) => {
			console.log("MM 2: disconnect");
			window.location.reload
		});
	}

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const refAddress = queryParams.get('ref');
		setRef(refAddress);

		let interval: any;
		let interval2: any;

		if (smc.status !== ESMCStatus.NONE) {
			initialize();
			// interval = setIntervalAsync(async () => {
			// 	await fetchTime();
			// }, 1000);
		}

		if (smc.status === ESMCStatus.READY) {
			fetchUserBalance();
			fetchUserStake();

			interval2 = setIntervalAsync(async () => {
				await fetchUserBalance();
				await fetchUserStake();
			}, 1000);
		}

		return () => {
			if (interval) clearIntervalAsync(interval);
			if (interval2) clearIntervalAsync(interval2);
		}
	}, [smc.status])


	const handleClaim = async (packageId) => {
		//setIsClaiming(true);

		await SmcService.send({
			contract: SmcService.contractStakingV2,
			method: 'claim',
			params: {value: fee}
		}, packageId)
			.then(async res => {
				await fetchUserBalance();
				await fetchUserStake();
				SmcService.transactionSuccessAlert(res, 'Claim successfully.');
			})
			.catch(err => {
				SmcService.transactionErrorAlert(err, 'Claim failed.');
			})

		//setIsClaiming(false);
	}

	const showTitle = () => {
		return (
			<div className="main-title text-center">UBG's saving information</div>
		)
	}

	return (
		<Fragment>
			<div className="col-sm-5">
				<form onSubmit={handleSubmit}>
					<div className="head">
						<div className="title">Investment</div>
						<div className="UserBalance">
							<span className="icon"><Icon.Wallet /></span>
							<span className="label">{lang.your_balance}</span>
							<span className="value">{balance === null ? '--' : `${balance.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 9 })} UBG`}</span>
						</div>
					</div>

					{function () {
						<Button label={" -- " + lang.connect_wallet + " -- "} onClick={() => connectWallet()}/>

						const packageActive = packages.find(v => v.id === values.packageId) as StakePackage;
						//const reward = values.amount ? (values.amount * packageActive.interest) / 100 : 0;
						const reward = values.amount ? (packageActive.interest / 10000 + 1) * values.amount : 0;

						// if (userStake) return <>
							
						// </>

						return <>
							<Fragment>
								<InputWraper inputProps={inputProps.amount} component={InputNumber} />
								<InputWraper inputProps={inputProps.packageId} component={InputTagSelect} className="hideBorder" />

								<p className="note">{lang.after} <strong className="textPrimary">{packageActive.numberOfDays} {lang.day_s}</strong> {lang.with} <strong className="textPrimary">{values.amount ? (+values.amount).toLocaleString(getLocaleKey(true), { maximumFractionDigits: 2 }) : '--'} UBG</strong>, {lang.you_will_able_to_claim} <strong className="textPrimary">{reward ? reward.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 2 }) : '--'} UBG</strong></p>
								
							</Fragment>
						</>
					}()}

					<div className="cta">
						{function () {
							if (smc.error) return
							if (smc.status === ESMCStatus.NONE) return;
							if (smc.status !== ESMCStatus.READY) return <Button label={lang.connect_wallet} buttonType="warning" onClick={() => connectWallet()} />
							
							return <Button isLoading={isSubmitting} type="submit" label="Stake" />
						}()}
					</div>
				</form>
			</div>
			{!_.isEmpty(userStake) &&
				<div className="user-stake-wrapper">
					
					{showTitle()}

					<div className="row">
						{_.map(userStake, (s, i) => {
							const currentTime = new Date().getTime()
							
 							let reward = (s.interest / 10000 + 1) * s.amount;
							let timestamp = s.startTime*1000
							let date = new Date(timestamp);
							let endDate = new Date(timestamp + s.duration*1000);

							let showDate = date.getDate()+
							"/"+(date.getMonth()+1)+
							"/"+date.getFullYear()+
							" "+date.getHours()+
							":"+date.getMinutes()+
							":"+date.getSeconds();

							let showEndDate = endDate.getDate()+
							"/"+(endDate.getMonth()+1)+
							"/"+endDate.getFullYear()+
							" "+endDate.getHours()+
							":"+endDate.getMinutes()+
							":"+endDate.getSeconds();

							// toLocaleString(getLocaleKey(true), { maximumFractionDigits: 9 })

							return (
								<Fragment key={i}>
									{s.amount > 0 && 
										<div className="col-12 col-md-3">
											<div className="user-stake-item">
												<img src="./images/pool.png" alt="" className="img-fluid" />
												<div className="stake-infomation">
													<div className="rowInfo">
														<div className="label">{lang.saving}</div>
														<div className="value">{s.amount / 1e9} UBG</div>
													</div>
													<div className="rowInfo">
														<div className="label">{lang.reward}</div>
														<div className="value">{reward / 1e9 - s.amount / 1e9} UBG</div>
													</div>
													<div className="rowInfo">
														<div className="label">{lang.start_day}</div>
														<div className="value">{showDate}</div>
													</div>
													<div className="rowInfo">
														<div className="label">{lang.paid_day}</div>
														<div className="value">{showEndDate}</div>
													</div>
												</div>
												<div className="stake-action">
												{function () {
													if (smc.error) return
													if (smc.status === ESMCStatus.NONE) return;
													if (smc.status !== ESMCStatus.READY) return <Button label={lang.connect_wallet} buttonType="warning" onClick={() => OnModalWallet()} />
													const isClaimActive = currentTime  >= endDate.getTime();
													return <Button label={lang.claim} isLoading={isClaiming} onClick={() => handleClaim(s.id)} disabled={!isClaimActive} />;
												}()}
												</div>
											</div>
										</div>
									}
								</Fragment>
							)
						})}
						
					</div>
				</div>
			}
			
		</Fragment>
	)
}

const countDownShow = (startTime: Date, endTime: Date) => {
	const { days, hours, minutes, isExpired } = DateTimeUtils.coutdown(endTime, new Date(startTime).getTime());
	if (isExpired) return ''

	let string = '';
	if (!!days) string += `${days}d`;
	if (!!hours) string += ` - ${hours}h`;
	if (!!minutes) string += ` - ${minutes}m`;

	return `Remain: ${string}`;
}