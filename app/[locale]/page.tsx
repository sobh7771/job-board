import { ArrowRight, Briefcase, Building, Search, Users } from 'lucide-react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function HeroSection() {
  const t = await getTranslations('home');
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20 ">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('heroTitle')}</h1>
        <p className="text-xl mb-8">{t('heroSubtitle')}</p>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="flex-grow bg-white text-gray-900"
          />
          <Button size="lg" className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" /> {t('searchButton')}
          </Button>
        </div>
      </div>
    </section>
  );
}

async function WhyChooseSection() {
  const t = await getTranslations('home');
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('whyChooseTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />,
              title: t('opportunityTitle'),
              description: t('opportunityDescription'),
            },
            {
              icon: <Users className="mx-auto h-12 w-12 text-primary mb-4" />,
              title: t('employersTitle'),
              description: t('employersDescription'),
            },
            {
              icon: <Building className="mx-auto h-12 w-12 text-primary mb-4" />,
              title: t('growthTitle'),
              description: t('growthDescription'),
            },
          ].map(({ icon, title, description }, index) => (
            <div className="text-center" key={index}>
              {icon}
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function NextStepSection() {
  const t = await getTranslations('home');
  return (
    <section className="bg-muted py-20 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-foreground">{t('nextStepTitle')}</h2>
        <Button asChild size="lg">
          <Link href="/register">
            {t('getStartedButton')} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

async function FeaturedCategoriesSection() {
  const t = await getTranslations('home');
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('featuredCategoriesTitle')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Technology',
            'Healthcare',
            'Finance',
            'Education',
            'Marketing',
            'Design',
            'Sales',
            'Engineering',
          ].map((category) => (
            <Button key={category} variant="outline" className="w-full">
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

async function HowItWorksSection() {
  const t = await getTranslations('home');
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorksTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: t('step1Title'),
              description: t('step1Description'),
            },
            {
              step: 2,
              title: t('step2Title'),
              description: t('step2Description'),
            },
            {
              step: 3,
              title: t('step3Title'),
              description: t('step3Description'),
            },
          ].map(({ step, title, description }) => (
            <div className="text-center" key={step}>
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <WhyChooseSection />
      <NextStepSection />
      <FeaturedCategoriesSection />
      <HowItWorksSection />
    </div>
  );
}
