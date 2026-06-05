import { useCallback, useRef, useState } from "react";
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
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── style constants ────────────────────────────────────────────────── */
const pf: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em" };
const pfItalic: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em", fontStyle: "italic" };
const ss: React.CSSProperties = { fontFamily: "'Source Serif 4', serif", letterSpacing: "-0.06em" };

/* ─── data ───────────────────────────────────────────────────────────── */
type Product = { id: number; title: string; author: string; price: number; category: string; subject?: string };
type CartItem = Product & { qty: number };
type ViewId = "home" | "shop";

const PRODUCTS: Product[] = [
  { id: 1,  title: "Kitab at Tawheed",       author: "Ibn Abd al Wahhab",        price: 300, category: "Books",   subject: "Aqeedah" },
  { id: 2,  title: "Al Usool al Thalatha",   author: "Ibn Abd al Wahhab",        price: 250, category: "Books",   subject: "Aqeedah" },
  { id: 3,  title: "Bulugh al Maram",        author: "Ibn Hajar al Asqalani",    price: 450, category: "Books",   subject: "Hadith"  },
  { id: 4,  title: "Riyadh al Saliheen",     author: "Imam an-Nawawi",           price: 380, category: "Books",   subject: "Hadith"  },
  { id: 5,  title: "Al Bayqooniyyah",        author: "Al Bayqooni",              price: 180, category: "Books",   subject: "Hadith"  },
  { id: 6,  title: "Al Fiqh al Muyassar",   author: "Various Scholars",         price: 350, category: "Books",   subject: "Fiqh"    },
  { id: 7,  title: "Bidayat al Mujtahid",   author: "Ibn Rushd",                price: 600, category: "Books",   subject: "Fiqh"    },
  { id: 8,  title: "Tafseer Ibn Katheer",    author: "Ibn Katheer",              price: 800, category: "Books",   subject: "Tafseer" },
  { id: 9,  title: "Tafseer as Sa'di",       author: "Abd al Rahman as Sa'di",   price: 650, category: "Books",   subject: "Tafseer" },
  { id: 10, title: "Al Raheeq al Makhtum",   author: "Safi ur Rahman Mubarakpuri", price: 420, category: "Books", subject: "Seerah" },
  { id: 11, title: "Al Ajurrumiyyah",        author: "Ibn Ajurrum",              price: 200, category: "Books",   subject: "Arabic"  },
  { id: 12, title: "Sharh Ibn Aqeel",        author: "Ibn Aqeel",                price: 480, category: "Books",   subject: "Arabic"  },
  { id: 13, title: "Al Waraqaat",            author: "Al Juwayni",               price: 220, category: "Books",   subject: "Usool"   },
  { id: 14, title: "Khadijah Niqab",         author: "",                         price: 300, category: "Clothes"  },
  { id: 15, title: "Premium Kufi",           author: "",                         price: 180, category: "Clothes"  },
  { id: 16, title: "Classic Abaya",          author: "",                         price: 500, category: "Clothes"  },
  { id: 17, title: "Scholar Thobe",          author: "",                         price: 450, category: "Clothes"  },
  { id: 18, title: "Tasbeeh Beads",          author: "",                         price: 120, category: "Add-ons"  },
  { id: 19, title: "Islamic Bookmark Set",   author: "",                         price: 80,  category: "Add-ons"  },
  { id: 20, title: "Wooden Reading Stand",   author: "",                         price: 220, category: "Add-ons"  },
  { id: 21, title: "Misbaha Counter",        author: "",                         price: 150, category: "Add-ons"  },
];

const SUBJECTS = ["Aqeedah", "Hadith", "Fiqh", "Tafseer", "Seerah", "Arabic", "Usool", "Fataawa"];

const NAV_SECTIONS = [
  { label: "Shop All", sub: ["Books", "Clothes", "Add-ons"] },
  { label: "Browse Subjects", sub: SUBJECTS },
  { label: "Our Picks", sub: [] },
  { label: "About", sub: [] },
  { label: "Contact", sub: [] },
];

let _nextId = 1;

