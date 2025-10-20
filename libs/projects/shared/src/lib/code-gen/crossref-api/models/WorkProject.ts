/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AwardAmount } from './AwardAmount';
import type { DateParts } from './DateParts';
import type { Funding } from './Funding';
import type { Investigator } from './Investigator';
import type { ProjectTitle } from './ProjectTitle';
import type { WorksProjectDescription } from './WorksProjectDescription';
export type WorkProject = {
    'award-end'?: Array<DateParts>;
    'award-planned-start'?: Array<DateParts>;
    'award-start'?: Array<DateParts>;
    'lead-investigator'?: Array<Investigator>;
    'award-planned-end'?: Array<DateParts>;
    investigator?: Array<Investigator>;
    funding?: Array<Funding>;
    'project-title': Array<ProjectTitle>;
    'award-amount'?: AwardAmount;
    'co-lead-investigator'?: Array<Investigator>;
    'project-description'?: Array<WorksProjectDescription>;
};

