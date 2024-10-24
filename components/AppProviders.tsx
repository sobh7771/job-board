import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'; // Ensure you have this imported
import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';

import QueryProvider from './QueryProvider';

interface AppProvidersProps {
  children: ReactNode;
  messages: AbstractIntlMessages;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children, messages }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider messages={messages}>
        <QueryProvider>{children}</QueryProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
