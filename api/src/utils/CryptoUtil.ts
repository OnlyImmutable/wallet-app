import { mnemonicToSeed } from "bip39";
import { hdkey } from "ethereumjs-wallet";

interface RecoveredAccount {
    address: string;
    privateKey: string;
}

/**
 * Get addresses based on recovery phase
 * @param phrase {string}
 * @param count {number}
 */
export const getAddressesFromRecoverySeed = async (phrase: string, count: number = 1): Promise<RecoveredAccount[]> => {
    const accounts: RecoveredAccount[] = [];

    const seed = await mnemonicToSeed(phrase, "");
    const hdWallet = hdkey.fromMasterSeed(seed);
    const path = "m/44'/60'/0'/0/";

    for (let i = 0; i < count; i++) {
        const wallet = hdWallet.derivePath(path + i).getWallet();
        const address = "0x" + wallet.getAddress().toString("hex");
        const privateKey = wallet.getPrivateKey().toString("hex");

        accounts.push({
            address: address,
            privateKey: privateKey
        });
    }

    return accounts;
};
