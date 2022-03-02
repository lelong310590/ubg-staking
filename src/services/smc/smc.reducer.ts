import { StoreAction } from "../../AppStores";
import { ESMCStatus } from "./smc.types";

const defaultState: {
  status: ESMCStatus,
  error: string,
} = {
  status: ESMCStatus.NONE,
  error: ''
};

export const SET_SMC_STATUS = 'SET_SMC_STATUS';

export const smcReducer = (state = defaultState, action: StoreAction) => {
  const { type } = action;
  if (type === SET_SMC_STATUS) return { ...state, status: action.status, error: action.error || '' };
  return state;
}