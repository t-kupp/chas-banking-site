"use client";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Big Stacks Bank",
//   description: "Banking made simple.",
// };

export default function RootLayout({ children }) {
  // Hack to exclude <Footer/> and <Header/> from /account
  // Need to find a better way

  const pathname = usePathname();
  const noLayoutPages = ["/account"];

  if (noLayoutPages.includes(pathname)) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${GeistSans.className} flex min-h-screen flex-col antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} flex min-h-screen flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
