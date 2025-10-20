/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AwardAmount } from './AwardAmount';
import type { WorkFunder } from './WorkFunder';
export type Funding = {
    type: string;
    scheme?: string;
    'award-amount'?: AwardAmount;
    funder: WorkFunder;
};

