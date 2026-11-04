import { DiveTypes } from "../constants/DiveTypes";
import { MAX_MEET_ROUNDS } from "../models/RegularMeet";
import type { JudgeScores, MeetDive, MeetDiver, RegularMeet } from "../models/RegularMeet";
import { createStableId } from "../utils/createStableId";

const STORAGE_KEY = "diving-calculator.regular-meet";
const STORAGE_VERSION = 1;

type StorageAdapter = Pick<Storage, "getItem" | "setItem">;

interface PersistedMeet {
    version: number;
    meet: RegularMeet;
}

export function createEmptyMeet(): RegularMeet {
    return { id: createStableId(), divers: [] };
}

export function loadRegularMeet(storage?: StorageAdapter): RegularMeet {
    const target = storage ?? getBrowserStorage();
    if (!target) {
        return createEmptyMeet();
    }

    try {
        const serializedMeet = target.getItem(STORAGE_KEY);
        if (!serializedMeet) {
            return createEmptyMeet();
        }

        const parsed: unknown = JSON.parse(serializedMeet);
        if (!isPersistedMeet(parsed)) {
            return createEmptyMeet();
        }

        return parsed.meet;
    } catch {
        return createEmptyMeet();
    }
}

export function saveRegularMeet(meet: RegularMeet, storage?: StorageAdapter): boolean {
    const target = storage ?? getBrowserStorage();
    if (!target) {
        return false;
    }

    try {
        const persistedMeet: PersistedMeet = { version: STORAGE_VERSION, meet };
        target.setItem(STORAGE_KEY, JSON.stringify(persistedMeet));
        return true;
    } catch {
        return false;
    }
}

function getBrowserStorage(): StorageAdapter | null {
    try {
        return typeof window === "undefined" ? null : window.localStorage;
    } catch {
        return null;
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidId(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

function isValidJudgeScore(value: unknown): value is number {
    return typeof value === "number"
        && Number.isFinite(value)
        && value >= 0
        && value <= 10
        && Number.isInteger(value * 2);
}

function isJudgeScores(value: unknown): value is JudgeScores {
    return Array.isArray(value)
        && value.length === 3
        && value.every(isValidJudgeScore);
}

function isMeetDive(value: unknown, ids: Set<string>): value is MeetDive {
    if (!isRecord(value)
        || !isValidId(value.id)
        || ids.has(value.id)
        || typeof value.catalogKey !== "string"
        || !Object.hasOwn(DiveTypes, value.catalogKey)
        || typeof value.difficulty !== "number"
        || !Number.isFinite(value.difficulty)
        || value.difficulty <= 0
        || !isJudgeScores(value.judgeScores)) {
        return false;
    }

    ids.add(value.id);
    return true;
}

function isMeetDiver(value: unknown, ids: Set<string>): value is MeetDiver {
    if (!isRecord(value)
        || !isValidId(value.id)
        || ids.has(value.id)
        || typeof value.name !== "string"
        || typeof value.isHome !== "boolean"
        || !Array.isArray(value.schedule)
        || value.schedule.length > MAX_MEET_ROUNDS) {
        return false;
    }

    ids.add(value.id);
    return value.schedule.every((dive) => dive === null || isMeetDive(dive, ids));
}

function isRegularMeet(value: unknown): value is RegularMeet {
    if (!isRecord(value) || !isValidId(value.id) || !Array.isArray(value.divers)) {
        return false;
    }

    const ids = new Set([value.id]);
    return value.divers.every((diver) => isMeetDiver(diver, ids));
}

function isPersistedMeet(value: unknown): value is PersistedMeet {
    return isRecord(value)
        && value.version === STORAGE_VERSION
        && isRegularMeet(value.meet);
}