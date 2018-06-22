import { createSelector } from "reselect";
import { Map } from "immutable";

export const canCheckOutSelector = createSelector(
    (state: Map<string, any>) => state.get("canCheckOut") as boolean,
    canCheckOut => canCheckOut,
);
