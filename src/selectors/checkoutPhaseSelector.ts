import { createSelector } from "reselect";
export const checkoutPhaseSelector = createSelector(
    (state: Map<string, any>) => state.get("checkoutPhase") as string,
    checkoutPhase => checkoutPhase,
);
