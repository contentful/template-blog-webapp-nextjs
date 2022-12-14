import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t-color mt-10 border-t border-gray200">
      <div className="mt-8 max-w-4xl px-4 sm:px-12">
        <h3 className="mb-4">about us</h3>
        <div>
          Our company specialises in the development of advanced technologies for a wide range of
          industries. We use cutting-edge techniques and algorithms to create intelligent systems
          that can help businesses automate tasks, improve efficiency, and drive innovation.
        </div>
        <div className="mt-8">
          Powered by{' '}
          <Link href="https://www.contentful.com" className="text-blue500">
            Contentful
          </Link>
        </div>
      </div>
    </footer>
  );
};
