import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from 'next-themes';
import AnimatedCursor from "react-animated-cursor";
import NavBar from "@/app/components/NavBar";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import PerformanceMonitor from "@/app/components/PerformanceMonitor";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://developer-moraouf.vercel.app'),
    title: "Mohamed AbdEl-Rauof - Full Stack Developer | React & Next.js Expert",
    description: "Portfolio of Mohamed AbdEl-Rauof, a passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my projects, certifications, and professional journey.",
    keywords: [
        "Mohamed AbdEl-Rauof",
        "Full Stack Developer",
        "React Developer",
        "Next.js Developer",
        "Frontend Developer",
        "Backend Developer",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Web Development",
        "Portfolio",
        "Software Engineer"
    ],
    authors: [{ name: "Mohamed AbdEl-Rauof" }],
    creator: "Mohamed AbdEl-Rauof",
    publisher: "Mohamed AbdEl-Rauof",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://developer-moraouf.vercel.app',
        title: 'Mohamed AbdEl-Rauof - Full Stack Developer',
        description: 'Portfolio of Mohamed AbdEl-Rauof, a passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.',
        siteName: 'Mohamed AbdEl-Rauof Portfolio',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Mohamed AbdEl-Rauof - Full Stack Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mohamed AbdEl-Rauof - Full Stack Developer',
        description: 'Portfolio of Mohamed AbdEl-Rauof, a passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.',
        images: ['/images/og-image.jpg'],
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#171717' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#171717" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Mohamed Portfolio" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ErrorBoundary>
                <PerformanceMonitor />
                <NavBar/>
                {children}
            </ErrorBoundary>
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
