import {
    combineReducers,
    applyMiddleware,
    legacy_createStore as createStore,
} from "redux";
import reduxThunk from "redux-thunk";
import { UserReducers } from "./userReducers";
import { adminReducers } from "./adminReducer";
import { filmReducers } from "./filmReducers";
import { filmUserReducers } from "./filmUserReducers";
import { theaterReducers } from "./theaterAdminReducers";
import { LoadingReducers } from "./loadingReducers";
import { MovieScheduleReducers } from "./movieScheduleReducer";
import { SeatReducers } from "./SeatReducers";
const rootReducers = combineReducers({
    UserReducers,
    adminReducers,
    filmReducers,
    filmUserReducers,
    theaterReducers,
    LoadingReducers,
    MovieScheduleReducers,
    SeatReducers,
});

export const store = createStore(rootReducers, applyMiddleware(reduxThunk));
