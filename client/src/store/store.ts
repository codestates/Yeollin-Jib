import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers/rootReducer";

const logger = createLogger();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
