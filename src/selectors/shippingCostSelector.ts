import { createSelector } from "reselect";
export const shippingCostSelector = createSelector(
    (state: Map<string, any>) => state.get(`shippingCost`),
    shippingCost => shippingCost,
);
