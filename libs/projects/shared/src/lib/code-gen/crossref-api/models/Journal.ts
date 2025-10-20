/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BreakdownsObject } from './BreakdownsObject';
import type { CoverageFull } from './CoverageFull';
import type { CoverageTypeObject } from './CoverageTypeObject';
import type { DoiCounts } from './DoiCounts';
import type { Flags } from './Flags';
import type { JournalIssnType } from './JournalIssnType';
export type Journal = {
    'last-status-check-time': number;
    counts: DoiCounts;
    breakdowns: BreakdownsObject;
    /**
     * The publisher of the journal
     */
    publisher: string;
    coverage: CoverageFull;
    /**
     * The title of the journal
     */
    title: string;
    subjects: Array<string>;
    'coverage-type': CoverageTypeObject;
    flags: Flags;
    /**
     * The ISSN identifier associated with the journal
     */
    ISSN: Array<string>;
    'issn-type': JournalIssnType;
};