/* ═══════════════════════════════════════════════════════════════════════
   MENU DRAWER
═══════════════════════════════════════════════════════════════════════ */
function MenuDrawer({ open, onClose, onNavigate }: {
  open: boolean; onClose: () => void;
  onNavigate: (filter?: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <aside className={`fixed top-0 left-0 z-50 h-full w-[18.5rem] sm:w-[22rem] bg-[#fffdf5] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-[3.5625rem] px-[1.5rem] border-b border-[#d7d2c6] shrink-0">
          <img src={makhtabaLogo} alt="Makhtaba" className="h-[2.25rem] w-auto object-contain" />
          <button onClick={onClose} className="text-[#5a4a3a] hover:opacity-60 transition-opacity"><XIcon /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-[1.25rem]">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="border-b border-[#e8e2d8] last:border-0">
              <button
                style={pf}
                className="w-full flex items-center justify-between px-[1.5rem] py-[1rem] text-[1.0625rem] font-normal text-[#1a1a1a] text-left hover:bg-[#f5f0e8] transition-colors"
                onClick={() => {
                  if (section.sub.length) {
                    setExpanded(expanded === section.label ? null : section.label);
                  } else {
                    onNavigate(); onClose();
                  }
                }}
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
                    <button key={sub} style={pf} onClick={() => { onNavigate(sub); onClose(); }}
                      className="w-full flex items-center gap-2 px-[2.25rem] py-[0.75rem] text-[0.9375rem] font-normal text-[#5a4a3a] text-left hover:text-[#885926] transition-colors">
                      <span className="block w-1 h-1 rounded-full bg-[#885926] shrink-0" />{sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="shrink-0 border-t border-[#d7d2c6] px-[1.5rem] py-[1.25rem]">
          <button style={pf} className="flex items-center gap-2 text-[0.875rem] text-[#5a4a3a] hover:text-[#885926] transition-colors">
            <AccountIcon />Sign in / Register
          </button>
        </div>
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CART DRAWER
═══════════════════════════════════════════════════════════════════════ */
function CartDrawer({ open, onClose, items, onQtyChange, onRemove, onCheckout }: {
  open: boolean; onClose: () => void;
  items: CartItem[]; onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void; onCheckout: () => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [done, setDone] = useState(false);

  const handleCheckout = () => {
    setDone(true);
    onCheckout();
    setTimeout(() => { setDone(false); onClose(); }, 2200);
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <aside className={`fixed top-0 right-0 z-50 h-full w-[22rem] sm:w-[26rem] bg-[#fffdf5] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        {done ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-[1.5rem] text-center">
            <div className="w-16 h-16 rounded-full bg-[#885926] flex items-center justify-center text-white"><CheckIcon /></div>
            <p style={pf} className="text-[1.25rem] text-[#1a1a1a]">Order confirmed!</p>
            <p style={pf} className="text-[0.9375rem] text-[#5a4a3a]">Thank you for shopping with Makhtaba. Your books are on their way.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between h-[3.5625rem] px-[1.5rem] border-b border-[#d7d2c6] shrink-0">
              <div className="flex items-center gap-2">
                <span style={pf} className="text-[1.125rem] font-normal text-[#1a1a1a]">Your cart</span>
                {count > 0 && <span style={ss} className="text-[0.8125rem] text-[#885926]">({count})</span>}
              </div>
              <button onClick={onClose} className="text-[#5a4a3a] hover:opacity-60 transition-opacity"><XIcon /></button>
            </div>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-[1.5rem] text-center">
                <CartIcon />
                <p style={pf} className="text-[1.0625rem] text-[#5a4a3a]">Your cart is empty</p>
                <button style={pf} onClick={onClose} className="text-[0.9375rem] text-[#885926] underline underline-offset-2 hover:opacity-70">Continue shopping</button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-[#e8e2d8] px-[1.5rem]">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-[0.875rem] py-[1.125rem]">
                      <div className="w-[4.5rem] h-[4.5rem] shrink-0 bg-white border border-[#e0dbd3]" />
                      <div className="flex-1 min-w-0">
                        <p style={pf} className="text-[0.9375rem] font-normal leading-snug text-[#1a1a1a] truncate">{item.title}</p>
                        {item.author && <p style={pf} className="mt-[0.125rem] text-[0.75rem] text-[#5a4a3a] truncate">{item.author}</p>}
                        <div className="mt-[0.625rem] flex items-center justify-between">
                          <div className="flex items-center border border-[#c8c0b5] h-[1.75rem]">
                            <button className="flex items-center justify-center w-[1.75rem] h-full text-[#1a1a1a] hover:bg-[#f0ece5] transition-colors disabled:opacity-30"
                              onClick={() => onQtyChange(item.id, -1)} disabled={item.qty <= 1}><MinusIcon /></button>
                            <span style={ss} className="w-[2rem] text-center text-[0.875rem] text-[#1a1a1a] select-none">{item.qty}</span>
                            <button className="flex items-center justify-center w-[1.75rem] h-full text-[#1a1a1a] hover:bg-[#f0ece5] transition-colors"
                              onClick={() => onQtyChange(item.id, 1)}><PlusIcon /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span style={ss} className="text-[0.9375rem] text-[#1a1a1a]">₹{(item.price * item.qty).toLocaleString()}</span>
                            <button className="text-[#9a8070] hover:text-red-600 transition-colors" onClick={() => onRemove(item.id)}><TrashIcon /></button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="shrink-0 border-t border-[#d7d2c6] px-[1.5rem] py-[1.25rem] space-y-[1rem]">
                  <div className="flex items-center justify-between">
                    <span style={pf} className="text-[0.9375rem] text-[#5a4a3a]">Subtotal</span>
                    <span style={ss} className="text-[1.0625rem] font-normal text-[#1a1a1a]">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <p style={pf} className="text-[0.75rem] text-[#9a8070]">Shipping and taxes calculated at checkout.</p>
                  <button style={pf} onClick={handleCheckout}
                    className="w-full h-[3rem] bg-[#885926] text-white text-[1.0625rem] font-normal flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Checkout <ArrowRightIcon />
                  </button>
                  <button style={pf} onClick={onClose}
                    className="w-full text-center text-[0.875rem] text-[#5a4a3a] underline underline-offset-2 hover:opacity-70 transition-opacity">
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SHOP PAGE
═══════════════════════════════════════════════════════════════════════ */
const FILTER_TABS = ["All", "Books", "Clothes", "Add-ons", ...SUBJECTS];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "A–Z"];

function ShopPage({ initialFilter, onAddToCart }: {
  initialFilter: string; onAddToCart: (p: Product) => void;
}) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [sort, setSort] = useState("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = PRODUCTS.filter((p) =>
    activeFilter === "All" || p.category === activeFilter || p.subject === activeFilter
  ).sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "A–Z") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="flex-1 bg-[#fffdf5]">
      {/* collection header */}
      <div className="bg-[#fffdf5] border-b border-[#d7d2c6] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[2rem] pb-[1.5rem]">
        <h1 style={pf} className="text-[2rem] sm:text-[2.5rem] font-normal leading-[0.95] text-[#1a1a1a]">
          {activeFilter === "All" ? "All Products" : activeFilter}
        </h1>
        <p style={pf} className="mt-[0.375rem] text-[0.9375rem] text-[#5a4a3a]">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* filter + sort bar */}
      <div className="border-b border-[#d7d2c6] bg-[#fffdf5]">
        {/* filter pills (horizontal scroll) */}
        <div ref={filterRef} className="flex gap-[0.5rem] overflow-x-auto px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] py-[0.875rem] scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              style={pf}
              onClick={() => setActiveFilter(tab)}
              className={`shrink-0 h-[2rem] px-[0.875rem] text-[0.875rem] font-normal border transition-colors whitespace-nowrap ${
                activeFilter === tab
                  ? "bg-[#885926] border-[#885926] text-white"
                  : "bg-transparent border-[#c8c0b5] text-[#5a4a3a] hover:border-[#885926] hover:text-[#885926]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* sort row */}
        <div className="flex items-center justify-end gap-3 px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pb-[0.75rem]">
          <span style={pf} className="text-[0.8125rem] text-[#9a8070]">Sort by</span>
          <div className="relative">
            <button
              style={pf}
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 h-[2rem] px-[0.875rem] border border-[#c8c0b5] text-[0.875rem] text-[#1a1a1a] hover:border-[#885926] transition-colors"
            >
              {sort} <ChevronDown />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-[#d7d2c6] shadow-lg min-w-[10rem]">
                {SORT_OPTIONS.map((opt) => (
                  <button key={opt} style={pf}
                    onClick={() => { setSort(opt); setSortOpen(false); }}
                    className={`block w-full text-left px-[0.875rem] py-[0.625rem] text-[0.875rem] hover:bg-[#f5f0e8] transition-colors ${sort === opt ? "text-[#885926]" : "text-[#1a1a1a]"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* product grid */}
      <div className="px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] py-[2rem] sm:py-[2.5rem]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[5rem] gap-3">
            <p style={pf} className="text-[1.125rem] text-[#5a4a3a]">No products found</p>
            <button style={pf} onClick={() => setActiveFilter("All")} className="text-[0.9375rem] text-[#885926] underline underline-offset-2">View all products</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.875rem] sm:gap-x-[1.25rem] gap-y-[2.5rem] sm:gap-y-[3rem]">
            {filtered.map((product) => (
              <Card key={product.id} className="rounded-none border-0 bg-transparent shadow-none group">
                <CardContent className="p-0 text-left">
                  {/* image */}
                  <div className="aspect-[3/4] w-full bg-[#f0ece5] border border-[#e0dbd3] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/40" />
                    {product.category === "Books" && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#885926]/30" />
                    )}
                  </div>
                  {/* info */}
                  <h3 style={pf} className="pt-[0.625rem] text-[0.9375rem] sm:text-[1.0625rem] font-normal leading-[1.1] text-[#1a1a1a]">{product.title}</h3>
                  {product.author && (
                    <p style={pf} className="mt-[0.25rem] text-[0.75rem] sm:text-[0.8125rem] font-normal leading-[0.95] text-[#5a4a3a]">{product.author}</p>
                  )}
                  <div className="mt-[0.5rem] flex items-center justify-between gap-2">
                    <span style={ss} className="text-[0.9375rem] sm:text-[1.0625rem] font-normal text-[#1a1a1a]">₹{product.price}</span>
                    <button
                      style={pf}
                      onClick={() => onAddToCart(product)}
                      className="h-[1.75rem] border border-[#885926] px-[0.625rem] text-[0.75rem] text-[#885926] bg-transparent hover:bg-[#885926] hover:text-white transition-colors whitespace-nowrap"
                    >
                      Add to cart
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export const Makhtaba = (): JSX.Element => {
  const [view, setView] = useState<ViewId>("home");
  const [shopFilter, setShopFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [language, setLanguage] = useState("Arabic");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const subjectScrollRef = useRef<HTMLDivElement>(null);

  /* cart helpers */
  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const addByIndex = useCallback((index: number) => addToCart(PRODUCTS[index % PRODUCTS.length]), [addToCart]);

  const changeQty = useCallback((id: number, delta: number) =>
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)), []);

  const removeItem = useCallback((id: number) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id)), []);

  const handleCheckout = useCallback(() =>
    setCartItems([]), []);

  /* navigation */
  const goToShop = useCallback((filter = "All") => {
    setShopFilter(filter);
    setView("shop");
  }, []);

  /* subjects carousel scroll */
  const scrollSubjects = (dir: "left" | "right") => {
    subjectScrollRef.current?.scrollBy({ left: dir === "right" ? 130 : -130, behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  /* dummy data */
  const picks = PRODUCTS.slice(0, 6);
  const addOnCards = PRODUCTS.filter((p) => p.category === "Add-ons").slice(0, 4);
  const langBooks = PRODUCTS.filter((p) => p.category === "Books").slice(0, 6);
  const clothesItems = PRODUCTS.filter((p) => p.category === "Clothes");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:wght@400&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={(f) => goToShop(f)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems}
        onQtyChange={changeQty} onRemove={removeItem} onCheckout={handleCheckout} />

      <main className="min-h-screen w-full bg-[#ebe7df]">
        <div className="mx-auto flex min-h-screen w-full max-w-[24.5625rem] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex-col bg-[#fffdf5]">

          {/* ── Sticky Header ── */}
          <header className="sticky top-0 z-30 bg-[#fffdf5] border-b border-[#d7d2c6] h-[3.5625rem] px-[2.0625rem] flex items-center justify-between">
            <div className="flex items-center gap-[1.375rem]">
              <button onClick={() => setMenuOpen(true)} className="flex items-center justify-center hover:opacity-70 transition-opacity text-black"><HamburgerIcon /></button>
              <button onClick={() => goToShop()} className="flex items-center justify-center hover:opacity-70 transition-opacity text-black"><SearchIcon /></button>
            </div>
            <button onClick={() => setView("home")}>
              <img src={makhtabaLogo} alt="Makhtaba" className="h-[2.8125rem] w-auto select-none object-contain" />
            </button>
            <div className="flex items-center gap-[1.375rem]">
              <button className="flex items-center justify-center hover:opacity-70 transition-opacity text-black"><AccountIcon /></button>
              <button className="relative flex items-center justify-center hover:opacity-70 transition-opacity text-black" onClick={() => setCartOpen(true)}>
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#885926] text-white text-[0.5rem] font-bold rounded-full h-[1.125rem] w-[1.125rem] flex items-center justify-center leading-none">{cartCount}</span>
                )}
              </button>
            </div>
          </header>

          {/* ── breadcrumb (shop view only) ── */}
          {view === "shop" && (
            <div className="bg-[#fffdf5] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[0.875rem] flex items-center gap-2">
              <button style={pf} onClick={() => setView("home")} className="text-[0.8125rem] text-[#5a4a3a] hover:text-[#885926] transition-colors flex items-center gap-1">
                <ArrowLeftIcon /> Home
              </button>
              <span style={pf} className="text-[0.8125rem] text-[#c8c0b5]">/</span>
              <span style={pf} className="text-[0.8125rem] text-[#1a1a1a]">
                {shopFilter === "All" ? "All Products" : shopFilter}
              </span>
            </div>
          )}

          {/* ── SHOP VIEW ── */}
          {view === "shop" && (
            <ShopPage initialFilter={shopFilter} onAddToCart={addToCart} />
          )}

          {/* ── HOME VIEW ── */}
          {view === "home" && (
            <>
              {/* Hero */}
              <section className="bg-[#fffdf5] px-[2.1875rem] sm:px-[3rem] lg:px-[5rem] pt-[5.6875rem] sm:pt-[6.5rem] lg:pt-[8rem] pb-[4.4375rem] sm:pb-[5rem] lg:pb-[6rem]">
                <div className="text-center">
                  <p style={pf} className="text-[1.875rem] sm:text-[2.25rem] lg:text-[2.625rem] font-normal leading-[0.95] text-[#885926]">Finally afford</p>
                  <h1 style={pfItalic} className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-normal leading-[0.95] text-[#885926]">Beneficial knowledge</h1>
                  <p style={pf} className="mt-[0.5625rem] text-[1.125rem] sm:text-[1.25rem] font-normal leading-[0.95] text-[#867461]">Build your first islamic library</p>
                  <div className="mt-[3.25rem] sm:mt-[3.75rem] flex flex-wrap items-center justify-center gap-[1.125rem]">
                    <button style={pf} onClick={() => goToShop()}
                      className="h-[2.4375rem] sm:h-[2.75rem] min-w-[9.8125rem] sm:min-w-[11rem] bg-[#885926] px-[1.5rem] text-[1.125rem] sm:text-[1.25rem] font-normal text-white hover:opacity-90 transition-opacity">
                      Shop now
                    </button>
                    <button style={pf} onClick={() => goToShop("Add-ons")}
                      className="text-[1.125rem] sm:text-[1.25rem] font-normal text-black hover:opacity-70 transition-opacity bg-transparent">
                      Browse add-ons
                    </button>
                  </div>
                </div>
              </section>

              {/* Browse Subjects + Our Picks */}
              <section className="bg-[#885926] pt-[1.125rem] sm:pt-[1.5rem] pb-[2.5rem] sm:pb-[3rem] text-center">

                <div className="px-[1.6875rem] sm:px-[3rem] lg:px-[5rem]">
                  <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal leading-[0.95] text-[#f3f3f3]">Browse subjects</h2>
                  <p style={pf} className="mt-[0.1875rem] text-[1.125rem] sm:text-[1.1875rem] font-normal leading-[0.95] text-[rgba(255,253,245,0.69)]">
                    Master the sciences level by level
                  </p>
                </div>

                {/* Subject carousel */}
                <div className="mt-[1rem] relative">
                  {/* left arrow */}
                  <button
                    onClick={() => scrollSubjects("left")}
                    className="absolute left-[0.5rem] top-1/2 -translate-y-1/2 z-10 w-[1.75rem] h-[1.75rem] rounded-full bg-white/20 hover:bg-white/35 transition-colors flex items-center justify-center text-white"
                  >
                    <ArrowLeftIcon />
                  </button>

                  {/* scrollable row */}
                  <div
                    ref={subjectScrollRef}
                    className="flex gap-[0.5625rem] overflow-x-auto scrollbar-hide px-[2.5rem]"
                    style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
                  >
                    {SUBJECTS.map((subject) => (
                      <button
                        key={subject}
                        onClick={() => goToShop(subject)}
                        className="shrink-0 flex flex-col items-center"
                        style={{ scrollSnapAlign: "start", width: "6.6875rem" }}
                      >
                        <span style={pf} className="mb-[0.75rem] text-[1.0625rem] sm:text-[1.125rem] font-normal leading-[0.95] text-white hover:text-[rgba(255,253,245,0.80)] transition-colors">
                          {subject}
                        </span>
                        <div className="aspect-[107/153] w-full bg-white" />
                      </button>
                    ))}
                  </div>

                  {/* right arrow */}
                  <button
                    onClick={() => scrollSubjects("right")}
                    className="absolute right-[0.5rem] top-1/2 -translate-y-1/2 z-10 w-[1.75rem] h-[1.75rem] rounded-full bg-white/20 hover:bg-white/35 transition-colors flex items-center justify-center text-white"
                  >
                    <ArrowRightIcon />
                  </button>
                </div>

                {/* Our picks */}
                <div className="px-[1.6875rem] sm:px-[3rem] lg:px-[5rem]">
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
                          {item.author && <p style={pf} className="mt-[0.375rem] text-[0.8125rem] font-normal leading-[0.95] text-[#e8e8e8]">{item.author}</p>}
                          <div className="mt-[0.5rem] flex items-center justify-between gap-2">
                            <span style={ss} className="text-[1.0625rem] font-normal leading-[0.95] text-[#f3f3f3]">₹{item.price}</span>
                            <button style={pf} onClick={() => addToCart(item)}
                              className="h-[1.5rem] border border-white/60 bg-white/10 px-[0.625rem] text-[0.75rem] text-white hover:bg-white/20 transition-colors whitespace-nowrap">
                              Add to cart
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-[2.1875rem] flex justify-center">
                    <button style={pf} onClick={() => goToShop()}
                      className="h-[1.75rem] min-w-[6.6875rem] border border-white bg-transparent px-[1.5rem] text-[1.125rem] font-normal text-[#f3f3f3] hover:bg-white/10 transition-colors">
                      View all
                    </button>
                  </div>
                </div>
              </section>

              {/* Additional Items */}
              <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4.0625rem] sm:pt-[4.5rem] pb-[4rem] sm:pb-[4.5rem]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal leading-[0.95] text-black">Additional Items</h2>
                    <p style={pf} className="mt-[1rem] text-[1.125rem] font-normal leading-[0.95] text-[#857461]">Buy that which benefits you</p>
                  </div>
                  <button style={pf} onClick={() => goToShop("Add-ons")} className="shrink-0 text-[0.75rem] font-normal text-[#885926] underline underline-offset-2 hover:opacity-70 transition-opacity">View all</button>
                </div>
                <div className="mt-[1.3125rem] -mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto scrollbar-hide">
                  <div className="flex gap-[0.9375rem] pb-2" style={{ width: "max-content" }}>
                    {addOnCards.map((item, index) => (
                      <Card key={`addon-${index}`} className="w-[9.3125rem] sm:w-[10.5rem] shrink-0 rounded-none border-0 bg-transparent shadow-none">
                        <CardContent className="p-0 text-left">
                          <div className="aspect-[149/241] w-full bg-[#fffdf5] border border-[#e8e2d8]" />
                          <h3 style={pf} className="pt-[0.875rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.title}</h3>
                          {item.author && <p style={pf} className="mt-[0.375rem] text-[0.8125rem] font-normal leading-[0.95] text-[rgba(0,0,0,0.64)]">{item.author}</p>}
                          <p style={ss} className="mt-[0.75rem] text-[1.0625rem] font-normal leading-[0.95] text-black">₹{item.price}</p>
                          <button style={pf} onClick={() => addToCart(item)}
                            className="mt-[0.75rem] h-[1.75rem] w-full border border-[#885926] bg-[#fffdf5] text-[0.875rem] font-normal text-[#885926] hover:bg-[#fff8eb] transition-colors">
                            Add to cart
                          </button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              {/* Language Books */}
              <section className="bg-[#fffdf5] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[2.5rem] sm:pt-[3rem] pb-[3rem] sm:pb-[3.5rem]">
                <ToggleGroup className="grid w-full grid-cols-3 border-b border-[#d7d2c6] pb-[0.5rem]"
                  onValueChange={(v) => { if (v) setLanguage(v); }} type="single" value={language}>
                  {["English", "Urdu", "Arabic"].map((item) => (
                    <ToggleGroupItem key={item} style={pf} value={item}
                      className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-[1.125rem] font-normal leading-[0.95] text-[#867461] data-[state=on]:bg-transparent data-[state=on]:text-[#885926] data-[state=on]:shadow-none">
                      <span className="relative inline-block pb-[0.5rem]">
                        {item}
                        {item === language && <span className="absolute left-0 bottom-0 block h-[0.0625rem] w-full bg-[#885926]" />}
                      </span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <div className="mt-[1.5rem] sm:mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-[2.125rem] sm:gap-y-[2.75rem]">
                  {langBooks.map((item, index) => (
                    <Card key={`lang-${index}`} className="rounded-none border-0 bg-transparent shadow-none">
                      <CardContent className="p-0 text-left">
                        <div className="aspect-[159/252] w-full bg-white border border-[#e8e2d8]" />
                        <h3 style={pf} className="pt-[0.4375rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.title}</h3>
                        {item.author && <p style={pf} className="mt-[0.375rem] text-[0.8125rem] font-normal leading-[0.95] text-[rgba(0,0,0,0.64)]">{item.author}</p>}
                        <div className="mt-[0.375rem] flex items-center justify-between gap-2">
                          <span style={ss} className="text-[1.0625rem] font-normal leading-[0.95] text-black">₹{item.price}</span>
                          <button style={pf} onClick={() => addToCart(item)}
                            className="h-[1.5rem] border border-[#885926]/50 px-[0.625rem] text-[0.75rem] text-[#885926] bg-transparent hover:bg-[#885926]/5 transition-colors whitespace-nowrap">
                            Add to cart
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-[2rem] flex justify-center">
                  <button style={pf} onClick={() => goToShop("Books")}
                    className="h-[1.75rem] border border-[#885926] px-[1.5rem] text-[1rem] font-normal text-[#885926] hover:bg-[#885926]/5 transition-colors">
                    View all books
                  </button>
                </div>
              </section>

              {/* Clothes */}
              <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4rem] sm:pt-[4.5rem] pb-[4rem] sm:pb-[4.5rem]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal leading-[0.95] text-black">Clothes</h2>
                    <p style={pf} className="mt-[1rem] text-[1.125rem] font-normal leading-[0.95] text-[#857461]">Accompany knowledge with modesty</p>
                  </div>
                  <button style={pf} onClick={() => goToShop("Clothes")} className="shrink-0 text-[0.75rem] font-normal text-[#885926] underline underline-offset-2 hover:opacity-70 transition-opacity">View all</button>
                </div>
                <div className="mt-[1.3125rem] -mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto scrollbar-hide">
                  <div className="flex gap-[0.4375rem] pb-2" style={{ width: "max-content" }}>
                    {clothesItems.map((item, index) => (
                      <Card key={`clothes-${index}`} className="w-[9.9375rem] sm:w-[11rem] shrink-0 rounded-none border-0 bg-transparent shadow-none">
                        <CardContent className="p-0 text-center">
                          <div className="aspect-[159/252] w-full bg-[#fffdf5] border border-[#e8e2d8]" />
                          <h3 style={pf} className="pt-[0.5rem] text-[1.0625rem] font-normal leading-[0.95] text-black">{item.title}</h3>
                          <p style={ss} className="mt-[0.75rem] text-[1.0625rem] font-normal leading-[0.95] text-black">₹{item.price}</p>
                          <button style={pf} onClick={() => addToCart(item)}
                            className="mt-[0.75rem] h-[1.75rem] w-full border border-[#885926] bg-[#fffdf5] text-[0.875rem] font-normal text-[#885926] hover:bg-[#fff8eb] transition-colors">
                            View options
                          </button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              <div className="h-[5rem] sm:h-[7.5rem] bg-[#ebe7df]" />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Makhtaba;
