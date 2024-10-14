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
import { Link, usePathname, useRouter } from '@/i18n/routing';

import { AuthButtons } from './AuthButtons';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('rootLayout');
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside of the mobile menu
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
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
      <header className="bg-white border-b md:hidden">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary" onClick={handleMenuClose}>
            {t('siteTitle')}
          </Link>

          {/* Hamburger Menu */}
          <Button variant="outline" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-white shadow-lg">
              <nav>
                <ul className="flex flex-col gap-4 px-4 py-2">
                  <li>
                    <Link
                      href="/jobs"
                      className="text-gray-600 hover:text-primary"
                      onClick={handleMenuClose}>
                      {t('jobs')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/employers"
                      className="text-gray-600 hover:text-primary"
                      onClick={handleMenuClose}>
                      {t('forEmployers')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/jobs/new"
                      className="text-gray-600 hover:text-primary"
                      onClick={handleMenuClose}>
                      {t('postJob')}
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
                          }}>
                          English
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(pathname, { locale: 'ar' });
                          }}>
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
      <header className="bg-white border-b hidden md:block">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary" onClick={handleMenuClose}>
            {t('siteTitle')}
          </Link>

          {/* Links */}
          <nav className="flex gap-4">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-primary"
              onClick={handleMenuClose}>
              {t('jobs')}
            </Link>
            <Link
              href="/employers"
              className="text-gray-600 hover:text-primary"
              onClick={handleMenuClose}>
              {t('forEmployers')}
            </Link>
            <Link
              href="/jobs/new"
              className="text-gray-600 hover:text-primary"
              onClick={handleMenuClose}>
              {t('postJob')}
            </Link>
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
                  }}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(pathname, { locale: 'ar' });
                  }}>
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
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};
