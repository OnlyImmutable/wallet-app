import { getAddressesFromRecoverySeed } from "../../src/utils/CryptoUtil";

describe("validate crypto utilities", () => {
    test("does phrase return account", async () => {
        const value = await getAddressesFromRecoverySeed("liberty dose bless lock snow crunch truck toy panda bread robot raw");
        expect(value).toStrictEqual([
            {
                address: "0x8fbee395307d2617f603d736907cfc4dbafea582",
                privateKey: "46482cf0e589a43fea9ebadb5abf82193dadfeda8a234af85d4b2748600ad759"
            }
        ]);
    });
});
