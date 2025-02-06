import type { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const snapshotEnvSchema = z.object({
    SNAPSHOT_ENS_NAME: z.string().min(1, "Snapshot Plugin: ENS name is required"),
});

export type SnapshotConfig = z.infer<typeof snapshotEnvSchema>;

export async function validateSnapshotConfig(
    runtime: IAgentRuntime
): Promise<SnapshotConfig> {
    try {
        const config = {
            SNAPSHOT_ENS_NAME:
                runtime.getSetting("SNAPSHOT_ENS_NAME") ||
                process.env.SNAPSHOT_ENS_NAME,
        }; // todo - allow for multiple spaces

        return snapshotEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Snapshot configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
