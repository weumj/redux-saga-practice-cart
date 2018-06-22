import { createSelector } from "reselect";
export const customerServiceAvailabilitySelector = createSelector(
    (state: Map<string, any>) => state.get("customerServiceAvailability"),
    customerServiceAvailability => customerServiceAvailability,
);
