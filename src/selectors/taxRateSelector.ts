import { createSelector } from "reselect";
export const taxRateSelector = createSelector(
    (state: Map<string, any>) => state.get("taxRate"),
    taxRate => taxRate,
);
