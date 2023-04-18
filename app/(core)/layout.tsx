import "@/app/globals.css"
import { ClerkProvider } from "@clerk/nextjs/app-beta"
import { dark } from "@clerk/themes"
import { LayoutHelper } from "../_components/layout-helper"
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
  title: "QRPAY",
  description:
    "Streamline your restaurant's ordering process with our easy-to-use QR code system. Customers can simply scan the code and place their orders, leaving you more time to focus on providing exceptional service",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body className="bg-black">
          {/* @ts-ignore  server component             */}
          <LayoutHelper>{children}</LayoutHelper>
        </body>
      </ClerkProvider>
    </html>
  )
}
