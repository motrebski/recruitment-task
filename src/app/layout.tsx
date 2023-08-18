import StyledComponentsRegistry from './registry'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recruitments task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
