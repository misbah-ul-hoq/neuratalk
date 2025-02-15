"use client";

import NavBar from "@/components/shared/NavBar";
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
const RootLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <NavBar />
      <div className="">{children}</div>
    </Provider>
  );
};

export default RootLayoutClient;
