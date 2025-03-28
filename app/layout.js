"use client";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import LoginProvider from "@/context/loginContext";

// export const metadata = {
//   title: "Big Stacks Bank",
//   description: "Banking made simple.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} flex min-h-screen flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoginProvider>
            <Header />
            {children}
            <Footer />
          </LoginProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
