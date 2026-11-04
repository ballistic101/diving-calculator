import { MAX_MEET_ROUNDS } from "../models/RegularMeet";
import type { MeetDiver } from "../models/RegularMeet";

export interface MeetDivePosition {
    diverId: string;
    roundIndex: number;
}

export function getMeetDivePositions(divers: MeetDiver[]): MeetDivePosition[] {
    const positions: MeetDivePosition[] = [];

    for (let roundIndex = 0; roundIndex < MAX_MEET_ROUNDS; roundIndex += 1) {
        for (const diver of divers) {
            if (diver.schedule[roundIndex] !== null && diver.schedule[roundIndex] !== undefined) {
                positions.push({ diverId: diver.id, roundIndex });
            }
        }
    }

    return positions;
}