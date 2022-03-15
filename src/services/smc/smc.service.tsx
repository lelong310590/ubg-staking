import {Store} from "redux";
import Web3 from "web3";

import {getEnv} from "../../AppConfigs";
import {AppService} from "../app";
import {
    RESET_SMC_WALLET_DATA,
    SET_SMC_WALLET_DATA,
    SET_SMC_WALLET_ERROR,
    SET_SMC_WALLET_FETCHING,
} from "./smcWallet.reducer";
import {
    Contract,
    ContractMain,
    ContractToken,
    ESMCStatus,
    Ethereum,
    Transaction,
} from "./smc.types";
import {SET_SMC_STATUS} from "./smc.reducer";
import {
    SET_SMC_POOLS_DATA,
    SET_SMC_POOLS_ERROR,
    SET_SMC_POOLS_FETCHING,
} from "./smcPools.reducer";
import {NumberUtils} from "../../modules";
import {CookieService, ECookieVariable} from "../cookie";
import {ContractConfig, contracts} from "../../data/contracts";
import {
    SET_IDO_INVESTOR,
    SET_IDO_PRICE,
    SET_IDO_TOKEN_NAME,
} from "./ido.reducer";
import {clearIntervalAsync, setIntervalAsync} from "set-interval-async/fixed";

export class SmcService {
    static isInitialized: boolean = false;
    static address: string;
    static configs: ContractConfig;
    static ethereum: Ethereum;
    static web3: Web3;
    static chainId: string;

    static contractMAIN: ContractMain;
    static contractUSDT: ContractToken;

    static contractIDO: Contract;
    static contractIDOToken: Contract;

    static contractStaking: Contract;

    static contractUBGToken: Contract;

    static contractStakingV2: Contract;
    static contractFarmingV2: Contract;

