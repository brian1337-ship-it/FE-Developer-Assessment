import Logo from "./Logo";

import Section from "./Section";
import MobileMenu from "./ui/MobileMenu";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Section className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
        </div>
      </Section>
    </header>
  );
};

export default Header;
