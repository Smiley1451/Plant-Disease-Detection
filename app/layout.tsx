import type React from "react"
import "./globals.css"
import { Roboto, Lato, Poppins } from "next/font/google"
import Navbar from "./components/Navbar"

// Define the fonts
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Plant Disease Detection",
  description: "Detect plant diseases using AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${lato.variable} ${poppins.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}



import './globals.css'