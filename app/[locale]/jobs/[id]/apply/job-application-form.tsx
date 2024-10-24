'use client';

import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function JobApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Alert>
        <AlertTitle>Application Submitted!</AlertTitle>
        <AlertDescription>
          Thank you for your application. We will review it and get back to you
          soon.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Job Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div>
          <Label htmlFor="resume">Resume</Label>
          <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
        </div>
        <div>
          <Label htmlFor="coverLetter">Cover Letter</Label>
          <Textarea id="coverLetter" rows={5} />
        </div>
        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>
    </div>
  );
}
