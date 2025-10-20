/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkAssertionExplanation } from './WorkAssertionExplanation';
import type { WorkAssertionGroup } from './WorkAssertionGroup';
export type WorkAssertion = {
    group?: WorkAssertionGroup;
    explanation?: WorkAssertionExplanation;
    name: string;
    value?: string;
    URL?: string;
    order?: number;
    label?: string;
};

