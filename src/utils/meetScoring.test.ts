import { describe, expect, it } from "vitest";
import type { MeetDiver, RegularMeet } from "../models/RegularMeet";
import { getMeetDivePositions, resetMeetProgress } from "./meetScoring";

describe("getMeetDivePositions", () => {
    it("keeps a diver with an unconfigured dive in the round for manual scoring", () => {
        const divers: MeetDiver[] = [
            {
                id: "diver-1",
                name: "Diver 1",
                isHome: true,
                schedule: [
                    { id: "dive-1-1", catalogKey: "101c", difficulty: 1.2, judgeScores: [0, 0, 0] },
                    { id: "dive-1-2", catalogKey: "102c", difficulty: 1.4, judgeScores: [0, 0, 0] },
                ],
            },
            {
                id: "diver-2",
                name: "Diver 2",
                isHome: false,
                schedule: [null, { id: "dive-2-2", catalogKey: "202c", difficulty: 1.5, judgeScores: [0, 0, 0] }],
            },
        ];

        expect(getMeetDivePositions(divers)).toEqual([
            { diverId: "diver-1", roundIndex: 0 },
            { diverId: "diver-2", roundIndex: 0 },
            { diverId: "diver-1", roundIndex: 1 },
            { diverId: "diver-2", roundIndex: 1 },
            ...Array.from({ length: 4 }, (_, index) => [
                { diverId: "diver-1", roundIndex: index + 2 },
                { diverId: "diver-2", roundIndex: index + 2 },
            ]).flat(),
        ]);
    });

    it("completes each round in roster order before advancing to the next round", () => {
        const divers: MeetDiver[] = [
            {
                id: "diver-1",
                name: "Diver 1",
                isHome: true,
                schedule: [
                    { id: "dive-1-1", catalogKey: "101c", difficulty: 1.2, judgeScores: [0, 0, 0] },
                    { id: "dive-1-2", catalogKey: "102c", difficulty: 1.4, judgeScores: [0, 0, 0] },
                ],
            },
            {
                id: "diver-2",
                name: "Diver 2",
                isHome: false,
                schedule: [
                    { id: "dive-2-1", catalogKey: "201c", difficulty: 1.5, judgeScores: [0, 0, 0] },
                    { id: "dive-2-2", catalogKey: "202c", difficulty: 1.5, judgeScores: [0, 0, 0] },
                ],
            },
        ];

        expect(getMeetDivePositions(divers)).toEqual([
            { diverId: "diver-1", roundIndex: 0 },
            { diverId: "diver-2", roundIndex: 0 },
            { diverId: "diver-1", roundIndex: 1 },
            { diverId: "diver-2", roundIndex: 1 },
            ...Array.from({ length: 4 }, (_, index) => [
                { diverId: "diver-1", roundIndex: index + 2 },
                { diverId: "diver-2", roundIndex: index + 2 },
            ]).flat(),
        ]);
    });

    it("includes every diver in all six rounds through manual positions", () => {
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

        expect(getMeetDivePositions(divers)).toHaveLength(12);
        expect(getMeetDivePositions(divers).slice(0, 4)).toEqual([
            { diverId: "diver-1", roundIndex: 0 },
            { diverId: "diver-2", roundIndex: 0 },
            { diverId: "diver-1", roundIndex: 1 },
            { diverId: "diver-2", roundIndex: 1 },
        ]);
    });

    it("creates six manual scoring turns for every diver without scheduled dives", () => {
        const divers: MeetDiver[] = [
            { id: "diver-1", name: "Diver 1", isHome: true, schedule: [] },
            { id: "diver-2", name: "Diver 2", isHome: false, schedule: [] },
        ];

        expect(getMeetDivePositions(divers)).toEqual(
            Array.from({ length: 6 }, (_, roundIndex) => [
                { diverId: "diver-1", roundIndex },
                { diverId: "diver-2", roundIndex },
            ]).flat(),
        );
    });
});

describe("resetMeetProgress", () => {
    it("clears every score and restarts at the first diver in round one", () => {
        const meet: RegularMeet = {
            id: "meet-1",
            started: true,
            currentPosition: { diverId: "diver-2", roundIndex: 1 },
            divers: [
                {
                    id: "diver-1",
                    name: "Diver 1",
                    isHome: true,
                    schedule: [{ id: "dive-1", catalogKey: "101c", difficulty: 1.8, judgeScores: [4, 5, 6] }],
                },
                {
                    id: "diver-2",
                    name: "Diver 2",
                    isHome: false,
                    schedule: [{ id: "manual-dive", catalogKey: null, difficulty: 2.1, judgeScores: [1, 2, 3] }],
                },
            ],
        };

        const resetMeet = resetMeetProgress(meet);

        expect(resetMeet.started).toBe(false);
        expect(resetMeet.currentPosition).toBeNull();
        expect(resetMeet.divers.map((diver) => diver.schedule[0]?.judgeScores)).toEqual([
            [0, 0, 0],
            [0, 0, 0],
        ]);
        expect(resetMeet.divers.map((diver) => diver.schedule[0]?.difficulty)).toEqual([1.8, 2.1]);
        expect(meet.divers[0].schedule[0]?.judgeScores).toEqual([4, 5, 6]);
    });
});