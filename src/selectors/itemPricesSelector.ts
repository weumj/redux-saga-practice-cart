import { createSelector } from "reselect";
export const itemPricesSelector = createSelector(
    (state: Map<string, any>) => state.get(`itemPrices`) as any[],
    itemPrices => itemPrices,
);

export const itemPriceSelector = (id: number | string) => (
    state: Map<string, any>,
): any | null => {
    const entry = itemPricesSelector(state).find(item => item.get(`id`) === id);
    if (entry) {
        return entry.get(`price`);
    } else {
        return null;
    }
};
