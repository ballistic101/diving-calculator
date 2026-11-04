import { describe, expect, it } from "vitest";
import type { MeetDiver } from "../models/RegularMeet";
import type { MeetDive } from "../models/RegularMeet";
import { getNextDiverName, moveDiver, moveScheduleSlot } from "./meetRoster";

describe("getNextDiverName", () => {
    it("starts at Diver 1 for an empty roster", () => {
        expect(getNextDiverName([])).toBe("Diver 1");
    });

    it("skips default names already used", () => {
        expect(getNextDiverName([
            { name: "Diver 1" },
            { name: "diver 3" },
            { name: "  Diver 4 " },
        ])).toBe("Diver 2");
    });
});

describe("moveDiver", () => {
    const divers: MeetDiver[] = [
        { id: "diver-1", name: "Diver 1", isHome: true, schedule: [] },
        { id: "diver-2", name: "Diver 2", isHome: false, schedule: [] },
        { id: "diver-3", name: "Diver 3", isHome: true, schedule: [] },
    ];

    it("moves a diver one position without changing the original list", () => {
        expect(moveDiver(divers, 1, -1).map(({ id }) => id)).toEqual(["diver-2", "diver-1", "diver-3"]);
        expect(divers.map(({ id }) => id)).toEqual(["diver-1", "diver-2", "diver-3"]);
    });

    it("keeps the order when moving beyond either boundary", () => {
        expect(moveDiver(divers, 0, -1)).toBe(divers);
        expect(moveDiver(divers, 2, 1)).toBe(divers);
    });
});

describe("moveScheduleSlot", () => {
    const schedule: Array<MeetDive | null> = [
        { id: "dive-1", catalogKey: "101c", difficulty: 1.2, judgeScores: [0, 0, 0] },
        null,
        { id: "dive-2", catalogKey: "201c", difficulty: 1.5, judgeScores: [0, 0, 0] },
        null,
        null,
        null,
    ];

    it("moves a scheduled dive between round slots without mutating the source", () => {
        const movedSchedule = moveScheduleSlot(schedule, 2, -1);

        expect(movedSchedule[1]?.id).toBe("dive-2");
        expect(movedSchedule[2]).toBeNull();
        expect(schedule[2]?.id).toBe("dive-2");
    });

    it("does not move beyond the six round boundaries", () => {
        expect(moveScheduleSlot(schedule, 0, -1)).toBe(schedule);
        expect(moveScheduleSlot(schedule, 5, 1)).toBe(schedule);
    });
});