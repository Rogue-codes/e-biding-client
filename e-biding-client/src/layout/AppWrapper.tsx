import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../configs/store";

interface IAppWrapper {
  children: React.ReactNode;
}
export default function AppWrapper({ children }: IAppWrapper) {
  return (
    <Provider store={store}>
      <SnackbarProvider />
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}
