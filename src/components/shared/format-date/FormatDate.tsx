import { useRouter } from 'next/router';

interface FormatDateProps {
  date: number | Date | undefined;
  locale?: string;
}

export const formatDateFunc = ({ date, locale }: FormatDateProps) => {
  if (!locale || !date) return null;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(new Date(date));
};

export const FormatDate = (props: FormatDateProps) => {
  const { locale: localeFromRouter } = useRouter();

  if (!localeFromRouter) return null;

  return <>{formatDateFunc({ ...props, locale: localeFromRouter })}</>;
};
