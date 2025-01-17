// tax-declaration-ui\src\app\layout.tsx
export const metadata = {
  title: 'Mediccont',
  description: 'Mediccont Assessoria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
