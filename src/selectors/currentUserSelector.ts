import { createSelector } from "reselect";
export const currentUserSelector = createSelector(
    (state: Map<string, any>) => state.get(`currentUser`),
    currentUser => currentUser,
);
