import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Ticker } from '@/components/Ticker'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Periodismo2 — Noticias de Chile y el mundo',
    template: '%s | Periodismo2',
  },
  description: 'Agregador de noticias chilenas e internacionales. Noticias en tiempo real de más de 100 fuentes.',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Periodismo2',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@700;900&display=swap"
          rel="stylesheet"
        />
        {/* Theme detection — static content, no user input */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-neutral-50 font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Ticker />
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
