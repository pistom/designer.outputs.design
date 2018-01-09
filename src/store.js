import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from "redux-promise-middleware";
import reducer from "./reducers";
const middleware = composeWithDevTools(applyMiddleware(promise()));
export default createStore(reducer, middleware);
