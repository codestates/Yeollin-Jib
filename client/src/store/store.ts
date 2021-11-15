import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "authReducer/setAuth/fulfilled",
          "userReducer/setUser/fulfilled",
        ],
      },
    }),
});

export const persistor = persistStore(store);
