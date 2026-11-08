import { describe, expect, it, vi } from "vitest";
import type { MeetDive, RegularMeet } from "../models/RegularMeet";
import { loadRegularMeet, saveRegularMeet } from "./regularMeetStorage";

const storageKey = "diving-calculator.regular-meet";

const sampleMeet: RegularMeet = {
    id: "meet-1",
    started: false,
    currentPosition: null,
    divers: [{
        id: "diver-1",
        name: "Diver 1",
        isHome: true,
        schedule: [{
            id: "dive-1",
            catalogKey: "101c",
            difficulty: 1.2,
            judgeScores: [0, 5.5, 10],
        }],
    }],
};

function makeStorage(initialValue: string | null = null) {
    let value = initialValue;

    return {
        getItem: vi.fn(() => value),
        setItem: vi.fn((_key: string, newValue: string) => {
            value = newValue;
        }),
    };
}

describe("regular meet storage", () => {
    it("starts with an empty meet when no saved data exists", () => {
        expect(loadRegularMeet(makeStorage()).divers).toEqual([]);
    });

    it("round-trips meet data in the current storage version", () => {
        const storage = makeStorage();

        expect(saveRegularMeet(sampleMeet, storage)).toBe(true);
        expect(storage.setItem).toHaveBeenCalledWith(storageKey, expect.any(String));
        expect(JSON.parse(storage.setItem.mock.calls[0][1])).toEqual({ version: 1, meet: sampleMeet });
        expect(loadRegularMeet(storage)).toEqual(sampleMeet);
    });

    it("defaults older saved meets to setup state", () => {
        const legacyMeet = { id: sampleMeet.id, divers: sampleMeet.divers };
        const storage = makeStorage(JSON.stringify({ version: 1, meet: legacyMeet }));

        expect(loadRegularMeet(storage)).toMatchObject({ started: false, currentPosition: null });
    });

    it("round-trips active meet position", () => {
        const storage = makeStorage();
        const activeMeet: RegularMeet = {
            ...sampleMeet,
            started: true,
            currentPosition: { diverId: "diver-1", roundIndex: 2 },
        };

        expect(saveRegularMeet(activeMeet, storage)).toBe(true);
        expect(loadRegularMeet(storage)).toEqual(activeMeet);
    });

    it("round-trips a manually scored dive without a catalog selection", () => {
        const storage = makeStorage();
        const manualMeet: RegularMeet = {
            ...sampleMeet,
            divers: [{
                ...sampleMeet.divers[0],
                schedule: [{
                    id: "manual-dive-1",
                    catalogKey: null,
                    difficulty: 2.1,
                    judgeScores: [4, 5, 6],
                }],
            }],
        };

        expect(saveRegularMeet(manualMeet, storage)).toBe(true);
        expect(loadRegularMeet(storage)).toEqual(manualMeet);
    });

    it.each([
        ["malformed JSON", "not json"],
        ["an unsupported version", JSON.stringify({ version: 99, meet: sampleMeet })],
        ["a score outside the allowed range", JSON.stringify({
            version: 1,
            meet: {
                ...sampleMeet,
                divers: [{
                    ...sampleMeet.divers[0],
                    schedule: [{
                        ...(sampleMeet.divers[0].schedule[0] as MeetDive),
                        judgeScores: [0, 10.5, 10],
                    }],
                }],
            },
        })],
        ["a dive missing from the catalog", JSON.stringify({
            version: 1,
            meet: {
                ...sampleMeet,
                divers: [{
                    ...sampleMeet.divers[0],
                    schedule: [{ ...(sampleMeet.divers[0].schedule[0] as MeetDive), catalogKey: "unknown" }],
                }],
            },
        })],
    ])("returns an empty meet for %s", (_description, serializedMeet) => {
        expect(loadRegularMeet(makeStorage(serializedMeet as string)).divers).toEqual([]);
    });

    it("recovers from storage read and write failures", () => {
        const failingStorage = {
            getItem: () => { throw new Error("Storage unavailable"); },
            setItem: () => { throw new Error("Storage unavailable"); },
        };

        expect(loadRegularMeet(failingStorage).divers).toEqual([]);
        expect(saveRegularMeet(sampleMeet, failingStorage)).toBe(false);
    });
});