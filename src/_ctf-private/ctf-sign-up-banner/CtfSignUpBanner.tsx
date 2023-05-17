import Link from 'next/link';

import Logo from './CtfLogo.svg';

import typewriter from 'analytics';

const signUpLink =
  'https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&template_name=blog';

const CtfSignUpBanner = () => {
  const handleSignUpLinkClick = () => typewriter.signUpBannerInteracted({ ctaClicked: true });

  return (
    <div className="sticky top-0 z-[200] flex h-[54px] items-center justify-center gap-3 bg-[#0033A3]">
      <p className="block font-systemUIFontFamilies text-sm text-colorWhite md:hidden">
        Content managed via
      </p>
      <Logo />
      <p className="hidden font-systemUIFontFamilies text-sm text-colorWhite md:block">
        The content on this template is managed via Contentful
      </p>
      <Link href={signUpLink} target="_blank" onClick={handleSignUpLinkClick}>
        <button className="signup-button-transition h-[38px] rounded-[50px] bg-[#FFDA00] py-2 px-6 hover:bg-[#EFC800]">
          <p className="block font-systemUIFontFamilies text-sm font-semibold text-[#464E5B] md:hidden">
            Use template
          </p>
          <p className="hidden font-systemUIFontFamilies text-sm font-semibold text-[#464E5B] md:block">
            Start with this template
          </p>
        </button>
      </Link>
    </div>
  );
};

export default CtfSignUpBanner;
