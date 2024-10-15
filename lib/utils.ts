/* eslint-disable no-unused-vars */
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getTextDirection(locale: string) {
  // Define a set of RTL locales
  const rtlLocales = ['ar', 'he', 'fa', 'ur', 'yi'];

  // Check if the provided locale is in the RTL set
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export enum CacheTags {
  AUTHENTICATED_USER = 'authenticated-user',
  JOB_LISTINGS = 'job-listings',
  USER_PROFILE = 'user-profile',
  SETTINGS = 'settings',
}
export class AppRoutes {
  static Home = '/';
  static Login = '/login';
  static Register = '/register';
  static Dashboard = '/dashboard';
  static Jobs = '/jobs';
  static JobDetails = (id: string | number) => `/jobs/${id}`;
  static Profile = '/profile';
  static EmployerDashboard = '/employer/dashboard';
  static PostJob = '/jobs/new';
  static Applications = '/employer/applications';
  static NotFound = '/404';

  static getRoute(
    route: keyof typeof AppRoutes,
    params?: Record<string, any>
  ): string {
    const routePath = AppRoutes[route];

    if (typeof routePath === 'function' && params) {
      return routePath(params.id);
    }

    return routePath as string;
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
