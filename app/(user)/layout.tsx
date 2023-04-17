import "@/app/globals.css"
import { ClerkProvider } from "@clerk/nextjs/app-beta"
import { dark } from "@clerk/themes"

import { Inter, Montserrat } from "next/font/google"

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
})
const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
})
export const metadata = {
  title: "User",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full`}
    >
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body className="h-full bg-black">{children}</body>
      </ClerkProvider>
    </html>
  )
}
