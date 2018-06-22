import { createSelector } from "reselect";
export const itemsDetailSelector = createSelector(
    (state: Map<string, any>) => state.get(`items`) as any[],
    items => items,
);
