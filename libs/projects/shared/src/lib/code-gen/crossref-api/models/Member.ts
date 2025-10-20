/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BreakdownsObject } from './BreakdownsObject';
import type { CoverageFull } from './CoverageFull';
import type { CoverageTypeObject } from './CoverageTypeObject';
import type { DoiCounts } from './DoiCounts';
import type { Flags } from './Flags';
import type { MemberCountsType } from './MemberCountsType';
import type { MemberPrefix } from './MemberPrefix';
export type Member = {
    'last-status-check-time': number;
    'primary-name': string;
    counts: DoiCounts;
    breakdowns: BreakdownsObject;
    prefixes: Array<string>;
    coverage: CoverageFull;
    prefix: Array<MemberPrefix>;
    id: number;
    tokens: Array<string>;
    'counts-type': MemberCountsType;
    'coverage-type': CoverageTypeObject;
    flags: Flags;
    location: string;
    names: Array<string>;
};

