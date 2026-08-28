import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Graphic Design",
  description:
    "A collection of graphic design work for social media, public materials, and print.",
}

export default function GraphicDesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
