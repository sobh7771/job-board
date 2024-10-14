import './globals.css';
import './markdown-editor.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cairo, Inter } from 'next/font/google';

import { getCachedAuthenticatedUser } from '@/application/auth/cachedAuthenticatedUser';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { UserContextProvider } from '@/contexts/user-context';
import { getTextDirection } from '@/lib/utils';

import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({
  subsets: ['arabic'],
  weight: '400',
});

export const metadata = {
  title: 'JobBoard - Find Your Dream Job',
  description: 'Connect with top employers and find your next career opportunity.',
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
        <div className="flex flex-col min-h-screen">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages}>
              <UserContextProvider value={await getCachedAuthenticatedUser()}>
                <AnnouncementBar />
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
              </UserContextProvider>
            </NextIntlClientProvider>
            <Footer />
          </ThemeProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
