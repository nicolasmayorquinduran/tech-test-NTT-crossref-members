/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FunderHierarchy } from './FunderHierarchy';
import type { HierarchyNamesObject } from './HierarchyNamesObject';
export type FunderFull = {
    'hierarchy-names': HierarchyNamesObject;
    'replaced-by': Array<string>;
    'work-count': number;
    name: string;
    descendants: Array<string>;
    'descendant-work-count': number;
    /**
     * The id of the funder
     */
    id: string;
    tokens: Array<string>;
    replaces: Array<string>;
    uri: string;
    hierarchy: FunderHierarchy;
    /**
     * Other names this funder may be identified with
     */
    'alt-names': Array<string>;
    /**
     * The geographic location of the funder
     */
    location: string;
};

