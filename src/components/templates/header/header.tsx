import Link from 'next/link';

import BlogLogo from '@icons/blog-logo.svg';

export const Header = () => {
  return (
    <nav className="mx-auto mt-4 mb-8 flex h-[52px] items-center px-4 align-middle sm:px-12 md:mt-5 xl:mt-10">
      <div className="container flex justify-between align-middle">
        <div>
          <Link href="/">
            <BlogLogo />
          </Link>
        </div>
        <div className="block bg-gray300">LangSelect</div>
      </div>
    </nav>
  );
};
