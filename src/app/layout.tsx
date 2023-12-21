import type { Metadata } from 'next'
import './styles.css';

export const metadata: Metadata = {
  title: 'Nobox Blog',
  description: 'Simple blog using Nobox',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
