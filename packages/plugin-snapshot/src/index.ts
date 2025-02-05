import { Plugin } from "@elizaos/core";
import { snapshotProposalsProvider } from "./providers/snapshotProposals";

// TODO - similar exports
//export { WalletProvider, transferToken as TransferSuiToken };

export const snapshotPlugin: Plugin = {
    name: "snapshot",
    description: "Snapshot.box Plugin for Eliza",
    actions: [],
    evaluators: [],
    providers: [snapshotProposalsProvider],
    services: [],
};

export default snapshotPlugin;
