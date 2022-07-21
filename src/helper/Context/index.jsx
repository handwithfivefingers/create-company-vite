import { createContext } from "react";

const RouterContext = createContext({});
export const RouterProvider = RouterContext.Provider;
export const RouterConsumer = RouterContext.Consumer;
export default RouterContext;
