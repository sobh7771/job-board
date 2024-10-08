import { ArrowRight, Briefcase, Building, Search, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Job Today</h1>
          <p className="text-xl mb-8">
            Connecting talented professionals with exciting opportunities
          </p>
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Job title, keywords, or company"
              className="flex-grow bg-white text-gray-900"
            />
            <Button size="lg" className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search Jobs
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobBoard?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Diverse Opportunities</h3>
              <p className="text-gray-600">
                Explore a wide range of job listings across various industries
              </p>
            </div>
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect with Top Employers</h3>
              <p className="text-gray-600">
                Get noticed by leading companies looking for talent like you
              </p>
            </div>
            <div className="text-center">
              <Building className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Find opportunities that align with your career goals and aspirations
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Take the Next Step in Your Career?</h2>
          <Button asChild size="lg">
            <Link href="/register">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Job Categories</h2>
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

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and showcase your skills and experience</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Opportunities</h3>
              <p className="text-gray-600">Browse and search for jobs that match your interests</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply with Ease</h3>
              <p className="text-gray-600">Submit applications and track your progress</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
