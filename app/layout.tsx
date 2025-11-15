import Navbar from "@/components/Navbar";
import { Provider as JotaiProvider } from "jotai";
import Providers from "@/utilities/ReactQuery/Providers";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { theme } from "@/mantine/theme";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "PawSwap",
  description: "The ultimate place to find your next pet-sitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps} className={poppins.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.variable}`}>
        <MantineProvider theme={theme}>
          <Notifications />
          <JotaiProvider>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </JotaiProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
