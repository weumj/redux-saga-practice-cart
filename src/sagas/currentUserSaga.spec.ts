import { take, put, call, apply, CallEffectFn } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import { GET_CURRENT_USER_INFO, setCurrentUser } from "../actions";

import { currentUserSaga } from "./currentUserSaga";

declare const describe: Function;
declare const test: Function;
declare const expect: Function;

describe("The current user saga", () => {
    test("It fetches and puts the current user's data", () => {
        const id = "NCC1701";
        const user = { name: "Jean Inc" };
        const json = () => {};
        const response = { json };

        const gen = currentUserSaga();

        expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
        expect(gen.next({ id }).value).toEqual(
            call(
                fetch as CallEffectFn<any>,
                `http://localhost:8081/user/${id}`,
            ),
        );
        expect(gen.next(response).value).toEqual(apply(response, json));
        expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));
    });
});
