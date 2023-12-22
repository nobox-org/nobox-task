import type { Metadata } from 'next'
import './styles.css';
import Header from '@/components/Header';
import { ReactProps } from '@/types';
import { PostContextProvider } from '@/context/PostContext';
import { AuthContextProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Nobox Blog',
  description: 'Simple blog using Nobox',
}

export default function RootLayout({children}: ReactProps) {
    return (
        <html lang="en">
            <body>

                <AuthContextProvider>

                    <Header/>
                    
                    <PostContextProvider>
                        <main>
                            {children}
                        </main>
                    </PostContextProvider>
                </AuthContextProvider>

            </body>
        </html>
    )
}
