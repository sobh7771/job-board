import { useLocale } from 'next-intl';

// Define formatters for different types
const formatters = {
  // Currency formatter: formats a number as currency
  currency: (locale: string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }),

  // Date formatter: formats a Date object or a timestamp with optional formatting options
  date: (locale: string, options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options),

  // Number formatter: formats a number according to locale
  number: (locale: string) => new Intl.NumberFormat(locale),
};

// Type definitions for format functions
type FormatFunctions = {
  currency: (value: number) => string; // Function type for currency formatting
  date: (value: Date | number, options?: Intl.DateTimeFormatOptions) => string; // Function type for date formatting
  number: (value: number) => string; // Function type for number formatting
};

// Key type for valid formatting types
type FormatterType = keyof FormatFunctions;

/**
 * Custom hook for formatting values based on locale.
 *
 * @param type - The type of formatting to apply ('currency', 'date', or 'number').
 * @param options - Optional formatting options for date type.
 *
 * The default date format is "long", which displays dates in a more detailed format.
 * For example, a date might be displayed as "January 1, 2024".
 *
 * @returns A function to format the specified type.
 */
export const useFormatter = <T extends FormatterType>(
  type: T,
  options?: T extends 'date' ? Intl.DateTimeFormatOptions : undefined
): T extends FormatterType ? FormatFunctions[T] : FormatFunctions => {
  const locale = useLocale(); // Get the user's locale

  // Define formatting functions based on the selected type
  const formatFunctions: FormatFunctions = {
    currency: (value: number) => formatters.currency(locale).format(value),
    date: (value: Date | number) =>
      formatters
        .date(locale, { dateStyle: 'long', ...options })
        .format(new Date(value)), // Convert timestamp to Date
    number: (value: number) => formatters.number(locale).format(value),
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return formatFunctions[type]; // Return the corresponding formatting function
};
