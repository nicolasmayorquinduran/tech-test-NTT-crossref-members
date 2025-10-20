/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DateParts } from './DateParts';
import type { InvestigatorAffiliation } from './InvestigatorAffiliation';
export type Investigator = {
    ORCID?: string;
    suffix?: string;
    given?: string;
    family?: string;
    affiliation: Array<InvestigatorAffiliation>;
    name?: string;
    'role-start'?: DateParts;
    'authenticated-orcid'?: boolean;
    prefix?: string;
    'alternate-name'?: string;
    sequence?: string;
    'role-end'?: DateParts;
};

