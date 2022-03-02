import { StoreAction } from "../../AppStores";

interface State {
  investor: any,
  price: number,
  tokenName: string,
}

const defaultState: State = {
  investor: null,
  price: 0,
  tokenName: 'NCF'
};

export const SET_IDO_INVESTOR = 'SET_IDO_INVESTOR';
export const SET_IDO_PRICE = 'SET_IDO_PRICE';
export const SET_IDO_TOKEN_NAME = 'SET_IDO_TOKEN_NAME';

export const idoReducer = (state = defaultState, action: StoreAction): State => {
  const { type } = action;
  if (type === SET_IDO_INVESTOR) return { ...state, investor: action.data };
  if (type === SET_IDO_PRICE) return { ...state, price: action.data };
  if (type === SET_IDO_TOKEN_NAME) return { ...state, tokenName: action.data };
  return state;
}