export interface Ethereum {
  request: (agruments: {
    method: 'eth_accounts' | 'eth_requestAccounts',
    params?: unknown[] | object
  }) => Promise<any>
}

export interface ContractMain {
  poolInfo: (pid: number) => Promise<any>,
  userPoolInfo: (pid: number) => Promise<UserPoolInfo>,
  deposit: (pid: number, amountUSDT: number) => Promise<Transaction>,
  claimReward: (pid: number) => Promise<Transaction>
}

export interface ContractToken {
  balanceOf: () => Promise<number>,
  approve: (amount: number) => Promise<Transaction>,
  allowance: () => Promise<number>,
}

export interface Contract {
  methods: {
    [functionName: string]: (...args: any) => {
      call: (params?: { [filedName: string]: any }) => Promise<any>,
      send: (params?: { [filedName: string]: any }) => Promise<any>,
    }
  },
  [property: string]: any,
  _address: string,
  _name: string,
  _decimals: number,
}

export type SMCStatus = 'NONE' | 'META_MASK_NOT_INSTALLED' | 'ERROR' | 'READY'

export enum ESMCStatus {
  NONE = 'NONE',
  META_MASK_NOT_INSTALLED = 'NONE',
  WALLET_MUST_BE_CONNECTED = 'WALLET_MUST_BE_CONNECTED',
  ERROR = 'ERROR',
  READY = 'READY',
}

export interface Pool {
  pid: number,
  accRewardPerShare: string,
  allocPoint: string,
  finishBonusAtBlock: string,
  lastRewardBlock: string,
  lockFromBlock: string,
  lockToBlock: string,
  lpToken: string,
  percentForDev: string,
  percentLockReward: string,
  rewardPerBlock: string,
  rewardToken: string,
  startBlock: string,
  totalLock: string,
}

export interface Transaction {
  blockHash: string,
  blockNumber: number,
  contractAddress: null | string,
  cumulativeGasUsed: number,
  events: any,
  from: string,
  gasUsed: number,
  logsBloom: string,
  status: boolean
  to: string,
  transactionHash: string,
  transactionIndex: number
}

export interface UserPoolInfo {
  amount: number,
  lastUnlockBlock: number,
  lockAmount: number,
  rewardDebt: number,
  rewardDebtAtBlock: number,
  pendingReward: number,
}