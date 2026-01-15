import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/component/bar/Navbar";
import Footer from "@/component/bar/Footer";
import ContextProvider from "@/component/helper/Context";



export const metadata: Metadata = {
  title: "Next Messaging App",
  description: "Next Messaging App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased w-full flex flex-col items-center justify-between`}
      >
        <ContextProvider>
          <Navbar />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
