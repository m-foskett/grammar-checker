import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

// Font
const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(
      'bg-white text-slate-900 antialiased', inter.className
    )}>
      <body className='min-h-screen bg-slate-50 dark:bg-slate-900 antialiased'>
        {/* Custom Functional Component: Providers */}
        <Providers>
          {children}
          {/* @ts-expect-error Server Component */}
          <Navbar/>
        </Providers>
        {/* Adds some space at screen bottom for mobile */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  )
}
