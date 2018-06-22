import { createSelector } from "reselect";
import { Map } from "immutable";

export const cartItemsSelector = createSelector(
    (state: Map<string, any>) => state.get(`cartItems`) as any[],
    cartItems => cartItems,
);
