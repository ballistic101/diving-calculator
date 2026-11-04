export const MAX_MEET_ROUNDS = 6;

export type JudgeScores = [number, number, number];

export interface MeetDive {
    id: string;
    catalogKey: string;
    difficulty: number;
    judgeScores: JudgeScores;
}

export interface MeetDiver {
    id: string;
    name: string;
    isHome: boolean;
    schedule: Array<MeetDive | null>;
}

export interface RegularMeet {
    id: string;
    divers: MeetDiver[];
}