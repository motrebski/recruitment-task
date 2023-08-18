import StyledComponentsRegistry from './registry'
import type { Metadata } from 'next';
import ReduxProvider from "@/app/ReduxProvider";

export const metadata: Metadata = {
  title: 'Recruitment task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry><ReduxProvider>{children}</ReduxProvider></StyledComponentsRegistry>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
