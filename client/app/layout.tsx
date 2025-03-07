"use client"

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className='antialiased'
        >
        <Provider store={store}>
            {children}
        </Provider>
        </body>
        </html>
    );
}