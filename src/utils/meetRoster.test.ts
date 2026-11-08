import { describe, expect, it } from "vitest";
import type { MeetDiver } from "../models/RegularMeet";
import type { MeetDive } from "../models/RegularMeet";
import { getNextDiverName, moveDiverToIndex, moveScheduleSlotToIndex } from "./meetRoster";

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

describe("moveDiverToIndex", () => {
    const divers: MeetDiver[] = [
        { id: "diver-1", name: "Diver 1", isHome: true, schedule: [] },
        { id: "diver-2", name: "Diver 2", isHome: false, schedule: [] },
        { id: "diver-3", name: "Diver 3", isHome: true, schedule: [] },
    ];

    it("moves a diver to the drop target without changing the original list", () => {
        expect(moveDiverToIndex(divers, 0, 2).map(({ id }) => id)).toEqual(["diver-2", "diver-3", "diver-1"]);
        expect(divers.map(({ id }) => id)).toEqual(["diver-1", "diver-2", "diver-3"]);
    });

    it("keeps the order for invalid or unchanged positions", () => {
        expect(moveDiverToIndex(divers, 0, -1)).toBe(divers);
        expect(moveDiverToIndex(divers, 3, 0)).toBe(divers);
        expect(moveDiverToIndex(divers, 1, 1)).toBe(divers);
    });
});

describe("moveScheduleSlotToIndex", () => {
    const schedule: Array<MeetDive | null> = [
        { id: "dive-1", catalogKey: "101c", difficulty: 1.2, judgeScores: [0, 0, 0] },
        null,
        { id: "dive-2", catalogKey: "201c", difficulty: 1.5, judgeScores: [0, 0, 0] },
        null,
        null,
        null,
    ];

    it("moves a scheduled dive to a drop target without mutating the source", () => {
        const movedSchedule = moveScheduleSlotToIndex(schedule, 2, 0);

        expect(movedSchedule[0]?.id).toBe("dive-2");
        expect(movedSchedule[1]?.id).toBe("dive-1");
        expect(schedule[2]?.id).toBe("dive-2");
    });

    it("keeps the original order for invalid or unchanged positions", () => {
        expect(moveScheduleSlotToIndex(schedule, 0, -1)).toBe(schedule);
        expect(moveScheduleSlotToIndex(schedule, 6, 0)).toBe(schedule);
        expect(moveScheduleSlotToIndex(schedule, 2, 2)).toBe(schedule);
    });
});