    static async initialize(store: Store): Promise<any> {
        if (this.isInitialized) return;

        try {
            const {ethereum} = window as any;
            if (typeof ethereum === "undefined")
                throw Error("META_MASK_NOT_INSTALLED");
            this.ethereum = ethereum;

            // Events
            ethereum.on("accountsChanged", () => window.location.reload());
            ethereum.on("chainChanged", () => window.location.reload());
            // Load config in
            if (getEnv("ENV") === "production") this.configs = contracts.production;
            else this.configs = contracts.development;

            this.web3 = new Web3(ethereum);

            // Contracts
            const contractMAIN = new this.web3.eth.Contract(
                this.configs["SMC_MAIN_ABI"],
                this.configs["SMC_MAIN_ADDRESS"]
            );
            const contractUSDT = new this.web3.eth.Contract(
                this.configs["SMC_USDT_ABI"],
                this.configs["SMC_USDT_ADDRESS"]
            );

            this.contractIDO = new this.web3.eth.Contract(
                this.configs["SMC_IDO_ABI"],
                this.configs["SMC_IDO_ADDRESS"],
                {from: this.address}
            ) as any;
            this.contractIDOToken = new this.web3.eth.Contract(
                this.configs["SMC_IDO_TOKEN_ABI"],
                this.configs["SMC_IDO_TOKEN_ADDRESS"],
                {from: this.address}
            ) as any;

            this.contractMAIN = {
                poolInfo: (pid) =>
                    contractMAIN.methods.poolInfo(pid).call({from: this.address}),
                userPoolInfo: async (pid) => {
                    const pendingReward = await contractMAIN.methods
                        .pendingReward(pid, this.address)
                        .call();
                    return contractMAIN.methods
                        .userInfo(pid, this.address)
                        .call()
                        .then((res: any) => ({
                            amount: +res.amount / 1000000,
                            lastUnlockBlock: +res.lastUnlockBlock,
                            lockAmount: +res.lockAmount / 1000000,
                            rewardDebt: +res.rewardDebt / 1000000000000000000,
                            rewardDebtAtBlock: +res.rewardDebtAtBlock,
                            pendingReward: +pendingReward / 1000000000000000000,
                        }));
                },
                deposit: (pid, amountUSDT) =>
                    contractMAIN.methods
                        .deposit(
                            pid,
                            NumberUtils.cryptoConvertToStringAmount(amountUSDT, 6),
                            this.getRefCode()
                        )
                        .send({from: this.address}),
                claimReward: (pid) =>
                    contractMAIN.methods.claimReward(pid).send({from: this.address}),
            };

            this.contractUSDT = {
                balanceOf: () =>
                    contractUSDT.methods
                        .balanceOf(this.address)
                        .call({from: this.address})
                        .then((value: any) => +value / 1000000),
                approve: (amount) =>
                    contractUSDT.methods
                        .approve(
                            this.configs["SMC_MAIN_ADDRESS"],
                            NumberUtils.cryptoConvertToStringAmount(amount, 6)
                        )
                        .send({from: this.address}),
                allowance: () =>
                    contractUSDT.methods
                        .allowance(this.address, this.configs["SMC_MAIN_ADDRESS"])
                        .call({from: this.address})
                        .then((value: any) => +value / 1000000),
            };

            this.contractStaking = new this.web3.eth.Contract(
                this.configs["SMC_STAKING_ABI"],
                this.configs["SMC_STAKING_ADDRESS"],
                {from: this.address}
            ) as any;
            this.contractStaking._name = "State";

            this.contractUBGToken = new this.web3.eth.Contract(
                this.configs["SMC_UBG_TOKEN_ABI"],
                this.configs["SMC_UBG_TOKEN_ADDRESS"],
                {from: this.address}
            ) as any;
            this.contractUBGToken._name = "UBG Token";
            this.contractUBGToken._decimals = await this.contractUBGToken.methods
                .decimals()
                .call()
                .then((res) => +res);

            this.contractStakingV2 = new this.web3.eth.Contract(
                this.configs["SMC_STAKING_V2_ABI"],
                this.configs["SMC_STAKING_V2_ADDRESS"],
                {from: this.address}
            ) as any;
            this.contractStakingV2._name = "StakingV2";

            this.contractFarmingV2 = new this.web3.eth.Contract(
                this.configs["SMC_FARMING_V2_ABI"],
                this.configs["SMC_FARMING_V2_ADDRESS"],
                {from: this.address}
            ) as any;
            this.contractFarmingV2._name = "FarmingV2";

            // Check network
            this.chainId = `${ethereum.networkVersion}`;
            if (this.chainId !== this.configs.SMC_NETWORK_CHAIN_ID)
                throw Error(
                    `You must connect to ${this.configs.SMC_NETWORK_NAME} network`
                );

            // Check wallet
            let accounts = await ethereum.request({method: "eth_accounts"});
            if (accounts[0]) {
                this.address = this.web3.utils.toChecksumAddress(accounts[0]);
                this.fetchSMCWallet(store, this.address);
            }

            if (this.address) {
                store.dispatch({type: SET_SMC_STATUS, status: ESMCStatus.READY});
            } else {
                store.dispatch({
                    type: SET_SMC_STATUS,
                    status: ESMCStatus.WALLET_MUST_BE_CONNECTED,
                });
            }
        } catch (error) {
            const errorMesage = this.handleSMCError(error);
            store.dispatch({
                type: SET_SMC_STATUS,
                status: ESMCStatus.ERROR,
                error: errorMesage,
            });
        }
    }

    static async fetchPools(store: Store) {
        try {
            store.dispatch({type: SET_SMC_POOLS_FETCHING});

            const pools = await Promise.all(
                new Array(6).fill(0).map(async (_, key) => ({
                    pid: key,
                    ...(await this.contractMAIN.poolInfo(key)),
                }))
            );

            store.dispatch({type: SET_SMC_POOLS_DATA, data: pools});
        } catch (error) {
            const errorMesage = this.handleSMCError(error, true);
            store.dispatch({
                type: SET_SMC_POOLS_ERROR,
                status: ESMCStatus.ERROR,
                error: errorMesage,
            });
        }
    }

