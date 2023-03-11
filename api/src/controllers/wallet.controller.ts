import * as express from "express";
import * as Joi from "joi";

import { getAddressesFromRecoverySeed } from "../utils/CryptoUtil";

import { config } from "dotenv";
import { Moralis } from "../index";
import { EvmChain } from "@moralisweb3/common-evm-utils";

// Load process.env variables into memory
config();

const router = express.Router();

/**
 * /balance returns the balance for a specific token address
 */
router.get("/balance", async (req, res) => {
    const schema = Joi.object().empty().keys({
        address: Joi.string().required()
    });

    const result = schema.validate(req.query);

    if (result.error) {
        return res.status(400).json({
            success: false,
            error: result.error.message
        });
    }

    const { address } = result.value;

    const responseBalance = await Moralis.EvmApi.balance.getNativeBalance({
        address: address,
        chain: EvmChain.ETHEREUM
    });

    const responseTokens = await Moralis.EvmApi.token.getWalletTokenBalances({
        address: address,
        chain: EvmChain.ETHEREUM
    });

    const tokens = [
        {
            name: "Ethereum",
            symbol: "ETH",
            address: address,
            balance: responseBalance.raw.balance,
            decimals: 18
        }
    ];

    for (let i = 0; i < responseTokens.raw.length; i++) {
        const value = responseTokens.raw[i];
        tokens.push({
            name: value.name,
            symbol: value.symbol,
            address: value.token_address,
            balance: value.balance,
            decimals: value.decimals
        });
    }

    return res.json({
        success: true,
        address: address,
        tokens: tokens
    });
});

/**
 * /recovery is used to access the private key and wallet from a Mnemonic cypher
 */
router.post("/recovery", async (req, res) => {
    const schema = Joi.object().empty().keys({
        phrase: Joi.string().required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            error: result.error.message
        });
    }

    const value = result.value;

    const phrase = value.phrase;
    const wallets = await getAddressesFromRecoverySeed(phrase);

    return res.status(200).json({
        success: true,
        wallets: wallets
    });
});

export default router;
