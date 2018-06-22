import { createSelector } from "reselect";
export const isCheckingOutSelector = createSelector(
    (state: Map<string, any>) => state.get("isCheckingOut"),
    isCheckingOut => isCheckingOut,
);
