import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Psalm Salcedo for digital art commissions, web design projects, UI/UX design, and creative collaborations. Available for freelance work.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
