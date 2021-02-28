import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import userReducer from "./reducer";

const rootReducer = combineReducers({
  // app: appReducer,
  auth: userReducer,
});

const thunk = (store) => (next) => (action) => {
  typeof action === "function" ? action(store.dispatch) : next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
