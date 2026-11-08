export const MAX_MEET_ROUNDS = 6;

export type JudgeScores = [number, number, number];

export interface MeetDive {
    id: string;
    catalogKey: string | null;
    difficulty: number;
    judgeScores: JudgeScores;
}

export interface MeetDiver {
    id: string;
    name: string;
    isHome: boolean;
    schedule: Array<MeetDive | null>;
}

export interface MeetDivePosition {
    diverId: string;
    roundIndex: number;
}

export interface RegularMeet {
    id: string;
    divers: MeetDiver[];
    started?: boolean;
    currentPosition?: MeetDivePosition | null;
}