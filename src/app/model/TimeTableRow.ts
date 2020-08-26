import { Cause } from './Cause';

export interface TimeTableRow {

    actualTime: string;
    cancelled: boolean;
    causes: Cause[];

}