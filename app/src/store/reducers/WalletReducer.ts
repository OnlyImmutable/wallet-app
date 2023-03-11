import * as actions from "../types/ActionTypes";
import { WalletState } from "../../types";

export const initialState: WalletState = {
    wallets: []
};

export const WalletReducer = (state = initialState, action): WalletState => {
    const payload = action.payload;
    switch (action.type) {
        case actions.SET_WALLET_STATE:
            return {
                ...state,
                ...payload
            };
        case actions.REMOVE_WALLET_STATE:
            return payload;
        default:
            return state;
    }
};
