'use client';

import { Globe, Menu, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Role } from '@/lib/drizzle/schema';
import { cn } from '@/lib/utils';

import { AuthButtons } from './AuthButtons';
import { Badge } from './ui/badge';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('rootLayout');
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user } = useAuthenticatedUser();

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside of the mobile menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle link/button clicks and close the menu
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <header className="border-b bg-white md:hidden">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary"
            onClick={handleMenuClose}
          >
            {t('siteTitle')}
          </Link>

          {/* Hamburger Menu */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute left-0 top-16 w-full bg-white shadow-lg"
            >
              <nav>
                <ul className="flex flex-col gap-4 px-4 py-2">
                  <li>
                    <Link
                      href="/jobs"
                      className="text-gray-600 hover:text-primary"
                      onClick={handleMenuClose}
                    >
                      {t('jobs')}
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href={user?.role === Role.EMPLOYER ? '/employers' : '#'}
                      className={cn('text-gray-600 hover:text-primary', {
                        'pointer-events-none opacity-50':
                          !user || user.role !== Role.EMPLOYER,
                      })}
                      onClick={e => {
                        if (!user || user?.role !== Role.EMPLOYER) {
                          e.preventDefault(); // Disable the link for non-employers or non-logged-in users
                        }
                        handleMenuClose();
                      }}
                    >
                      {t('forEmployers')}
                      {(!user || user?.role !== Role.EMPLOYER) && (
                        <Badge variant="secondary">{t('forEmployers')}</Badge>
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={user?.role === Role.EMPLOYER ? '/jobs/new' : '#'}
                      className={cn('text-gray-600 hover:text-primary', {
                        'pointer-events-none opacity-50':
                          !user || user.role !== Role.EMPLOYER,
                      })}
                      onClick={e => {
                        if (!user || user?.role !== Role.EMPLOYER) {
                          e.preventDefault(); // Disable the link for non-employers or non-logged-in users
                        }
                        handleMenuClose();
                      }}
                    >
                      {t('postJob')}
                      {(!user || user?.role !== Role.EMPLOYER) && (
                        <Badge variant="secondary">{t('forEmployers')}</Badge>
                      )}
                    </Link>
                  </li>
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Globe className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(pathname, { locale: 'en' });
                          }}
                        >
                          English
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(pathname, { locale: 'ar' });
                          }}
                        >
                          العربية
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                  <li>
                    <ThemeToggleButton onClose={handleMenuClose} />
                  </li>
                  <li>
                    <AuthButtons />
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Desktop Navbar */}
      <header className="hidden border-b bg-white md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary"
            onClick={handleMenuClose}
          >
            {t('siteTitle')}
          </Link>

          {/* Links */}
          <nav className="flex gap-4">
            <li>
              <Link
                href="/jobs"
                className="text-gray-600 hover:text-primary"
                onClick={handleMenuClose}
              >
                {t('jobs')}
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href={user?.role === Role.EMPLOYER ? '/employers' : '#'}
                className={cn('text-gray-600 hover:text-primary', {
                  'pointer-events-none opacity-50':
                    !user || user.role !== Role.EMPLOYER,
                })}
                onClick={e => {
                  if (!user || user?.role !== Role.EMPLOYER) {
                    e.preventDefault();
                  }
                  handleMenuClose();
                }}
              >
                {t('forEmployers')}
              </Link>
              {(!user || user?.role !== Role.EMPLOYER) && (
                <Badge variant="secondary">{t('forEmployers')}</Badge>
              )}
            </li>

            <li className="flex flex-col items-center">
              <Link
                href={user?.role === Role.EMPLOYER ? '/jobs/new' : '#'}
                className={cn('text-gray-600 hover:text-primary', {
                  'pointer-events-none opacity-50':
                    !user || user.role !== Role.EMPLOYER,
                })}
                onClick={e => {
                  if (!user || user?.role !== Role.EMPLOYER) {
                    e.preventDefault();
                  }
                  handleMenuClose();
                }}
              >
                {t('postJob')}
              </Link>
              {(!user || user?.role !== Role.EMPLOYER) && (
                <Badge variant="secondary">{t('forEmployers')}</Badge>
              )}
            </li>
          </nav>

          {/* Language and Theme Switch */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    router.push(pathname, { locale: 'en' });
                  }}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(pathname, { locale: 'ar' });
                  }}
                >
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggleButton onClose={handleMenuClose} />

            <AuthButtons />
          </div>
        </div>
      </header>
    </>
  );
}

const ThemeToggleButton = ({ onClose }: { onClose: () => void }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component mounts
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    onClose(); // Close the menu after toggling theme
  };

  if (!mounted) {
    return null; // Avoid rendering until mounted on the client-side
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
