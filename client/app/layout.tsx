"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Header, Footer } from "@/components/layout/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        <Provider store={store}>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 w-full mx-auto max-w-[2000px] px-4">
              <Header />
              {children}
              <Footer />
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
