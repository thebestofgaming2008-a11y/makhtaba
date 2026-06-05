import { useMemo, useState } from "react";
import makhtabaLogo from "../../assets/makhtaba-logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AccountIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronRightIcon = ({ inverted = false }: { inverted?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: inverted ? "invert(1)" : "none" }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeftIcon = ({ inverted = false }: { inverted?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: inverted ? "invert(1)" : "none" }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

type ProductCardItem = {
  title: string;
  author?: string;
  price: string;
};

type ProductGridItem = {
  title: string;
  author: string;
  price: string;
};

type CarouselCardItem = {
  title: string;
  subtitle?: string;
  price: string;
  action: string;
};

const playfair = { fontFamily: "'Playfair Display', serif" };
const sourceSerif = { fontFamily: "'Source Serif 4', serif" };

export const Makhtaba = (): JSX.Element => {
  const [language, setLanguage] = useState("Arabic");
  const [cartCount, setCartCount] = useState(0);

  const subjectCards = useMemo(
    () => [{ title: "Aqeedah" }, { title: "Hadith" }, { title: "Fiqh" }],
    [],
  );

  const picks = useMemo<ProductGridItem[]>(
    () => Array(6).fill({ title: "Kitab at tawheed", author: "Muhammad Ibn Abd al Wahhab", price: "₹300" }),
    [],
  );

  const addOnCards = useMemo<CarouselCardItem[]>(
    () => Array(4).fill({ title: "Kitab at tawheed", subtitle: "Muhammad Ibn Abd al Wahhab", price: "₹300", action: "Add to cart" }),
    [],
  );

  const languageBooks = useMemo<ProductCardItem[]>(
    () => Array(6).fill({ title: "Kitab at tawheed", author: "Muhammad Ibn Abd al Wahhab", price: "₹300" }),
    [],
  );

  const clothes = useMemo<CarouselCardItem[]>(
    () => [
      { title: "Khadijah niqab", price: "₹300", action: "View options" },
      { title: "Kufis", price: "₹300", action: "View options" },
      { title: "Abaya", price: "₹500", action: "View options" },
      { title: "Thobes", price: "₹450", action: "View options" },
    ],
    [],
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:wght@400&display=swap');
      `}</style>

      <main className="min-h-screen w-full bg-[#ebe7df]">
        <div className="mx-auto flex min-h-screen w-full max-w-[24.5rem] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex-col bg-[#fffdf5]">

          {/* ── Header ── */}
          <header className="sticky top-0 z-30 bg-[#fffdf5] border-b border-[#d7d2c6] px-4 sm:px-6 lg:px-10 py-2 sm:py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <HamburgerIcon />
              </button>
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <SearchIcon />
              </button>
            </div>

            <img
              src={makhtabaLogo}
              alt="Makhtaba"
              className="h-[2.8125rem] w-auto select-none object-contain"
            />

            <div className="flex items-center gap-3 sm:gap-5">
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <AccountIcon />
              </button>
              <button
                className="relative flex items-center justify-center hover:opacity-70 transition-opacity text-black"
                onClick={() => setCartCount((c) => c + 1)}
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#885926] text-white text-[0.625rem] font-bold rounded-full h-5 w-5 flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* ── Hero ── */}
          <section className="bg-[#fffdf5] px-4 sm:px-8 lg:px-16 pb-8 sm:pb-12 lg:pb-16 pt-12 sm:pt-16 lg:pt-24 text-center">
            <p style={playfair} className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#885926]">
              Finally afford
            </p>
            <h1 style={playfair} className="mt-2 sm:mt-3 text-[2.5rem] sm:text-5xl lg:text-6xl font-normal italic tracking-tight leading-tight text-[#885926]">
              Beneficial knowledge
            </h1>
            <p style={playfair} className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl font-normal tracking-tight text-[#857461]">
              Build your first islamic library
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              <Button
                style={playfair}
                className="h-auto min-w-[9.8125rem] sm:min-w-[11rem] rounded-none bg-[#885926] px-6 sm:px-8 py-2.5 text-base sm:text-lg font-normal tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] hover:bg-[#885926]/95"
                variant="default"
              >
                Shop now
              </Button>
              <Button
                style={playfair}
                className="h-auto rounded-none bg-transparent px-0 py-2.5 text-base sm:text-lg font-normal tracking-tight text-black shadow-none hover:bg-transparent"
                variant="ghost"
              >
                Browse add-ons
              </Button>
            </div>
          </section>

          {/* ── Browse Subjects ── */}
          <section className="bg-[linear-gradient(180deg,rgba(255,253,245,1)_0%,rgba(136,89,38,1)_12%,rgba(136,89,38,1)_60%)] px-4 sm:px-8 lg:px-16 pb-10 sm:pb-14 pt-14 sm:pt-20 text-center">
            <h2 style={playfair} className="text-lg sm:text-xl lg:text-2xl font-normal tracking-tight text-[#f2f2f2]">
              Browse subjects
            </h2>
            <p style={playfair} className="mt-3 sm:mt-4 text-base sm:text-lg font-normal tracking-tight text-[#fffdf5b0]">
              Master the sciences level by level
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {subjectCards.map((item, index) => (
                <article key={`${item.title}-${index}`} className="flex flex-col items-center">
                  <div className="mb-2 sm:mb-3 flex w-full items-center justify-center gap-1 sm:gap-2">
                    {index === 0 && <ChevronLeftIcon inverted />}
                    <h3 style={playfair} className="text-sm sm:text-base lg:text-lg font-normal tracking-tight text-white">
                      {item.title}
                    </h3>
                    <ChevronRightIcon inverted />
                  </div>
                  <div className="aspect-[2/3] w-full bg-white" />
                </article>
              ))}
            </div>

            {/* Our Picks */}
            <div className="mt-10 sm:mt-14">
              <h2 style={playfair} className="text-lg sm:text-xl lg:text-2xl font-normal tracking-tight text-white">
                Our picks
              </h2>
              <p style={playfair} className="mt-3 sm:mt-4 text-base sm:text-lg font-normal tracking-tight text-[#fffdf5b0]">
                Learn what we recommend for you
              </p>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 sm:gap-x-3 gap-y-4 sm:gap-y-6">
              {picks.map((item, index) => (
                <Card key={`pick-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-left">
                    <div className="aspect-[3/4] w-full bg-white" />
                    <div className="pt-1.5 sm:pt-2">
                      <h3 style={playfair} className="text-[0.9375rem] sm:text-base lg:text-lg font-normal tracking-tight text-[#f2f2f2]">
                        {item.title}
                      </h3>
                      <p style={playfair} className="mt-1.5 text-xs sm:text-sm font-normal tracking-tight text-[#e7e7e7]">
                        {item.author}
                      </p>
                      <p style={sourceSerif} className="mt-1 text-right text-[0.9375rem] sm:text-base font-normal tracking-tight text-[#f2f2f2]">
                        {item.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <Button
                style={playfair}
                className="h-auto min-w-[6.6875rem] rounded-none border border-white bg-[#00000001] px-6 py-1.5 text-base sm:text-lg font-normal tracking-tight text-[#f2f2f2] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] hover:bg-white/5"
                variant="ghost"
              >
                View all
              </Button>
            </div>
          </section>

          {/* ── Additional Items ── */}
          <section className="border-y border-[#b1b1b1] bg-white px-4 sm:px-8 lg:px-16 pb-8 sm:pb-12 pt-10 sm:pt-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={playfair} className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-black">
                  Additional Items
                </h2>
                <p style={playfair} className="mt-3 sm:mt-4 text-base sm:text-lg font-normal tracking-tight text-[#857461]">
                  Buy that which benefits you
                </p>
              </div>
              <Button
                style={playfair}
                className="h-auto shrink-0 px-0 py-0 text-xs font-normal tracking-tight text-black hover:bg-transparent"
                variant="ghost"
              >
                View all
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 -mx-4 sm:-mx-8 lg:-mx-16 px-4 sm:px-8 lg:px-16 overflow-x-auto">
              <div className="flex gap-3 sm:gap-4 pb-2" style={{ width: "max-content" }}>
                {addOnCards.map((item, index) => (
                  <Card key={`addon-${index}`} className="w-[9.3125rem] sm:w-44 lg:w-52 shrink-0 rounded-none border-0 bg-transparent shadow-none">
                    <CardContent className="p-0 text-left">
                      <div className="aspect-[3/4] w-full bg-[#fffdf5]" />
                      <h3 style={playfair} className="pt-3 sm:pt-4 text-[0.9375rem] sm:text-base font-normal tracking-tight text-black">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p style={playfair} className="mt-1.5 text-xs sm:text-sm font-normal tracking-tight text-[#000000a3]">
                          {item.subtitle}
                        </p>
                      )}
                      <p style={sourceSerif} className="mt-2 sm:mt-3 text-[0.9375rem] sm:text-base font-normal tracking-tight text-black">
                        {item.price}
                      </p>
                      <Button
                        style={playfair}
                        className="mt-3 h-auto w-full rounded-none border border-[#885926] bg-[#fffdf5] px-0 py-1.5 text-sm sm:text-base font-normal tracking-tight text-[#885926] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] hover:bg-[#fff8eb]"
                        variant="ghost"
                        onClick={() => setCartCount((c) => c + 1)}
                      >
                        {item.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* ── Language Books ── */}
          <section className="bg-[#fffdf5] px-4 sm:px-8 lg:px-16 pb-10 sm:pb-14 pt-10 sm:pt-12">
            <ToggleGroup
              className="grid w-full grid-cols-3 border-b border-[#d7d2c6] pb-2"
              onValueChange={(value) => { if (value) setLanguage(value); }}
              type="single"
              value={language}
            >
              {["English", "Urdu", "Arabic"].map((item) => (
                <ToggleGroupItem
                  key={item}
                  style={playfair}
                  className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-base sm:text-lg font-normal tracking-tight text-[#867461] data-[state=on]:bg-transparent data-[state=on]:text-[#885926] data-[state=on]:shadow-none"
                  value={item}
                >
                  <span className="relative inline-block">
                    {item}
                    {item === language && (
                      <span className="absolute left-0 top-[1.8125rem] block h-px w-full bg-[#885926]" />
                    )}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 sm:gap-x-3 gap-y-5 sm:gap-y-7">
              {languageBooks.map((item, index) => (
                <Card key={`lang-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-left">
                    <div className="aspect-[3/4] w-full bg-white" />
                    <h3 style={playfair} className="pt-2 text-[0.9375rem] sm:text-base font-normal tracking-tight text-black">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p style={playfair} className="mt-1.5 text-xs sm:text-sm font-normal tracking-tight text-[#000000a3]">
                        {item.author}
                      </p>
                    )}
                    <p style={sourceSerif} className="mt-1.5 text-right text-[0.9375rem] sm:text-base font-normal tracking-tight text-black">
                      {item.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Clothes ── */}
          <section className="border-y border-[#b1b1b1] bg-white px-4 sm:px-8 lg:px-16 pb-8 sm:pb-12 pt-10 sm:pt-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={playfair} className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-black">
                  Clothes
                </h2>
                <p style={playfair} className="mt-3 sm:mt-4 text-base sm:text-lg font-normal tracking-tight text-[#857461]">
                  Accompany knowledge with modesty
                </p>
              </div>
              <Button
                style={playfair}
                className="h-auto shrink-0 px-0 py-0 text-xs font-normal tracking-tight text-black hover:bg-transparent"
                variant="ghost"
              >
                View all
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {clothes.map((item, index) => (
                <Card key={`clothes-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-center">
                    <div className="aspect-[3/4] w-full bg-[#fffdf5]" />
                    <h3 style={playfair} className="pt-2 text-[0.9375rem] sm:text-base font-normal tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p style={sourceSerif} className="mt-3 text-[0.9375rem] sm:text-base font-normal tracking-tight text-black">
                      {item.price}
                    </p>
                    <Button
                      style={playfair}
                      className="mt-3 sm:mt-4 h-auto w-full rounded-none border border-[#885926] bg-[#fffdf5] px-0 py-1.5 text-sm sm:text-base font-normal tracking-tight text-[#885926] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] hover:bg-[#fff8eb]"
                      variant="ghost"
                    >
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="min-h-[5rem] sm:min-h-[7.5rem] bg-[#ebe7df]" />
        </div>
      </main>
    </>
  );
};

export default Makhtaba;