    static async fetchSMCWallet(store: Store, address: string = this.address) {
        try {
            if (address) {
                store.dispatch({type: SET_SMC_WALLET_FETCHING});
                this.address = address;

                store.dispatch({type: SET_SMC_WALLET_DATA, address});
            } else {
                store.dispatch({type: RESET_SMC_WALLET_DATA});
            }
        } catch (error) {
            const errorMesage = this.handleSMCError(error);
            store.dispatch({type: SET_SMC_WALLET_ERROR, error: errorMesage});
        }
    }

    static async handleConnectWallet() {
        try {
            await this.ethereum.request({method: "eth_requestAccounts"});
        } catch (error) {
            AppService.createErrNoti(error.message);
        }
    }

    static handleSMCError(error: Error, isAlert = false): string {
        if (
            error.message ===
            `Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.`
        ) {
            const message = `You're connected to an unsupported network.`;
            if (isAlert) AppService.createErrNoti(message);
            return message;
        } else {
            return error.message;
        }
    }

    static getLinkTransactionByHash(tx: string) {
        return `${this.configs["SMC_DOMAIN_URL"]}/tx/${tx}`;
    }

    static getRefCode(): string {
        return (
            CookieService.get(ECookieVariable.USER_AFFILIATE_CODE) ||
            this.configs["SMC_ROOT_ADDRESS"]
        );
    }

    // ============================ Start IDO Features ============================
    static convertAmount(
        type: "decode" | "encode",
        amount: number
    ): number | string {
        const decimals = 18;
        return NumberUtils.cryptoConvert(type, +amount, decimals);
    }

    static async fetchIdoInvestor(store: Store) {
        const data = await this.contractIDO.methods.investors(this.address).call();
        const isClaimed = await this.contractIDO.methods
            .claimed(this.address)
            .call();
        const isRegistered = +data.tokenSwapped > 0;
        store.dispatch({
            type: SET_IDO_INVESTOR,
            data: {...data, isClaimed, isRegistered},
        });
    }

    static async fetchIdoPrice(store: Store) {
        const data = await this.contractIDO.methods
            .price()
            .call()
            .then((res) => +res * 0.000000001);
        store.dispatch({type: SET_IDO_PRICE, data});
    }

    static async fetchIDOTokenName(store: Store) {
        const data = await this.contractIDOToken.methods.symbol().call();
        store.dispatch({type: SET_IDO_TOKEN_NAME, data});
    }

    static async buyToken(store: Store, affiliateCode: string, amount: number) {
        const payableAmount = this.convertAmount("encode", amount);
        const refer = affiliateCode || this.configs.SMC_ROOT_ADDRESS;
        try {
            await this.contractIDO.methods
                .buyToken(refer)
                .send({value: payableAmount});
            await this.fetchIdoInvestor(store);
            AppService.createSuccessNoti("Buy token successful.");
        } catch (error) {
            console.log(error);
            this.handleSMCError(error, true);
        }
    }

    static async claim(store: Store, affiliateCode: string) {
        const refer = affiliateCode || this.configs.SMC_ROOT_ADDRESS;
        try {
            await this.contractIDO.methods.claim(refer).send();
            await this.fetchIdoInvestor(store);
            AppService.createSuccessNoti("Claim successful.");
        } catch (error) {
            console.log(error);
            this.handleSMCError(error, true);
        }
    }

    // ============================ End IDO Features ============================

