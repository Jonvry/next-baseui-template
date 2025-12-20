import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ToastProvider } from "@/components/design-system/toast";
import { ThemeProvider } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
    variable: "--font-manrope-sans",
    subsets: ["latin"],
});

const SITE_NAME = "sitename";
const SITE_DESCRIPTION = "site description";
const SITE_URL = "https://sitename.com";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        template: `%s | ${SITE_NAME}`,
        default: SITE_NAME,
    },
    description: SITE_DESCRIPTION,
    keywords: [SITE_NAME, "nextjs", "typescript", "react"],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
        locale: "en-US",
        type: "website",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(manrope.variable, "antialiased")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="isolate">
                        <ToastProvider>{children}</ToastProvider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
