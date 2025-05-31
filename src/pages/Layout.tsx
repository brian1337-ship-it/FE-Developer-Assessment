import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">{children}</main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#fff",
          },
        }}
      />
      <Footer />
    </div>
  );
};

export default Layout;