    static async call(
        options: {
            contract: Contract;
            method: string;
            onSubmitted?: (transactionHash: string) => void;
        },
        ...args: any
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const func = options.contract.methods[options.method] as any;
            if (typeof func !== "function")
                reject(
                    AppService.throwError({
                        dev: `Cannot find function contract.methods.${options.method} `,
                    })
                );

            const action = () => {
                return func(...args)
                    .call({'from': this.address != null ? this.address : ''})
                    .then((res: any) => resolve(res))
                    .catch((error: any) => {
                        console.error(error);
                        setTimeout(action, 2000);
                    });
            };

            action();
        });
    }

    static async send(
        options: {
            contract: Contract;
            method: string;
            onSubmitted?: (transactionHash: string) => void;
            params?: any;
        },
        ...args: any
    ): Promise<Transaction> {
        return new Promise(async (resolve, reject) => {
            let interval: any, transactionHash: string;

            const func = options.contract.methods[options.method] as any;
            if (typeof func !== "function")
                reject(
                    AppService.throwError({
                        dev: `Cannot find function contract.methods.${options.method} `,
                    })
                );

            const gas = await func(...args)
                .estimateGas({from: SmcService.address})
                .then((res: number) => +res * 2)
                .catch((err: any) => {
                    reject(err);
                });

            func(...args)
                .send({gas: gas * 2, from: SmcService.address, ...options.params})
                .on("transactionHash", function (transactionHashReceived: any) {
                    transactionHash = transactionHashReceived;

                    if (options.onSubmitted) options.onSubmitted(transactionHashReceived);

                    interval = setIntervalAsync(async () => {
                        const transactionReceipt =
                            (await SmcService.web3.eth.getTransactionReceipt(
                                transactionHashReceived
                            )) as Transaction;
                        if (transactionReceipt) {
                            clearIntervalAsync(interval);
                            if (transactionReceipt.status) resolve(transactionReceipt);
                            else {
                                reject({
                                    message: "Transaction failed",
                                    ...transactionReceipt,
                                });
                            }
                        }
                    }, 1000);
                })
                .on("error", function (error: any, receipt: any) {
                    if (interval) clearIntervalAsync(interval);
                    reject({
                        message: error.message,
                        transactionHash,
                        ...receipt,
                    });
                })
                .catch((error: any) => {
                    reject({
                        message: error.message,
                        transactionHash,
                        ...error,
                    });
                });
        });
    }

    static async requestApprove(
        contracts: {
            fromAddress: string;
            toContract: Contract;
        },
        amount: number,
        decimals = 18
    ) {
        // Check allowance
        const allowance = await SmcService.call(
            {
                contract: contracts.toContract,
                method: "allowance",
            },
            this.address,
            contracts.fromAddress
        ).then((res) => +NumberUtils.cryptoConvert("decode", res, decimals));

        if (allowance < amount) {
            // Approve if not enough
            await this.send(
                {
                    contract: contracts.toContract,
                    method: "approve",
                },
                contracts.fromAddress,
                "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
            ).catch((error) => {
                console.error(error);
                throw Error("Approve failed.");
            });

            // Check again
            const newAllowance = await SmcService.call(
                {
                    contract: contracts.toContract,
                    method: "allowance",
                },
                this.address,
                contracts.fromAddress
            ).then((res) => +NumberUtils.cryptoConvert("decode", res, decimals));

            if (newAllowance < amount) throw Error("Your amount is not approved.");
        }
    }

    static renderLinkTransaction(transactionHash: string) {
        return `${this.configs.SMC_DOMAIN_URL}/tx/${transactionHash}`;
    }

    static transactionErrorAlert(error: any, message?: string) {
        let msg = message || error.message;
        if (error.code === 4001) msg = "You have denied transaction signature.";

        return AppService.createErrNoti(
            msg,
            error &&
            error.transactionHash && {
                buttons: [
                    {
                        label: "View Transaction",
                        onClick: () =>
                            window.open(
                                SmcService.renderLinkTransaction(error.transactionHash)
                            ),
                    },
                ],
            }
        );
    }

    static transactionSuccessAlert(
        transaction: Transaction,
        message: string
    ): Transaction {
        AppService.createSuccessNoti(message, {
            buttons: [
                {
                    label: "View Transaction",
                    onClick: () =>
                        window.open(
                            SmcService.renderLinkTransaction(transaction.transactionHash)
                        ),
                },
            ],
        });

        return transaction;
    }
}
