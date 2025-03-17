"use client";

import NavBar from "@/components/shared/NavBar";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <NavBar />
        <div className="">{children}</div>
      </Provider>
    </SessionProvider>
  );
};

export default StoreProvider;
