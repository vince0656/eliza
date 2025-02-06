import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { ReadOnlySnapshotClient } from "../clients/ReadOnlySnapshotClient";

describe("SnapshotProposalsProvider", () => {
    let client: ReadOnlySnapshotClient;

    beforeEach(() => {
        vi.clearAllMocks();
        client = new ReadOnlySnapshotClient();
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    describe("Snapshot client", () => {
        it("should be able to get proposals from uniswap's snapshot space", async () => {
            const space = "uniswapgovernance.eth";
            const proposals = await client.getProposalsFromSnapshotSpace(space);
            console.log(proposals);

            // expect(result).toEqual(
            //     `Eliza\nWallet Address: ${walletProvider.address}\n` +
            //         `Total Value: $${totalUsd} (${suiAmount} SUI)\n`
            // );
        });
    });
});
