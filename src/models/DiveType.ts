import { DiveStyle } from '../constants/DiveStyleEnum';
import { DiveGroup } from '../constants/DiveGroupEnum';

export interface DiveType {
    name: string;
    number: number;
    style: DiveStyle;
    group: DiveGroup;
    difficulty: number;
}