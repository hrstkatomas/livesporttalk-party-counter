import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LivesportTalk counter",
  description: "Update them statistics!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-screen h-screen justify-start">
          <main className="mx-auto my-auto w-screen md:w-2/3 xl:w-1/2 md:h-auto p-4 md:p-8 pb-32 text-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
