export enum Chain {
    ETH
}

// A wallet can be used multiple times to store different types of wallet and the information associated with them
export interface Wallet {
    type: Chain;
    address: string;
    privateKey: string;
}

export interface Token {
    name: string;
    symbol: string;
    address: string;
    balance: number;
    decimals: number;
}

export interface WalletState {
    wallets: Wallet[];
}
