import axios, { type AxiosInstance } from "axios";
import { Proposal } from "../types";

export class ReadOnlySnapshotClient {
    instance: AxiosInstance;

    constructor() {
        // Creating the axios instance with the base URL injected
        this.instance = axios.create({ baseURL: 'https://hub.snapshot.org/graphql' });
    }

    async getProposalsFromSnapshotSpace(space: string): Promise<Proposal[]> {
        const response = await this.instance.post({
            query: `
                query {
                    proposals (
                        first: 20,
                        skip: 0,
                        where: {
                            space_in: ["${space}"]
                        },
                        orderBy: "created",
                        orderDirection: desc
                    ) {
                        id
                        title
                        body
                        choices
                        start
                        end
                        snapshot
                        state
                        scores
                        scores_total
                        scores_updated
                        author
                    }
                }
            `,
        });

        // Validate the proposals response
        const proposals = response.data;
        if (
            !proposals.data ||
            !proposals.data.proposals ||
            !proposals.data.proposals.length ||
            proposals.data.proposals.length === 0
        ) {
            throw new Error("No proposal data found");
        }

        return proposals.data.proposals as Proposal[];
    }

    formatLatestProposalsData(proposals: Proposal[]): string {
        return proposals
            .map((proposal) => {
                return `Proposal ID: ${proposal.id}\nTitle: ${proposal.title}\nBody: ${proposal.body}\nChoices: ${proposal.choices.join(", ")}\nStart: ${proposal.start}\nEnd: ${proposal.end}\nSnapshot: ${proposal.snapshot}\nState: ${proposal.state}\nScores: ${proposal.scores}\nScores Total: ${proposal.scores_total}\nScores Updated: ${proposal.scores_updated}\nAuthor: ${proposal.author}\n\n`;
            })
            .join("");
    }

}