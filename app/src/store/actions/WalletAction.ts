import * as actions from "../types/ActionTypes";
import { Chain, Wallet } from "../../types";
import axios from "axios";
import { API_URI } from "../../constants/Constants";
import { useAppSelector } from "../../hooks/useAppDispatch";

export const recover = (phrase: string) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: `${API_URI}/wallet/recovery`,
            data: {
                phrase: phrase
            }
        })
            .then((response) => {
                const data = response.data;
                const wallets = data.wallets;
                const finalWallets: Wallet[] = [];

                for (let i = 0; i < wallets.length; i++) {
                    const data = wallets[i];
                    const address = data.address;
                    const privateKey = data.privateKey;
                    finalWallets.push({
                        type: Chain.ETH,
                        address: address,
                        privateKey: privateKey
                    });
                }

                dispatch({
                    type: actions.SET_WALLET_STATE,
                    payload: {
                        wallets: finalWallets
                    }
                });
            })
            .catch(() => {
                alert("There was an issue recovering your account, please try later...");
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: actions.REMOVE_WALLET_STATE,
            payload: {
                wallets: []
            }
        });
    };
};
