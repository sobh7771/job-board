'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { zodResolver } from '@hookform/resolvers/zod';
import { createJobListingAction } from '@/app/[locale]/jobs/new/createJobListingAction';
import {
  JobListingInput,
  jobListingSchema,
} from '@/app/[locale]/jobs/new/jobListingSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from '@/i18n/routing';
import { AppRoutes } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px]" />,
  }
);

const defaultJobListing: JobListingInput = {
  title: '',
  company: '',
  location: '',
  type: 'full-time',
  salary: 0,
  description: '',
  requirements: '',
  keywords: [],
};

const loadKeywords = async (inputValue: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
  ].filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export function PostJobForm() {
  const { toast } = useToast();
  const form = useForm<JobListingInput>({
    resolver: zodResolver(jobListingSchema),
    defaultValues: defaultJobListing,
  });
  const t = useTranslations('postJobForm');
  const router = useRouter();

  const { execute } = useAction(createJobListingAction, {
    onError: error => {
      toast({
        title: t('error'),
        description: error.error.serverError || t('unknownError'),
        variant: 'destructive',
      });
    },
    onSuccess: ({ data }) => {
      if (!data) {
        toast({
          title: t('error'),
          description: t('noPermission'),
          variant: 'destructive',
        });
        return;
      }
      if (data.success) {
        toast({
          title: t('jobPostedSuccess'),
          description: t('jobPostedMessage'),
        });
        form.reset();
        router.push(AppRoutes.Jobs);
      } else if (data.error) {
        toast({
          title: t('error'),
          description: data.error,
          variant: 'destructive',
        });
      }
    },
  });

  const onSubmit = async (data: JobListingInput) => {
    // Eventually, it will be converted to a number in order to satisfy the schema.
    execute({ ...data, salary: data.salary.toString() });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('jobTitle')}</FormLabel>
              <FormControl>
                <Input placeholder={t('jobTitlePlaceholder')} {...field} />
              </FormControl>
              <FormDescription>{t('jobTitleDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('companyName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('companyNamePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('location')}</FormLabel>
              <FormControl>
                <Input placeholder={t('locationPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('jobType')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('jobTypePlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Uncomment the following lines when ready to use */}
                  <SelectItem value="full-time">
                    {t('jobTypeOptions.fullTime')}
                  </SelectItem>
                  <SelectItem value="part-time">
                    {t('jobTypeOptions.partTime')}
                  </SelectItem>
                  <SelectItem value="contract">
                    {t('jobTypeOptions.contract')}
                  </SelectItem>
                  <SelectItem value="internship">
                    {t('jobTypeOptions.internship')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('salary')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t('salaryPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t('salaryDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('jobDescription')}</FormLabel>
              <FormControl>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  preview="edit"
                  height={200}
                />
              </FormControl>
              <FormDescription>
                {t('jobDescriptionDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('jobRequirements')}</FormLabel>
              <FormControl>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  preview="edit"
                  height={200}
                />
              </FormControl>
              <FormDescription>
                {t('jobRequirementsDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('keywords')}</FormLabel>
              <FormControl>
                <AsyncCreatableSelect
                  {...field}
                  isMulti
                  cacheOptions
                  defaultOptions
                  loadOptions={loadKeywords}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder={t('keywordsPlaceholder')}
                />
              </FormControl>
              <FormDescription>{t('keywordsDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('postJob')}</Button>
      </form>
    </Form>
  );
}
