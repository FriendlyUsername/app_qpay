import "@/app/globals.css"

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
  title: "Order with QPay",
  description: "Order with QPay",
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
      <body className="h-full bg-black">{children}</body>
    </html>
  )
}
