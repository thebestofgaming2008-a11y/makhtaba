import { useMemo, useState } from "react";
import makhtabaLogo from "../../assets/makhtaba-logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AccountIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronRightIcon = ({ white = false }: { white?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-[0.6875rem] h-[0.6875rem]" fill="none" stroke={white ? "white" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeftIcon = ({ white = false }: { white?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-[0.6875rem] h-[0.6875rem]" fill="none" stroke={white ? "white" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

type ProductCardItem = {
  title: string;
  author?: string;
  price: string;
};

type CarouselCardItem = {
  title: string;
  subtitle?: string;
  price: string;
  action: string;
};

const pf: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em" };
const pfItalic: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em", fontStyle: "italic" };
const ss: React.CSSProperties = { fontFamily: "'Source Serif 4', serif", letterSpacing: "-0.06em" };

export const Makhtaba = (): JSX.Element => {
  const [language, setLanguage] = useState("Arabic");
  const [cartCount, setCartCount] = useState(0);

  const subjectCards = useMemo(() => [{ title: "Aqeedah" }, { title: "Hadith" }, { title: "Fiqh" }], []);

  const picks = useMemo<ProductCardItem[]>(
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
        <div className="mx-auto flex min-h-screen w-full max-w-[24.5625rem] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex-col bg-[#fffdf5]">

          {/* ── Header ── h=3.5625rem (57px), px=2.0625rem (33px) */}
          <header className="sticky top-0 z-30 bg-[#fffdf5] border-b border-[#d7d2c6] h-[3.5625rem] px-[2.0625rem] flex items-center justify-between">
            <div className="flex items-center gap-[1.375rem]">
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

            <div className="flex items-center gap-[1.375rem]">
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <AccountIcon />
              </button>
              <button
                className="relative flex items-center justify-center hover:opacity-70 transition-opacity text-black"
                onClick={() => setCartCount((c) => c + 1)}
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#885926] text-white text-[0.5rem] font-bold rounded-full h-[1.125rem] w-[1.125rem] flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* ── Hero ──
            pt=5.6875rem (91px), pb=4.4375rem (71px), px=2.1875rem (35px)
            "Finally afford" 30px=1.875rem
            "Beneficial knowledge" 40px=2.5rem italic — directly adjacent (no mt)
            subtitle mt=0.5625rem (9px), 18px=1.125rem
            buttons mt=3.25rem (52px)
          */}
          <section className="bg-[#fffdf5] px-[2.1875rem] sm:px-[3rem] lg:px-[5rem] pt-[5.6875rem] sm:pt-[6.5rem] lg:pt-[8rem] pb-[4.4375rem] sm:pb-[5rem] lg:pb-[6rem]">
            <div className="text-center">
              <p style={pf} className="text-[1.875rem] sm:text-[2.25rem] lg:text-[2.625rem] font-normal leading-[0.95] text-[#885926]">
                Finally afford
              </p>
              <h1 style={pfItalic} className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-normal leading-[0.95] text-[#885926]">
                Beneficial knowledge
              </h1>
              <p style={pf} className="mt-[0.5625rem] text-[1.125rem] sm:text-[1.25rem] font-normal leading-[0.95] text-[#867461]">
                Build your first islamic library
              </p>
              <div className="mt-[3.25rem] sm:mt-[3.75rem] flex flex-wrap items-center justify-center gap-[1.125rem]">
                <button
                  style={pf}
                  className="h-[2.4375rem] sm:h-[2.75rem] min-w-[9.8125rem] sm:min-w-[11rem] bg-[#885926] px-[1.5rem] text-[1.125rem] sm:text-[1.25rem] font-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] hover:opacity-90 transition-opacity"
                >
                  Shop now
                </button>
                <button
                  style={pf}
                  className="text-[1.125rem] sm:text-[1.25rem] font-normal text-black hover:opacity-70 transition-opacity bg-transparent"
                >
                  Browse add-ons
                </button>
              </div>
            </div>
          </section>

          {/* ── Browse Subjects + Our Picks (brown section) ──
            gradient: cream → brown
            pt=1.125rem (18px), px=1.6875rem (27px)
            "Browse subjects": 20px=1.25rem, #f3f3f3
            subtitle: 18px=1.125rem, rgba(255,253,245,0.69), nearly no mt
            labels mt=1rem (16px)
            cards mt=1.6875rem (27px), 3-col, gap=0.5625rem (9px), aspect-[107/153]
          */}
          <section className="bg-[#885926] px-[1.6875rem] sm:px-[3rem] lg:px-[5rem] pt-[1.125rem] sm:pt-[1.5rem] pb-[2.5rem] sm:pb-[3rem] text-center">

            {/* Browse subjects */}
            <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal leading-[0.95] text-[#f3f3f3]">
              Browse subjects
            </h2>
            <p style={pf} className="mt-[0.1875rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[rgba(255,253,245,0.69)]">
              Master the sciences level by level
            </p>

            {/* Subject cards — 3 cols, gap=0.5625rem */}
            <div className="mt-[1rem] grid grid-cols-3 gap-[0.5625rem]">
              {subjectCards.map((item, index) => (
                <article key={item.title} className="flex flex-col items-center">
                  <div className="mb-[1rem] flex items-center justify-center gap-[0.3125rem]">
                    {index === 0 && <ChevronLeftIcon white />}
                    <span style={pf} className="text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-white">
                      {item.title}
                    </span>
                    <ChevronRightIcon white />
                  </div>
                  <div className="aspect-[107/153] w-full bg-white" />
                </article>
              ))}
            </div>

            {/* Our picks */}
            <div className="mt-[2.5625rem] sm:mt-[3rem]">
              <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal leading-[0.95] text-white">
                Our picks
              </h2>
              <p style={pf} className="mt-[0.1875rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[rgba(255,253,245,0.69)]">
                Learn what we recommend for you
              </p>
            </div>

            {/* 2-col grid, gap-x=0.5625rem (9px), aspect-[159/252]
                Row gap calculated so total row pitch ≈ 342px/393px scale
                title pt=0.4375rem (7px), 17px=1.0625rem
                author mt=0.375rem (6px), 13px=0.8125rem
                price text-right, 17px=1.0625rem, mt=0
            */}
            <div className="mt-[1.25rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-[3rem] sm:gap-y-[3.5rem]">
              {picks.map((item, index) => (
                <Card key={`pick-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-left">
                    <div className="aspect-[159/252] w-full bg-white" />
                    <h3 style={pf} className="pt-[0.4375rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-[#f3f3f3]">
                      {item.title}
                    </h3>
                    <p style={pf} className="mt-[0.375rem] text-[0.8125rem] sm:text-[0.875rem] font-normal leading-[0.95] text-[#e8e8e8]">
                      {item.author}
                    </p>
                    <p style={ss} className="mt-[0.1875rem] text-right text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-[#f3f3f3]">
                      {item.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View all — border-white outline button, mt=2.1875rem (35px) */}
            <div className="mt-[2.1875rem] flex justify-center">
              <button
                style={pf}
                className="h-[1.75rem] min-w-[6.6875rem] border border-white bg-transparent px-[1.5rem] text-[1.125rem] font-normal text-[#f3f3f3] hover:bg-white/10 transition-colors"
              >
                View all
              </button>
            </div>
          </section>

          {/* ── Additional Items ── white section
            pt=4.0625rem (65px), px=2.0625rem (33px)
            heading ~1.5rem, "View all" right-aligned
            subtitle 1.125rem, mt=1rem
            cards: w=9.3125rem (149px), aspect-[149/241], gap=0.9375rem (15px)
            horizontal scroll
          */}
          <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4.0625rem] sm:pt-[4.5rem] pb-[4rem] sm:pb-[4.5rem]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal leading-[0.95] text-black">
                  Additional Items
                </h2>
                <p style={pf} className="mt-[1rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[#857461]">
                  Buy that which benefits you
                </p>
              </div>
              <button style={pf} className="shrink-0 text-[0.75rem] font-normal text-black hover:opacity-70 transition-opacity">
                View all
              </button>
            </div>

            {/* Horizontal scroll — card w=9.3125rem, gap=0.9375rem */}
            <div className="mt-[1.3125rem] -mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto">
              <div className="flex gap-[0.9375rem] pb-2" style={{ width: "max-content" }}>
                {addOnCards.map((item, index) => (
                  <Card key={`addon-${index}`} className="w-[9.3125rem] sm:w-[10.5rem] shrink-0 rounded-none border-0 bg-transparent shadow-none">
                    <CardContent className="p-0 text-left">
                      <div className="aspect-[149/241] w-full bg-[#fffdf5]" />
                      <h3 style={pf} className="pt-[0.875rem] sm:pt-[1rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-black">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p style={pf} className="mt-[0.375rem] text-[0.8125rem] sm:text-[0.875rem] font-normal leading-[0.95] text-[rgba(0,0,0,0.64)]">
                          {item.subtitle}
                        </p>
                      )}
                      <p style={ss} className="mt-[0.75rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-black">
                        {item.price}
                      </p>
                      <button
                        style={pf}
                        className="mt-[0.75rem] h-[1.75rem] w-full border border-[#885926] bg-[#fffdf5] text-[0.875rem] sm:text-[1rem] font-normal text-[#885926] hover:bg-[#fff8eb] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]"
                        onClick={() => setCartCount((c) => c + 1)}
                      >
                        {item.action}
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* ── Language Books ── cream bg, tabs
            Tabs underline active, 3-col equal
            Grid 2-col, aspect-[159/252] (same as Our Picks)
          */}
          <section className="bg-[#fffdf5] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[2.5rem] sm:pt-[3rem] pb-[3rem] sm:pb-[3.5rem]">
            <ToggleGroup
              className="grid w-full grid-cols-3 border-b border-[#d7d2c6] pb-[0.5rem]"
              onValueChange={(value) => { if (value) setLanguage(value); }}
              type="single"
              value={language}
            >
              {["English", "Urdu", "Arabic"].map((item) => (
                <ToggleGroupItem
                  key={item}
                  style={pf}
                  className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[#867461] data-[state=on]:bg-transparent data-[state=on]:text-[#885926] data-[state=on]:shadow-none"
                  value={item}
                >
                  <span className="relative inline-block pb-[0.5rem]">
                    {item}
                    {item === language && (
                      <span className="absolute left-0 bottom-0 block h-[0.0625rem] w-full bg-[#885926]" />
                    )}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <div className="mt-[1.5rem] sm:mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-[2.125rem] sm:gap-y-[2.75rem]">
              {languageBooks.map((item, index) => (
                <Card key={`lang-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-left">
                    <div className="aspect-[159/252] w-full bg-white" />
                    <h3 style={pf} className="pt-[0.4375rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-black">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p style={pf} className="mt-[0.375rem] text-[0.8125rem] sm:text-[0.875rem] font-normal leading-[0.95] text-[rgba(0,0,0,0.64)]">
                        {item.author}
                      </p>
                    )}
                    <p style={ss} className="mt-[0.1875rem] text-right text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-black">
                      {item.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Clothes ── white, horizontal scroll (same structure as Additional Items)
            pt=4rem (64px), px=2.0625rem
            heading 1.5rem, subtitle 1.125rem
            cards: w=9.9375rem (159px), aspect-[159/252], gap=0.4375rem (7px)
          */}
          <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4rem] sm:pt-[4.5rem] pb-[4rem] sm:pb-[4.5rem]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal leading-[0.95] text-black">
                  Clothes
                </h2>
                <p style={pf} className="mt-[1rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[#857461]">
                  Accompany knowledge with modesty
                </p>
              </div>
              <button style={pf} className="shrink-0 text-[0.75rem] font-normal text-black hover:opacity-70 transition-opacity">
                View all
              </button>
            </div>

            {/* Horizontal scroll — card w=9.9375rem (159px), gap=0.4375rem (7px) */}
            <div className="mt-[1.3125rem] -mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto">
              <div className="flex gap-[0.4375rem] pb-2" style={{ width: "max-content" }}>
                {clothes.map((item, index) => (
                  <Card key={`clothes-${index}`} className="w-[9.9375rem] sm:w-[11rem] shrink-0 rounded-none border-0 bg-transparent shadow-none">
                    <CardContent className="p-0 text-center">
                      <div className="aspect-[159/252] w-full bg-[#fffdf5]" />
                      <h3 style={pf} className="pt-[0.5rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-black">
                        {item.title}
                      </h3>
                      <p style={ss} className="mt-[0.75rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-black">
                        {item.price}
                      </p>
                      <button
                        style={pf}
                        className="mt-[0.75rem] sm:mt-[0.875rem] h-[1.75rem] w-full border border-[#885926] bg-[#fffdf5] text-[0.875rem] sm:text-[1rem] font-normal text-[#885926] hover:bg-[#fff8eb] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]"
                      >
                        {item.action}
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <div className="h-[5rem] sm:h-[7.5rem] bg-[#ebe7df]" />
        </div>
      </main>
    </>
  );
};

export default Makhtaba;
