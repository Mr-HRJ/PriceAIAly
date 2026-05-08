import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 比价雷达",
  description: "AI 订阅卡网报价聚合与半自动采集工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
