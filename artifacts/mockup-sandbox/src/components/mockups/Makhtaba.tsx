import { useCallback, useState } from "react";
import makhtabaLogo from "../../assets/makhtaba-logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/* ─── icons ─────────────────────────────────────────────────────────── */
const AccountIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[0.875rem] h-[0.875rem]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const MinusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[0.875rem] h-[0.875rem]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[0.875rem] h-[0.875rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
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
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─── types ─────────────────────────────────────────────────────────── */
type CartItem = { id: number; title: string; author: string; price: number; qty: number };

/* ─── style constants ────────────────────────────────────────────────── */
const pf: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em" };
const pfItalic: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em", fontStyle: "italic" };
const ss: React.CSSProperties = { fontFamily: "'Source Serif 4', serif", letterSpacing: "-0.06em" };

/* ─── menu nav links ─────────────────────────────────────────────────── */
const NAV_SECTIONS = [
  { label: "Shop All", sub: ["Books", "Clothes", "Add-ons"] },
  { label: "Browse Subjects", sub: ["Aqeedah", "Hadith", "Fiqh", "Seerah"] },
  { label: "Our Picks", sub: [] },
  { label: "About", sub: [] },
  { label: "Contact", sub: [] },
];

/* ─── product catalogue (mockup) ─────────────────────────────────────── */
let nextId = 1;
const PRODUCTS = [
  { title: "Kitab at Tawheed", author: "Muhammad Ibn Abd al Wahhab", price: 300 },
  { title: "Bulugh al Maram", author: "Ibn Hajar al Asqalani", price: 450 },
  { title: "Riyadh al Saliheen", author: "Imam an-Nawawi", price: 380 },
  { title: "Khadijah Niqab", author: "", price: 300 },
];

/* ═══════════════════════════════════════════════════════════════════════
   MENU DRAWER
═══════════════════════════════════════════════════════════════════════ */
function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[18.5rem] sm:w-[22rem] bg-[#fffdf5] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Navigation menu"
      >
        {/* header */}
        <div className="flex items-center justify-between h-[3.5625rem] px-[1.5rem] border-b border-[#d7d2c6] shrink-0">
          <img src={makhtabaLogo} alt="Makhtaba" className="h-[2.25rem] w-auto object-contain" />
          <button onClick={onClose} className="flex items-center justify-center text-[#5a4a3a] hover:opacity-60 transition-opacity">
            <XIcon />
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto py-[1.25rem]">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="border-b border-[#e8e2d8] last:border-0">
              <button
                style={pf}
                className="w-full flex items-center justify-between px-[1.5rem] py-[1rem] text-[1.0625rem] font-normal text-[#1a1a1a] text-left hover:bg-[#f5f0e8] transition-colors"
                onClick={() => section.sub.length ? setExpanded(expanded === section.label ? null : section.label) : onClose()}
              >
                {section.label}
                {section.sub.length > 0 && (
                  <svg viewBox="0 0 24 24" className={`w-4 h-4 text-[#885926] transition-transform duration-200 ${expanded === section.label ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
              {section.sub.length > 0 && expanded === section.label && (
                <div className="bg-[#f5f0e8]">
                  {section.sub.map((sub) => (
                    <button
                      key={sub}
                      style={pf}
                      onClick={onClose}
                      className="w-full flex items-center gap-2 px-[2.25rem] py-[0.75rem] text-[0.9375rem] font-normal text-[#5a4a3a] text-left hover:text-[#885926] transition-colors"
                    >
                      <span className="block w-1 h-1 rounded-full bg-[#885926] shrink-0" />
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* footer */}
        <div className="shrink-0 border-t border-[#d7d2c6] px-[1.5rem] py-[1.25rem]">
          <button style={pf} className="flex items-center gap-2 text-[0.875rem] text-[#5a4a3a] hover:text-[#885926] transition-colors">
            <AccountIcon />
            Sign in / Register
          </button>
        </div>
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CART DRAWER
═══════════════════════════════════════════════════════════════════════ */
function CartDrawer({
  open, onClose, items, onQtyChange, onRemove,
}: {
  open: boolean; onClose: () => void;
  items: CartItem[]; onQtyChange: (id: number, delta: number) => void; onRemove: (id: number) => void;
}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[22rem] sm:w-[26rem] bg-[#fffdf5] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Shopping cart"
      >
        {/* header */}
        <div className="flex items-center justify-between h-[3.5625rem] px-[1.5rem] border-b border-[#d7d2c6] shrink-0">
          <div className="flex items-center gap-2">
            <span style={pf} className="text-[1.125rem] font-normal text-[#1a1a1a]">Your cart</span>
            {count > 0 && (
              <span style={ss} className="text-[0.8125rem] text-[#885926]">({count} item{count !== 1 ? "s" : ""})</span>
            )}
          </div>
          <button onClick={onClose} className="flex items-center justify-center text-[#5a4a3a] hover:opacity-60 transition-opacity">
            <XIcon />
          </button>
        </div>

        {/* items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-[1.5rem] text-center">
            <CartIcon />
            <p style={pf} className="text-[1.0625rem] text-[#5a4a3a]">Your cart is empty</p>
            <button
              style={pf}
              onClick={onClose}
              className="text-[0.9375rem] text-[#885926] underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-[#e8e2d8] px-[1.5rem]">
              {items.map((item) => (
                <li key={item.id} className="flex gap-[0.875rem] py-[1.125rem]">
                  {/* product thumbnail */}
                  <div className="w-[4.5rem] h-[4.5rem] shrink-0 bg-white border border-[#e0dbd3]" />
                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <p style={pf} className="text-[0.9375rem] font-normal leading-snug text-[#1a1a1a] truncate">{item.title}</p>
                    {item.author && (
                      <p style={pf} className="mt-[0.125rem] text-[0.75rem] text-[#5a4a3a] truncate">{item.author}</p>
                    )}
                    {/* qty controls + price row */}
                    <div className="mt-[0.625rem] flex items-center justify-between">
                      {/* qty stepper */}
                      <div className="flex items-center border border-[#c8c0b5] h-[1.75rem]">
                        <button
                          className="flex items-center justify-center w-[1.75rem] h-full text-[#1a1a1a] hover:bg-[#f0ece5] transition-colors disabled:opacity-30"
                          onClick={() => onQtyChange(item.id, -1)}
                          disabled={item.qty <= 1}
                        >
                          <MinusIcon />
                        </button>
                        <span style={ss} className="w-[2rem] text-center text-[0.875rem] text-[#1a1a1a] select-none">{item.qty}</span>
                        <button
                          className="flex items-center justify-center w-[1.75rem] h-full text-[#1a1a1a] hover:bg-[#f0ece5] transition-colors"
                          onClick={() => onQtyChange(item.id, 1)}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={ss} className="text-[0.9375rem] text-[#1a1a1a]">₹{(item.price * item.qty).toLocaleString()}</span>
                        <button
                          className="text-[#9a8070] hover:text-red-600 transition-colors"
                          onClick={() => onRemove(item.id)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="shrink-0 border-t border-[#d7d2c6] px-[1.5rem] py-[1.25rem] space-y-[1rem]">
              {/* subtotal */}
              <div className="flex items-center justify-between">
                <span style={pf} className="text-[0.9375rem] text-[#5a4a3a]">Subtotal</span>
                <span style={ss} className="text-[1.0625rem] font-normal text-[#1a1a1a]">₹{subtotal.toLocaleString()}</span>
              </div>
              <p style={pf} className="text-[0.75rem] text-[#9a8070]">Shipping and taxes calculated at checkout.</p>
              {/* checkout button */}
              <button
                style={pf}
                className="w-full h-[3rem] bg-[#885926] text-white text-[1.0625rem] font-normal flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Checkout <ArrowRightIcon />
              </button>
              {/* continue */}
              <button
                style={pf}
                onClick={onClose}
                className="w-full text-center text-[0.875rem] text-[#5a4a3a] underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export const Makhtaba = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [language, setLanguage] = useState("Arabic");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((productIndex: number) => {
    const p = PRODUCTS[productIndex % PRODUCTS.length];
    setCartItems((prev) => {
      const exists = prev.find((i) => i.title === p.title);
      if (exists) return prev.map((i) => i.title === p.title ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: nextId++, ...p, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }, []);

  const removeItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const subjectCards = [{ title: "Aqeedah" }, { title: "Hadith" }, { title: "Fiqh" }];
  const picks = Array(6).fill({ title: "Kitab at tawheed", author: "Muhammad Ibn Abd al Wahhab", price: "₹300" });
  const addOnCards = Array(4).fill({ title: "Kitab at tawheed", subtitle: "Muhammad Ibn Abd al Wahhab", price: "₹300" });
  const languageBooks = Array(6).fill({ title: "Kitab at tawheed", author: "Muhammad Ibn Abd al Wahhab", price: "₹300" });
  const clothes = [
    { title: "Khadijah niqab", price: "₹300" },
    { title: "Kufis", price: "₹300" },
    { title: "Abaya", price: "₹500" },
    { title: "Thobes", price: "₹450" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:wght@400&display=swap');
      `}</style>

      {/* drawers (portalled outside scroll container) */}
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onQtyChange={changeQty} onRemove={removeItem} />

      <main className="min-h-screen w-full bg-[#ebe7df]">
        <div className="mx-auto flex min-h-screen w-full max-w-[24.5625rem] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex-col bg-[#fffdf5]">

          {/* ── Header ── h=3.5625rem (57px), px=2.0625rem (33px) */}
          <header className="sticky top-0 z-30 bg-[#fffdf5] border-b border-[#d7d2c6] h-[3.5625rem] px-[2.0625rem] flex items-center justify-between">
            <div className="flex items-center gap-[1.375rem]">
              <button onClick={() => setMenuOpen(true)} className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <HamburgerIcon />
              </button>
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <SearchIcon />
              </button>
            </div>

            <img src={makhtabaLogo} alt="Makhtaba" className="h-[2.8125rem] w-auto select-none object-contain" />

            <div className="flex items-center gap-[1.375rem]">
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black">
                <AccountIcon />
              </button>
              <button
                className="relative flex items-center justify-center hover:opacity-70 transition-opacity text-black"
                onClick={() => setCartOpen(true)}
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

          {/* ── Hero ── */}
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
                  onClick={() => addToCart(0)}
                  className="h-[2.4375rem] sm:h-[2.75rem] min-w-[9.8125rem] sm:min-w-[11rem] bg-[#885926] px-[1.5rem] text-[1.125rem] sm:text-[1.25rem] font-normal text-white hover:opacity-90 transition-opacity"
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

          {/* ── Browse Subjects + Our Picks (solid brown) ── */}
          <section className="bg-[#885926] px-[1.6875rem] sm:px-[3rem] lg:px-[5rem] pt-[1.125rem] sm:pt-[1.5rem] pb-[2.5rem] sm:pb-[3rem] text-center">

            <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal leading-[0.95] text-[#f3f3f3]">
              Browse subjects
            </h2>
            <p style={pf} className="mt-[0.1875rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[rgba(255,253,245,0.69)]">
              Master the sciences level by level
            </p>

            <div className="mt-[1rem] grid grid-cols-3 gap-[0.5625rem]">
              {subjectCards.map((item, index) => (
                <article key={item.title} className="flex flex-col items-center">
                  <div className="mb-[1rem] flex items-center justify-center gap-[0.3125rem]">
                    {index === 0 && <ChevronLeftIcon white />}
                    <span style={pf} className="text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-white">{item.title}</span>
                    <ChevronRightIcon white />
                  </div>
                  <div className="aspect-[107/153] w-full bg-white" />
                </article>
              ))}
            </div>

            {/* Our picks */}
            <div className="mt-[2.5625rem] sm:mt-[3rem]">
              <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal leading-[0.95] text-white">Our picks</h2>
              <p style={pf} className="mt-[0.1875rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[rgba(255,253,245,0.69)]">
                Learn what we recommend for you
              </p>
            </div>

            <div className="mt-[1.25rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-[3rem] sm:gap-y-[3.5rem]">
              {picks.map((item, index) => (
                <Card key={`pick-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-left">
                    <div className="aspect-[159/252] w-full bg-white" />
                    <h3 style={pf} className="pt-[0.4375rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-[#f3f3f3]">{item.title}</h3>
                    <p style={pf} className="mt-[0.375rem] text-[0.8125rem] sm:text-[0.875rem] font-normal leading-[0.95] text-[#e8e8e8]">{item.author}</p>
                    <div className="mt-[0.5rem] flex items-center justify-between gap-2">
                      <span style={ss} className="text-[1.0625rem] font-normal leading-[0.95] text-[#f3f3f3]">{item.price}</span>
                      <button
                        style={pf}
                        onClick={() => addToCart(index)}
                        className="h-[1.5rem] border border-white/60 bg-white/10 px-[0.625rem] text-[0.75rem] text-white hover:bg-white/20 transition-colors whitespace-nowrap"
                      >
                        Add to cart
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-[2.1875rem] flex justify-center">
              <button style={pf} className="h-[1.75rem] min-w-[6.6875rem] border border-white bg-transparent px-[1.5rem] text-[1.125rem] font-normal text-[#f3f3f3] hover:bg-white/10 transition-colors">
                View all
              </button>
            </div>
          </section>

          {/* ── Additional Items ── */}
          <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4.0625rem] sm:pt-[4.5rem] pb-[4rem] sm:pb-[4.5rem]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal leading-[0.95] text-black">Additional Items</h2>
                <p style={pf} className="mt-[1rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[#857461]">Buy that which benefits you</p>
              </div>
              <button style={pf} className="shrink-0 text-[0.75rem] font-normal text-black hover:opacity-70 transition-opacity">View all</button>
            </div>

            <div className="mt-[1.3125rem] -mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto">
              <div className="flex gap-[0.9375rem] pb-2" style={{ width: "max-content" }}>
                {addOnCards.map((item, index) => (
                  <Card key={`addon-${index}`} className="w-[9.3125rem] sm:w-[10.5rem] shrink-0 rounded-none border-0 bg-transparent shadow-none">
                    <CardContent className="p-0 text-left">
                      <div className="aspect-[149/241] w-full bg-[#fffdf5]" />
                      <h3 style={pf} className="pt-[0.875rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.title}</h3>
                      <p style={pf} className="mt-[0.375rem] text-[0.8125rem] font-normal leading-[0.95] text-[rgba(0,0,0,0.64)]">{item.subtitle}</p>
                      <p style={ss} className="mt-[0.75rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.price}</p>
                      <button
                        style={pf}
                        onClick={() => addToCart(index)}
                        className="mt-[0.75rem] h-[1.75rem] w-full border border-[#885926] bg-[#fffdf5] text-[0.875rem] font-normal text-[#885926] hover:bg-[#fff8eb] transition-colors"
                      >
                        Add to cart
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* ── Language Books ── */}
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
                  className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-[1.125rem] font-normal leading-[0.95] text-[#867461] data-[state=on]:bg-transparent data-[state=on]:text-[#885926] data-[state=on]:shadow-none"
                  value={item}
                >
                  <span className="relative inline-block pb-[0.5rem]">
                    {item}
                    {item === language && <span className="absolute left-0 bottom-0 block h-[0.0625rem] w-full bg-[#885926]" />}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <div className="mt-[1.5rem] sm:mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-[2.125rem] sm:gap-y-[2.75rem]">
              {languageBooks.map((item, index) => (
                <Card key={`lang-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0 text-left">
                    <div className="aspect-[159/252] w-full bg-white" />
                    <h3 style={pf} className="pt-[0.4375rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.title}</h3>
                    <p style={pf} className="mt-[0.375rem] text-[0.8125rem] font-normal leading-[0.95] text-[rgba(0,0,0,0.64)]">{item.author}</p>
                    <div className="mt-[0.375rem] flex items-center justify-between gap-2">
                      <span style={ss} className="text-[1.0625rem] font-normal leading-[0.95] text-black">{item.price}</span>
                      <button
                        style={pf}
                        onClick={() => addToCart(index)}
                        className="h-[1.5rem] border border-[#885926]/50 bg-transparent px-[0.625rem] text-[0.75rem] text-[#885926] hover:bg-[#885926]/5 transition-colors whitespace-nowrap"
                      >
                        Add to cart
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Clothes ── */}
          <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4rem] sm:pt-[4.5rem] pb-[4rem] sm:pb-[4.5rem]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal leading-[0.95] text-black">Clothes</h2>
                <p style={pf} className="mt-[1rem] text-[1.125rem] font-normal leading-[0.95] text-[#857461]">Accompany knowledge with modesty</p>
              </div>
              <button style={pf} className="shrink-0 text-[0.75rem] font-normal text-black hover:opacity-70 transition-opacity">View all</button>
            </div>

            <div className="mt-[1.3125rem] -mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto">
              <div className="flex gap-[0.4375rem] pb-2" style={{ width: "max-content" }}>
                {clothes.map((item, index) => (
                  <Card key={`clothes-${index}`} className="w-[9.9375rem] sm:w-[11rem] shrink-0 rounded-none border-0 bg-transparent shadow-none">
                    <CardContent className="p-0 text-center">
                      <div className="aspect-[159/252] w-full bg-[#fffdf5]" />
                      <h3 style={pf} className="pt-[0.5rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.title}</h3>
                      <p style={ss} className="mt-[0.75rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.price}</p>
                      <button
                        style={pf}
                        onClick={() => addToCart(index + 2)}
                        className="mt-[0.75rem] h-[1.75rem] w-full border border-[#885926] bg-[#fffdf5] text-[0.875rem] font-normal text-[#885926] hover:bg-[#fff8eb] transition-colors"
                      >
                        View options
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
