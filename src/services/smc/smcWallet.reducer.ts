import { StoreAction } from "../../AppStores";

interface State {
  isFetching: boolean,
  error: string,
  address: string,
  balanceUSDT: number | null,
  balanceNCF: number | null,
}

const defaultState = {
  isFetching: false,
  error: '',

  address: '',
  balanceUSDT: null,
  balanceNCF: null,
} as State

export const SET_SMC_WALLET_FETCHING = 'SET_SMC_WALLET_FETCHING';
export const SET_SMC_WALLET_ERROR = 'SET_SMC_WALLET_ERROR';
export const SET_SMC_WALLET_DATA = 'SET_SMC_WALLET_DATA';
export const RESET_SMC_WALLET_DATA = 'RESET_SMC_WALLET_DATA';

export const smcWalletReducer = (state = defaultState, action: StoreAction): State => {
  const { type } = action;
  if (type === SET_SMC_WALLET_FETCHING) return { ...state, isFetching: true }
  if (type === SET_SMC_WALLET_ERROR) return {
    ...state,
    isFetching: false,
    error: action.error,
  }
  if (type === SET_SMC_WALLET_DATA) return {
    ...state,
    isFetching: false,
    address: action.address,
    balanceUSDT: action.balanceUSDT,
    balanceNCF: action.balanceNCF,
    error: '',
  }
  if (type === RESET_SMC_WALLET_DATA) return defaultState;
  return state;
}