import './globals.css';

export const metadata = {
  title: 'TakeSpace Admin',
  description: 'Educational platform administration dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
