import Link from 'next/link';

import Logo from './CtfLogo.svg';

import typewriter from 'analytics';

const signUpLink =
  'https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&template_name=blog';

export const CtfSignUpBanner = () => {
  const handleSignUpLinkClick = () => typewriter.signUpBannerInteracted({ ctaClicked: true });

  return (
    <div className="sticky flex h-[54px] items-center justify-center gap-3 bg-[#0033A3]">
      <p className="block font-systemUIFontFamilies text-sm text-colorWhite md:hidden">
        Content managed via
      </p>
      <Logo />
      <p className="hidden font-systemUIFontFamilies text-sm text-colorWhite md:block">
        The content on this template is managed via Contentful
      </p>
      <Link
        className="rounded-[50px] bg-[#FFDA00] py-2 px-6 text-[#464E5B] transition-transform duration-300 ease-in hover:bg-[#EFC800]"
        href={signUpLink}
        target="_blank"
        onClick={handleSignUpLinkClick}>
        <p className="block font-systemUIFontFamilies text-sm font-semibold  md:hidden">
          Use template
        </p>
        <p className="hidden font-systemUIFontFamilies text-sm font-semibold  md:block ">
          Start with this template
        </p>
      </Link>
    </div>
  );
};
