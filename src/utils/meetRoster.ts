import type { MeetDiver } from "../models/RegularMeet";
import type { MeetDive } from "../models/RegularMeet";

export function getNextDiverName(divers: readonly Pick<MeetDiver, "name">[]): string {
    const existingNames = new Set(divers.map(({ name }) => name.trim().toLocaleLowerCase()));
    let number = 1;

    while (existingNames.has(`diver ${number}`)) {
        number += 1;
    }

    return `Diver ${number}`;
}

export function moveDiverToIndex(divers: MeetDiver[], sourceIndex: number, destinationIndex: number): MeetDiver[] {
    if (sourceIndex < 0 || destinationIndex < 0
        || sourceIndex >= divers.length || destinationIndex >= divers.length
        || sourceIndex === destinationIndex) {
        return divers;
    }

    const reorderedDivers = [...divers];
    const [movedDiver] = reorderedDivers.splice(sourceIndex, 1);
    reorderedDivers.splice(destinationIndex, 0, movedDiver);
    return reorderedDivers;
}

export function moveScheduleSlotToIndex(
    schedule: Array<MeetDive | null>,
    sourceIndex: number,
    destinationIndex: number,
): Array<MeetDive | null> {
    if (sourceIndex < 0 || destinationIndex < 0
        || sourceIndex >= schedule.length || destinationIndex >= schedule.length
        || sourceIndex === destinationIndex) {
        return schedule;
    }

    const reorderedSchedule = [...schedule];
    const [movedDive] = reorderedSchedule.splice(sourceIndex, 1);
    reorderedSchedule.splice(destinationIndex, 0, movedDive);
    return reorderedSchedule;
}