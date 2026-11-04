import { describe, expect, it } from "vitest";
import type { MeetDiver } from "../models/RegularMeet";
import { getMeetDivePositions } from "./meetScoring";

describe("getMeetDivePositions", () => {
    it("orders scheduled dives by round and roster order, skipping empty slots", () => {
        const divers: MeetDiver[] = [
            {
                id: "diver-1",
                name: "Diver 1",
                isHome: true,
                schedule: [{ id: "dive-1", catalogKey: "101c", difficulty: 1.2, judgeScores: [0, 0, 0] }, null],
            },
            {
                id: "diver-2",
                name: "Diver 2",
                isHome: false,
                schedule: [null, { id: "dive-2", catalogKey: "201c", difficulty: 1.5, judgeScores: [0, 0, 0] }],
            },
        ];

        expect(getMeetDivePositions(divers)).toEqual([
            { diverId: "diver-1", roundIndex: 0 },
            { diverId: "diver-2", roundIndex: 1 },
        ]);
    });
});