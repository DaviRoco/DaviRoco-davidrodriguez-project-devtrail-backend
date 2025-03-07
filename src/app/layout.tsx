import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevFolio - David Rodríguez',
  description: 'David Rodríguez personal portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        ></link>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
