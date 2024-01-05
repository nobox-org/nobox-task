import type { Metadata } from 'next'
import './styles.css';
import Header from '@/components/Header';
import { ReactProps } from '@/types';
import { AuthContextProvider } from '@/context/AuthContext';
import { TaskContextProvider } from '@/context/TaskContext';

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
                    
                    <TaskContextProvider>
                        <main>
                            {children}
                        </main>
                    </TaskContextProvider>
                </AuthContextProvider>

            </body>
        </html>
    )
}
