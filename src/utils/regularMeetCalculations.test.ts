import { describe, expect, it } from "vitest";
import type { MeetDive } from "../models/RegularMeet";
import { calculateDivePoints, calculateDiverTotals } from "./regularMeetCalculations";

const sampleDive: MeetDive = {
    id: "dive-1",
    catalogKey: "101c",
    difficulty: 2,
    judgeScores: [4, 5, 6],
};

describe("calculateDivePoints", () => {
    it("multiplies the three judge scores by difficulty", () => {
        expect(calculateDivePoints(sampleDive)).toBe(30);
    });

    it("supports half-point judge scores and score boundaries", () => {
        expect(calculateDivePoints({ ...sampleDive, judgeScores: [0, 0, 0] })).toBe(0);
        expect(calculateDivePoints({ ...sampleDive, judgeScores: [10, 10, 10] })).toBe(60);
        expect(calculateDivePoints({ ...sampleDive, judgeScores: [4, 5.5, 6] })).toBe(31);
    });

    it("uses the current difficulty when recalculating points", () => {
        expect(calculateDivePoints({ ...sampleDive, difficulty: 2.5 })).toBe(37.5);
    });
});

describe("calculateDiverTotals", () => {
    it("keeps empty rounds empty and accumulates scheduled dives in order", () => {
        const secondDive: MeetDive = {
            ...sampleDive,
            id: "dive-2",
            difficulty: 1.5,
            judgeScores: [2, 3, 4],
        };

        expect(calculateDiverTotals({ schedule: [sampleDive, null, secondDive] })).toEqual([
            { points: 30, cumulativeTotal: 30 },
            null,
            { points: 13.5, cumulativeTotal: 43.5 },
        ]);
    });
});