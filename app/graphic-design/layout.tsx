import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Graphic Designer in Albay | Remote Graphic Design Services Worldwide",
  description:
    "Psalm Salcedo is a freelance graphic designer based in Albay, Philippines, creating social media graphics, public materials, and print designs for clients locally in Legazpi and Bicol, and remotely for businesses worldwide.",
  keywords: [
    "graphic designer in Albay",
    "graphic designer Legazpi",
    "freelance graphic designer Albay",
    "graphic design services Bicol",
    "social media graphics Albay",
    "print design Legazpi",
    "Albay graphic design",
    "Psalm Salcedo graphic designer",
    "remote graphic designer Philippines",
    "freelance graphic designer for international clients",
    "online graphic design services worldwide",
    "hire a graphic designer online",
  ],
  alternates: {
    canonical: "https://triffyarts.vercel.app/graphic-design",
  },
  openGraph: {
    type: "website",
    url: "https://triffyarts.vercel.app/graphic-design",
    title: "Graphic Designer in Albay | Remote Design Services Worldwide",
    description:
      "Freelance graphic designer based in Legazpi, Albay, Philippines — serving local businesses in Bicol and remote clients worldwide with social media graphics, public materials, and print design.",
    images: [
      {
        url: "/GD1.png",
        width: 1200,
        height: 630,
        alt: "Graphic design work by Psalm Salcedo, graphic designer in Albay serving clients worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphic Designer in Albay | Remote Design Services Worldwide",
    description: "Freelance graphic designer based in Legazpi, Albay, Philippines, available for remote clients worldwide.",
    images: ["/GD1.png"],
  },
}

export default function GraphicDesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
