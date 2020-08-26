import { TimeTableRow } from './TimeTableRow';

export interface Train {

cancelled: boolean;
commuterLineID: string;
deleted: boolean;
departureDate: string;
operatorShortCode: string;
operatorUICCode: number;
runningCurrently: boolean;
timeTableRows: TimeTableRow[];
timetableAcceptanceDate: string;
timetableType: string;
trainCategory: string;
trainNumber: number;
trainType: string;
version: number;

}