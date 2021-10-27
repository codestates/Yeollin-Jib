import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authReducer from "./authReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
