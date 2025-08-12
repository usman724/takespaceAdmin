import './globals.css';
import Footer from './components/layout/Footer';
import I18nProvider from './components/providers/I18nProvider';

export const metadata = {
  title: 'TakeSpace Admin',
  description: 'Educational platform administration dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <I18nProvider>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
