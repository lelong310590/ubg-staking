export const abi_staking_v2 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ownerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ubgTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_systemAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_withdrawAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "ChangeSystemAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "stakingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "refAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PayCommission",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "interest",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "payCommissionImmediately",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission3",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission4",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission5",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "WithdrawAllBNB",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawUBG",
    type: "event",
  },
  {
    inputs: [],
    name: "_getBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interest",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "payCommissionImmediately",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "commission1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission4",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission5",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "addPack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "changePackStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_systemAddress",
        type: "address",
      },
    ],
    name: "changeSystemAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakingId",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "comissionAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyStakingData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interest",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "payCommissionImmediately",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "commission1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission3",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission4",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission5",
            type: "uint256",
          },
        ],
        internalType: "struct StakingData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getPackInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interest",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "payCommissionImmediately",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "commission1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission3",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission4",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission5",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        internalType: "struct StakingPack",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getStakingData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interest",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "payCommissionImmediately",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "commission1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission3",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission4",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commission5",
            type: "uint256",
          },
        ],
        internalType: "struct StakingData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUbgBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interest",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "payCommissionImmediately",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "commission1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission4",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commission5",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "modifyPack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owedCommissionAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owedInterestAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_seekedTime",
        type: "uint256",
      },
    ],
    name: "seekTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seekedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_packId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_refAddress",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "systemAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPaidAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ubgContract",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllBNB",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawUBG",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
