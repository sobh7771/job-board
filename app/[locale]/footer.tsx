import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('rootLayout');

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
        © 2024 JobBoard. {t('allRightsReserved')}
      </div>
    </footer>
  );
};

export default Footer;
