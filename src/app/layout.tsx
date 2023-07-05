import '@/shared/styles/globals.css'

import { PropsWithChildren } from 'react'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--nunito',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'BookWise',
  description: 'Site de classificação de livros',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className="bg-gray-800 text-gray-03 antialiased">{children}</body>
    </html>
  )
}
