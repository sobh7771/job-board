import './globals.css';
import './markdown-editor.css';

import { getMessages } from 'next-intl/server';
import { Cairo, Inter } from 'next/font/google';

import { AnnouncementBar } from '@/components/announcement-bar';
import AppProviders from '@/components/AppProviders';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { getTextDirection } from '@/lib/utils';

import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({
  subsets: ['arabic'],
  weight: '400',
});

export const metadata = {
  title: 'JobBoard - Find Your Dream Job',
  description:
    'Connect with top employers and find your next career opportunity.',
};

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const dir = getTextDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.className} ${cairo.className}`}>
        <div className="flex min-h-screen flex-col">
          <AppProviders messages={messages}>
            <AnnouncementBar />
            <Navbar />
            <main className="container mx-auto flex-grow px-4 py-8">
              {children}
            </main>
            <Footer />
          </AppProviders>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
