'use client';

import { Globe, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { AuthButtons } from './AuthButtons';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('rootLayout');
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          {t('siteTitle')}
        </Link>
        <nav className="hidden md:flex gap-4">
          <Link
            href="/jobs"
            className={cn('text-gray-600 hover:text-primary transition-colors', {
              'text-primary font-semibold': pathname === '/jobs',
            })}>
            {t('jobs')}
          </Link>
          <Link
            href="/employers"
            className={cn('text-gray-600 hover:text-primary transition-colors', {
              'text-primary font-semibold': pathname === '/employers',
            })}>
            {t('forEmployers')}
          </Link>
          <Link
            href="/jobs/new"
            className={cn('text-gray-600 hover:text-primary transition-colors', {
              'text-primary font-semibold': pathname === '/jobs/new',
            })}>
            {t('postJob')}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
                <span className="sr-only">{t('switchLanguage')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => {
                    router.push(pathname, { locale: lang.code as 'en' | 'ar' });
                  }}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <ThemeToggle />
            <span className="sr-only">{t('toggleTheme')}</span>
          </Button>

          <AuthButtons />
        </div>
      </div>
    </header>
  );
}

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true); // Ensures client-side rendering after mount
  }, []);

  if (!mounted) {
    return null; // Avoid rendering until mounted on client-side
  }

  return theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
};

export default ThemeToggle;
