import { createSelector } from "reselect";
export const itemQuantityFetchStatusSelector = createSelector(
    (state: Map<string, any>) => state.get(`itemQuantityFetchStatus`),
    itemQuantityFetchStatus => itemQuantityFetchStatus,
);
