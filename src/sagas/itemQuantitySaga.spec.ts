import { put, call, select, CallEffectFn } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import {
    decreaseItemQuantity,
    FETCHING,
    FETCHED,
    setItemQuantityFetchStatus,
} from "../actions";

import { currentUserSelector } from "../selectors";
import { fromJS, Map } from "immutable";
import { increaseItemQuantitySaga } from "./itemQuantitySaga";
import { Effect } from "redux-saga";

declare const describe: Function;
declare const test: Function;
declare const expect: Function;
declare const beforeEach: Function;

describe("The item quantity saga", () => {
    let item: { id: number };
    let user: Map<string, any>;

    beforeEach(() => {
        item = { id: 12345 };
        user = fromJS({ id: "ABCDE" });
    });
    describe("handle increase item quantity", () => {
        let gen: IterableIterator<Effect>;
        beforeEach(() => {
            gen = increaseItemQuantitySaga(item);
            expect(gen.next().value).toEqual(
                put(setItemQuantityFetchStatus(FETCHING)),
            );
            expect(gen.next().value).toEqual(select(currentUserSelector));
            expect(gen.next(user).value).toEqual(
                call(
                    fetch as CallEffectFn<any>,
                    `http://localhost:8081/cart/add/ABCDE/12345`,
                ),
            );
        });

        test("increasing quantity successfully", () => {
            expect(gen.next({ status: 200 }).value).toEqual(
                put(setItemQuantityFetchStatus(FETCHED)),
            );
        });

        test("increasing quantity unsuccessfully", () => {
            expect(gen.next({ status: 500 }).value).toEqual(
                put(decreaseItemQuantity(item.id, true)),
            );
            expect(gen.next().value).toEqual(
                put(setItemQuantityFetchStatus(FETCHED)),
            );
        });
    });
});
