import { MAX_MEET_ROUNDS } from "../models/RegularMeet";
import type { MeetDivePosition, MeetDiver, RegularMeet } from "../models/RegularMeet";

export function getMeetDivePositions(divers: MeetDiver[]): MeetDivePosition[] {
    const positions: MeetDivePosition[] = [];

    for (let roundIndex = 0; roundIndex < MAX_MEET_ROUNDS; roundIndex += 1) {
        for (const diver of divers) {
            positions.push({ diverId: diver.id, roundIndex });
        }
    }

    return positions;
}

export function resetMeetProgress(meet: RegularMeet): RegularMeet {
    const divers = meet.divers.map((diver) => ({
        ...diver,
        schedule: diver.schedule.map((dive) => dive ? { ...dive, judgeScores: [0, 0, 0] as const } : null),
    }));

    return {
        ...meet,
        divers,
        started: false,
        currentPosition: null,
    };
}