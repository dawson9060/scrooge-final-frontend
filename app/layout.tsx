import { theme } from "@/mantine/theme";
import Providers from "@/utilities/ReactQuery/Providers";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Scrooge",
  description: "Come and be shamed for your spending habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps} className={poppins.variable}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={`${poppins.variable}`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications />
          <JotaiProvider>
            <Providers>{children}</Providers>
          </JotaiProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
