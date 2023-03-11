import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URI } from "../constants/Constants";
import { Token } from "../types";

/**
 * The useBalanceByTokensHook sends a request to our API and returns a number balance for a specific token address
 * @param address
 */
const useBalanceByTokensHook = (address: string) => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // If there are no address we shouldn't be able to get their balance
        if (!address) return;

        // Send request to Moralis, this would be moved to an API and handled using access tokens
        axios({
            method: "get",
            url: `${API_URI}/wallet/balance?address=${address}`,
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            }
        })
            .then((response) => {
                const data = response.data;
                const tokens = data.tokens;
                setLoading(false);
                setTokens(tokens);
            })
            .catch(() => {
                alert("There was an error loading your balance, please try again later...");
            });
    }, [address]);

    return {
        loading: loading,
        tokens: useMemo(() => tokens, [address, tokens, loading])
    };
};

export default useBalanceByTokensHook;
