import { PassangerTerm } from './PassangerTerm';

export interface Cause {

    categoryCode: string;
    categoryCodeId: number;
    categoryName: string;
    description: string; 
    detailedCategoryCode: string;
    detailedCategoryCodeId: number;
    detailedCategoryName: string;
    id: number;
    passengerTerm: PassangerTerm;
    thirdCategoryCode: string;
    thirdCategoryCodeId: number;
    thirdCategoryName: string;
    validFrom: string;
    validTo: string;
}