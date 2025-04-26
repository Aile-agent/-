import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "キャリアマッチ | 未経験からの転職成功率No.1",
  description: "20-30代専門エージェントが最短2週間の転職を実現。書類選考通過率95%以上。",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
