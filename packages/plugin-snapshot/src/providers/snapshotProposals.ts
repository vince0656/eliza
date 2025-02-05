import {
    //elizaLogger,
    //Service,
    IAgentRuntime,
    Memory,
    Provider,
    State,
} from "@elizaos/core";

import { validateSnapshotConfig } from "../enviroment";
import { ReadOnlySnapshotClient } from "../clients/ReadOnlySnapshotClient";

const snapshotProposalsProvider: Provider = {
    get: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<string | null> => {
        try {
            const config = await validateSnapshotConfig(runtime);
            const client = new ReadOnlySnapshotClient();
            const proposals = await client.getProposalsFromSnapshotSpace(config.space);
            return client.formatLatestProposalsData(proposals);
        } catch (error) {
            console.error("Error in proposals provider:", error);
            return null;
        }
    },
};

// Module exports
export { snapshotProposalsProvider };
