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

export function moveDiver(divers: MeetDiver[], index: number, offset: -1 | 1): MeetDiver[] {
    const destination = index + offset;
    if (index < 0 || destination < 0 || index >= divers.length || destination >= divers.length) {
        return divers;
    }

    const reorderedDivers = [...divers];
    [reorderedDivers[index], reorderedDivers[destination]] = [reorderedDivers[destination], reorderedDivers[index]];
    return reorderedDivers;
}

export function moveScheduleSlot(schedule: Array<MeetDive | null>, index: number, offset: -1 | 1): Array<MeetDive | null> {
    const destination = index + offset;
    if (index < 0 || destination < 0 || index >= schedule.length || destination >= schedule.length) {
        return schedule;
    }

    const reorderedSchedule = [...schedule];
    [reorderedSchedule[index], reorderedSchedule[destination]] = [reorderedSchedule[destination], reorderedSchedule[index]];
    return reorderedSchedule;
}