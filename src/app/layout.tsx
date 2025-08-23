import type { Metadata } from "next";
import "./globals.css";
import { peydaFont } from "@/constants/localfont";
import { defaultLocale } from "@/lib/i18n";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "فینیبو | همه چیز برای ایرانی‌ها در استانبول",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = defaultLocale;
  const messages = await getMessages();

  return (
    <html lang={locale} dir="rtl">
      <body className={peydaFont.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
