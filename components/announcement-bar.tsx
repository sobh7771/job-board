'use client';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const announcements = [
  'Visitors can now register on the platform!',
  'Log in or log out easily from your account.',
  'Employers can create job listings after logging in!',
  'The app features English and Arabic, but Arabic support is currently limited.',
  'These are the only working features for now. More features are in progress!',
];

const AUTO_SWIPE_INTERVAL = 5000; // 5 seconds

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground py-2 transition-all relative">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{ loop: true, align: 'center' }}
          plugins={[
            Autoplay({
              delay: AUTO_SWIPE_INTERVAL,
            }),
          ]}>
          <CarouselContent>
            {announcements.map((announcement, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <p className="text-sm font-medium text-center">{announcement}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}
