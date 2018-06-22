import { take, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { connect } from "../createSocketConnection";
import { setCustomerServiceAvailability } from "../actions";

export function* customerServiceAvailabilitySaga() {
    const socket = connect();
    const channel = eventChannel(emit => {
        socket.on("SUPPORT_AVAILABLE", () => {
            emit(true);
        });

        socket.on("SUPPORT_NOT_AVAILABLE", () => {
            emit(false);
        });

        return () => {
            socket.close();
        };
    });

    while (true) {
        let supportAvailable = yield take(channel);

        yield put(setCustomerServiceAvailability(supportAvailable));
    }
}
