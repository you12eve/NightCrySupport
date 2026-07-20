import type {
  Metadata,
  Viewport,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME =
  "夜泣き・ワンオペ愚痴の駆け込み寺";

const DESCRIPTION =
  "夜泣きやワンオペ育児の気持ちを匿名で吐き出せる場所。コメントなし・リアクションのみ。投稿は毎朝6時に自動削除されます。";

const SITE_URL =
  "https://YOUR_DOMAIN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: DESCRIPTION,

  keywords: [
    "夜泣き",
    "ワンオペ",
    "育児",
    "子育て",
    "匿名投稿",
    "パパ",
    "ママ",
    "愚痴",
    "育児ストレス",
  ],

  applicationName: SITE_NAME,

  authors: [
    {
      name: "Yohei",
    },
  ],

  creator: "Yohei",

  openGraph: {
    type: "website",
    locale: "ja_JP",

    url: SITE_URL,

    siteName: SITE_NAME,

    title: SITE_NAME,

    description: DESCRIPTION,

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: SITE_NAME,

    description: DESCRIPTION,

    images: [
      "/opengraph-image.png",
    ],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.webmanifest",

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}