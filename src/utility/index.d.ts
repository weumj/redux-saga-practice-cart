import { AnyAction } from "redux";

export declare type ActionFunction = (...args: any[]) => AnyAction;

export function createReducer(): any;
export function formatCurrency(n: number): string;
export function getQuery(): object;
export function makeActionCreator(
    type: string,
    ...argNames: string[]
): ActionFunction;
