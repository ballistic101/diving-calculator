import type { MeetDive, MeetDiver } from "../models/RegularMeet";

export interface CalculatedDive {
    points: number;
    cumulativeTotal: number;
}

export function calculateDivePoints(dive: MeetDive): number {
    const judgeScoreTotal = dive.judgeScores.reduce((total, score) => total + score, 0);
    return judgeScoreTotal * dive.difficulty;
}

export function calculateDiverTotals(diver: Pick<MeetDiver, "schedule">): Array<CalculatedDive | null> {
    let cumulativeTotal = 0;

    return diver.schedule.map((dive) => {
        if (dive === null) {
            return null;
        }

        const points = calculateDivePoints(dive);
        cumulativeTotal += points;
        return { points, cumulativeTotal };
    });
}