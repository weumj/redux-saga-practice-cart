import { createSelector } from "reselect";
export const shippingFetchStatusSelector = createSelector(
    (state: Map<string, any>) => state.get(`shippingFetchStatus`),
    shippingFetchStatus => shippingFetchStatus,
);
