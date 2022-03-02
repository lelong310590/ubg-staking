import { StoreAction } from "../../AppStores";
import { Pool } from "./smc.types";

interface State {
  isFetching: boolean,
  error: string,
  data: Pool[],
}

const defaultState = {
  isFetching: false,
  error: '',

  data: [],
} as State

export const SET_SMC_POOLS_FETCHING = 'SET_SMC_POOLS_FETCHING';
export const SET_SMC_POOLS_ERROR = 'SET_SMC_POOLS_ERROR';
export const SET_SMC_POOLS_DATA = 'SET_SMC_POOLS_DATA';

export const smcPoolsReducer = (state = defaultState, action: StoreAction): State => {
  const { type } = action;
  if (type === SET_SMC_POOLS_FETCHING) return { ...state, isFetching: true }
  if (type === SET_SMC_POOLS_ERROR) return {
    ...state,
    isFetching: false,
    error: action.error,
  }
  if (type === SET_SMC_POOLS_DATA) return {
    ...state,
    isFetching: false,
    error: '',
    data: action.data
  }
  return state;
}