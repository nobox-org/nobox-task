import type { Metadata } from 'next'
import './styles.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Nobox Blog',
  description: 'Simple blog using Nobox',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>

                <Header/>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
