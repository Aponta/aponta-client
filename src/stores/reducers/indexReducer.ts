import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import ApontamentoReducer from "./ApontamentoReducer";

export default combineReducers({
    LoginReducer,
    ApontamentoReducer,
});
