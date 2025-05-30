import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from 'next-themes';
import AnimatedCursor from "react-animated-cursor";
import NavBar from "@/app/components/NavBar";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar/>
            {children}
        </ThemeProvider>
        <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
                backgroundColor: 'var(--cursor-color)'
            }}
            outerStyle={{
                border: '3px solid var(--cursor-color)'
            }}
        />
        </body>
        </html>
    );
}
