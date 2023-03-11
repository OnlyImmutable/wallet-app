import * as express from "express";
import { config } from "dotenv";
import Moralis from "moralis";

import WalletController from "./controllers/wallet.controller";

// Load process.env variables into memory
config();

const { PORT, MORALIS_API_KEY } = process.env;

const api = express();
const cors = require("cors");

const app = async () => {
    // Middleware configurations
    api.use(cors());
    api.use(express.json());
    api.use(express.urlencoded({ extended: false }));

    // Boots up Moralis
    await Moralis.start({
        apiKey: MORALIS_API_KEY
    });

    // We'd add further security here such as JWT authentication going forward
    api.use("/api/v1/wallet", WalletController);

    api.listen(PORT, () => {
        console.log(`API is running on port ${PORT}`);
    });
};

void app();

export { express, api, Moralis };
