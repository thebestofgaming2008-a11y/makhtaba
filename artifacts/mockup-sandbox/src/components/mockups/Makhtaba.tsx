/**
 * Makhtaba – Islamic bookstore mockup
 * Mobile-first, high-conversion UX inspired by Dawn / Prestige Shopify themes
 */
import { useCallback, useEffect, useRef, useState } from "react";
import makhtabaLogo from "../../assets/makhtaba-logo.png";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/* ─────────────────────────── ICONS ─────────────────────────── */
const I = {
  Hamburger: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Account: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Cart: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  X: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" className="w-[0.875rem] h-[0.875rem]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus: () => <svg viewBox="0 0 24 24" className="w-[0.875rem] h-[0.875rem]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>,
  Heart: ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" className="w-[1.125rem] h-[1.125rem]" fill={filled ? "#885926" : "none"} stroke="#885926" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" className="w-[0.8125rem] h-[0.8125rem]" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  ArrowR: () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowL: () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  ChevD: () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevR: () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Check: ({ big }: { big?: boolean }) => <svg viewBox="0 0 24 24" className={big ? "w-8 h-8" : "w-4 h-4"} fill="none" stroke="currentColor" strokeWidth={big ? 2 : 2.5} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Truck: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Return: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.75"/></svg>,
  Book: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Mail: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>,
  Package: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Share: () => <svg viewBox="0 0 24 24" className="w-[1.125rem] h-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
};

/* ─────────────────────────── TYPES & DATA ─────────────────────────── */
type ViewId = "home" | "shop" | "product" | "account" | "checkout" | "confirm";
type Product = { id: number; title: string; author: string; price: number; salePrice?: number; category: string; subject?: string; rating: number; reviews: number; stock: number; description: string; sizes?: string[] };
type CartItem = Product & { qty: number; size?: string };

const FREE_SHIP = 999;

const PRODUCTS: Product[] = [
  { id: 1, title: "Kitab at Tawheed", author: "Ibn Abd al Wahhab", price: 300, category: "Books", subject: "Aqeedah", rating: 4.9, reviews: 312, stock: 18, description: "The most important book on Islamic monotheism, essential for every Muslim household. A foundational text studied worldwide." },
  { id: 2, title: "Al Usool al Thalatha", author: "Ibn Abd al Wahhab", price: 250, salePrice: 199, category: "Books", subject: "Aqeedah", rating: 4.8, reviews: 201, stock: 3, description: "The Three Fundamental Principles — a concise yet comprehensive introduction to Islamic creed, studied in madrasas globally." },
  { id: 3, title: "Bulugh al Maram", author: "Ibn Hajar al Asqalani", price: 450, category: "Books", subject: "Hadith", rating: 4.9, reviews: 278, stock: 12, description: "A collection of hadiths pertaining to Islamic law, widely used as a primary text in Islamic jurisprudence." },
  { id: 4, title: "Riyadh al Saliheen", author: "Imam an-Nawawi", price: 380, category: "Books", subject: "Hadith", rating: 4.8, reviews: 445, stock: 22, description: "Gardens of the Righteous — a beloved collection of Quranic verses and Prophetic hadiths on ethics and conduct." },
  { id: 5, title: "Al Bayqooniyyah", author: "Al Bayqooni", price: 180, salePrice: 149, category: "Books", subject: "Hadith", rating: 4.7, reviews: 98, stock: 7, description: "A didactic poem on hadith sciences, memorised by students of knowledge worldwide as an introduction to the field." },
  { id: 6, title: "Al Fiqh al Muyassar", author: "Various Scholars", price: 350, category: "Books", subject: "Fiqh", rating: 4.7, reviews: 167, stock: 15, description: "Simplified Islamic jurisprudence covering all essential acts of worship and transactions for the modern Muslim." },
  { id: 7, title: "Bidayat al Mujtahid", author: "Ibn Rushd", price: 600, category: "Books", subject: "Fiqh", rating: 4.9, reviews: 89, stock: 5, description: "A distinguished manual of comparative Islamic jurisprudence covering the schools of Fiqh with evidence." },
  { id: 8, title: "Tafseer Ibn Katheer", author: "Ibn Katheer", price: 800, category: "Books", subject: "Tafseer", rating: 5.0, reviews: 532, stock: 9, description: "The most authoritative and comprehensive exegesis of the Quran, relying heavily on authentic hadiths and scholarly consensus." },
  { id: 9, title: "Tafseer as Sa'di", author: "Abd al Rahman as Sa'di", price: 650, category: "Books", subject: "Tafseer", rating: 4.9, reviews: 213, stock: 11, description: "Tayseer al Kareem ar Rahman — a clear, accessible Quranic commentary known for its ease of language and depth." },
  { id: 10, title: "Al Raheeq al Makhtum", author: "Safi ur Rahman Mubarakpuri", price: 420, category: "Books", subject: "Seerah", rating: 5.0, reviews: 601, stock: 30, description: "The Sealed Nectar — award-winning biography of the Prophet ﷺ, internationally acclaimed for its accuracy and style." },
  { id: 11, title: "Al Ajurrumiyyah", author: "Ibn Ajurrum", price: 200, category: "Books", subject: "Arabic", rating: 4.8, reviews: 155, stock: 20, description: "The essential primer on Arabic grammar, studied by beginners for centuries. A must-have for students of Islamic sciences." },
  { id: 12, title: "Sharh Ibn Aqeel", author: "Ibn Aqeel", price: 480, category: "Books", subject: "Arabic", rating: 4.6, reviews: 71, stock: 6, description: "The authoritative commentary on the Alfiyyah of Ibn Malik, covering Arabic morphology and syntax comprehensively." },
  { id: 13, title: "Al Waraqaat", author: "Al Juwayni", price: 220, category: "Books", subject: "Usool", rating: 4.7, reviews: 112, stock: 14, description: "A concise introduction to the principles of Islamic jurisprudence (Usool al Fiqh), ideal for beginners." },
  { id: 14, title: "Khadijah Niqab", author: "", price: 300, category: "Clothes", rating: 4.8, reviews: 89, stock: 25, description: "Lightweight, breathable full-coverage niqab suitable for daily wear. Available in multiple sizes.", sizes: ["S", "M", "L", "XL"] },
  { id: 15, title: "Premium Kufi", author: "", price: 180, category: "Clothes", rating: 4.7, reviews: 134, stock: 40, description: "Handcrafted from 100% pure cotton, this kufi pairs perfectly with the scholar's thobe. One size fits most.", sizes: ["One Size"] },
  { id: 16, title: "Classic Abaya", author: "", price: 500, category: "Clothes", rating: 4.9, reviews: 211, stock: 8, description: "Elegant open-front abaya in a breathable crepe fabric. Modest, stylish, and suitable for all occasions.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 17, title: "Scholar Thobe", author: "", price: 450, category: "Clothes", rating: 4.8, reviews: 178, stock: 12, description: "Traditional full-length thobe in premium Egyptian cotton. Classic cut with subtle embroidery at the collar.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 18, title: "Tasbeeh Beads", author: "", price: 120, category: "Add-ons", rating: 4.6, reviews: 203, stock: 50, description: "Hand-strung 99-bead tasbeeh in polished sandalwood. Smooth, durable, and spiritually grounding." },
  { id: 19, title: "Islamic Bookmark Set", author: "", price: 80, category: "Add-ons", rating: 4.5, reviews: 87, stock: 60, description: "Set of 6 beautifully illustrated Islamic bookmarks featuring Quranic calligraphy. A perfect gift." },
  { id: 20, title: "Wooden Reading Stand", author: "", price: 220, category: "Add-ons", rating: 4.9, reviews: 145, stock: 15, description: "Adjustable beechwood book stand, perfect for reading Quran or classical texts without straining your neck." },
  { id: 21, title: "Misbaha Counter", author: "", price: 150, category: "Add-ons", rating: 4.4, reviews: 63, stock: 30, description: "Digital tasbeeh counter with memory function. Tracks up to 999 counts with automatic reset." },
];

const SUBJECTS = ["Aqeedah", "Hadith", "Fiqh", "Tafseer", "Seerah", "Arabic", "Usool", "Fataawa"];
const FILTERS = ["All", "Books", "Clothes", "Add-ons", ...SUBJECTS];
const SORTS = ["Featured", "Best selling", "Price: Low → High", "Price: High → Low", "A–Z"];
const TESTIMONIALS = [
  { name: "Ahmad R.", loc: "Riyadh", text: "Arrived in 3 days, packaging was excellent. The books are printed beautifully — will definitely order again.", stars: 5 },
  { name: "Fatimah K.", loc: "Mumbai", text: "Finally a store that carries classical texts. The reading stand is fantastic quality for the price.", stars: 5 },
  { name: "Ibrahim M.", loc: "London", text: "Bought several books for my halaqah. Every member was impressed by the quality and fast delivery.", stars: 5 },
];

const NAV = [
  { label: "Shop All", sub: ["Books", "Clothes", "Add-ons"] },
  { label: "Browse Subjects", sub: SUBJECTS },
  { label: "Our Picks", sub: [] },
  { label: "About Makhtaba", sub: [] },
  { label: "Contact", sub: [] },
];

let _uid = 1;

/* ─── style helpers ─── */
const pf: React.CSSProperties = { fontFamily: "'Playfair Display', serif", letterSpacing: "-0.06em" };
const pfI: React.CSSProperties = { ...pf, fontStyle: "italic" };
const ss: React.CSSProperties = { fontFamily: "'Source Serif 4', serif", letterSpacing: "-0.06em" };

/* ─── small primitives ─── */
function Stars({ rating, count, sm }: { rating: number; count?: number; sm?: boolean }) {
  return (
    <div className="flex items-center gap-[0.25rem]">
      {[1,2,3,4,5].map(s => <I.Star key={s} filled={s <= Math.round(rating)} />)}
      {count !== undefined && <span style={ss} className={`${sm ? "text-[0.6875rem]" : "text-[0.75rem]"} text-[#9a8070] ml-1`}>({count})</span>}
    </div>
  );
}

function Badge({ children, green, red }: { children: React.ReactNode; green?: boolean; red?: boolean }) {
  return (
    <span style={pf} className={`inline-block text-[0.625rem] px-[0.375rem] py-[0.1875rem] font-normal leading-none ${green ? "bg-green-100 text-green-700" : red ? "bg-red-100 text-red-700" : "bg-[#f5f0e8] text-[#885926]"}`}>
      {children}
    </span>
  );
}

/* Product image placeholder */
function ProductImg({ product, className = "" }: { product: Product; className?: string }) {
  const isBook = product.category === "Books";
  const initial = product.title[0];
  return (
    <div className={`relative overflow-hidden flex flex-col items-center justify-center select-none ${className}`}
      style={{ background: isBook ? "linear-gradient(135deg,#f5f0e8 0%,#e8dfd4 100%)" : "linear-gradient(135deg,#f0ece5 0%,#e4ddd4 100%)" }}>
      <span style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.04em" }}
        className="text-[4rem] font-normal text-[#885926]/20 leading-none select-none">{initial}</span>
      {isBook && <div className="absolute left-0 top-0 bottom-0 w-[0.3125rem] bg-[#885926]/25" />}
      {product.salePrice && <span style={pf} className="absolute top-2 left-2 text-[0.625rem] bg-[#dc2626] text-white px-1.5 py-0.5">SALE</span>}
      {product.stock <= 5 && !product.salePrice && <span style={pf} className="absolute top-2 left-2 text-[0.625rem] bg-[#f59e0b] text-white px-1.5 py-0.5">Only {product.stock} left</span>}
    </div>
  );
}

/* Reusable product card */
function ProductCard({ product, onView, onAddToCart, wishlist, onWishlist }: {
  product: Product; onView: () => void; onAddToCart: (p: Product) => void;
  wishlist: Set<number>; onWishlist: (id: number) => void;
}) {
  const wished = wishlist.has(product.id);
  return (
    <div className="group relative">
      <button className="w-full text-left" onClick={onView}>
        <ProductImg product={product} className="aspect-[3/4] w-full" />
      </button>
      {/* wishlist */}
      <button onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
        className="absolute top-[0.5rem] right-[0.5rem] w-[1.75rem] h-[1.75rem] flex items-center justify-center bg-white/80 hover:bg-white transition-colors">
        <I.Heart filled={wished} />
      </button>
      {/* quick add — always visible on mobile, hover on desktop */}
      <button style={pf} onClick={() => onAddToCart(product)}
        className="w-full h-[2rem] bg-[#885926] text-white text-[0.75rem] font-normal opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-0.5">
        + Add to cart
      </button>
      <button className="w-full text-left mt-1.5" onClick={onView}>
        <Stars rating={product.rating} count={product.reviews} sm />
        <p style={pf} className="mt-[0.25rem] text-[0.9375rem] font-normal leading-tight text-[#1a1a1a] line-clamp-2">{product.title}</p>
        {product.author && <p style={pf} className="mt-[0.125rem] text-[0.75rem] text-[#5a4a3a] truncate">{product.author}</p>}
        <div className="mt-[0.375rem] flex items-center gap-2">
          {product.salePrice
            ? <><span style={ss} className="text-[0.9375rem] text-[#dc2626]">₹{product.salePrice}</span><span style={ss} className="text-[0.8125rem] text-[#9a8070] line-through">₹{product.price}</span></>
            : <span style={ss} className="text-[0.9375rem] text-[#1a1a1a]">₹{product.price}</span>
          }
        </div>
      </button>
    </div>
  );
}

/* ═══════════ SEARCH OVERLAY ═══════════ */
function SearchOverlay({ open, onClose, onView }: { open: boolean; onClose: () => void; onView: (p: Product) => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) { setQ(""); setTimeout(() => inputRef.current?.focus(), 100); } }, [open]);

  const results = q.length >= 1
    ? PRODUCTS.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.author.toLowerCase().includes(q.toLowerCase()) || (p.subject || "").toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose}>
      <div className="bg-[#fffdf5] w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* input */}
        <div className="flex items-center gap-3 px-4 h-[3.5rem] border-b border-[#d7d2c6]">
          <I.Search />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Search books, clothes, add-ons…"
            style={pf} className="flex-1 bg-transparent text-[1rem] text-[#1a1a1a] placeholder-[#9a8070] outline-none" />
          {q && <button onClick={() => setQ("")} className="text-[#9a8070] hover:text-[#1a1a1a]"><I.X /></button>}
          <button onClick={onClose} style={pf} className="text-[0.875rem] text-[#885926] hover:opacity-70 ml-1">Done</button>
        </div>
        {/* results */}
        {results.length > 0 ? (
          <ul>
            {results.map(p => (
              <li key={p.id}>
                <button className="flex items-center gap-3 w-full px-4 py-3 border-b border-[#f0ece5] hover:bg-[#f5f0e8] transition-colors text-left"
                  onClick={() => { onView(p); onClose(); }}>
                  <ProductImg product={p} className="w-10 h-14 shrink-0" />
                  <div className="min-w-0">
                    <p style={pf} className="text-[0.9375rem] text-[#1a1a1a] truncate">{p.title}</p>
                    {p.author && <p style={pf} className="text-[0.75rem] text-[#5a4a3a] truncate">{p.author}</p>}
                    <p style={ss} className="text-[0.875rem] text-[#885926] mt-0.5">₹{p.salePrice ?? p.price}</p>
                  </div>
                  <I.ChevR />
                </button>
              </li>
            ))}
          </ul>
        ) : q.length >= 1 ? (
          <div className="px-4 py-8 text-center">
            <p style={pf} className="text-[0.9375rem] text-[#5a4a3a]">No results for "{q}"</p>
          </div>
        ) : (
          <div className="px-4 py-5">
            <p style={pf} className="text-[0.75rem] text-[#9a8070] mb-3 uppercase tracking-wide">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {["Aqeedah", "Hadith", "Tafseer", "Abaya", "Tawheed"].map(s => (
                <button key={s} style={pf} onClick={() => setQ(s)}
                  className="h-[2rem] px-3 border border-[#d7d2c6] text-[0.8125rem] text-[#5a4a3a] hover:border-[#885926] hover:text-[#885926] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════ MENU DRAWER ═══════════ */
function MenuDrawer({ open, onClose, onNavigate, onAccount }: {
  open: boolean; onClose: () => void; onNavigate: (f?: string) => void; onAccount: () => void;
}) {
  const [exp, setExp] = useState<string | null>(null);
  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <aside className={`fixed top-0 left-0 z-50 h-full w-[18.5rem] sm:w-[22rem] bg-[#fffdf5] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-[3.5625rem] px-6 border-b border-[#d7d2c6] shrink-0">
          <img src={makhtabaLogo} alt="Makhtaba" className="h-9 w-auto object-contain" />
          <button onClick={onClose} className="text-[#5a4a3a] hover:opacity-60"><I.X /></button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {NAV.map(sec => (
            <div key={sec.label} className="border-b border-[#e8e2d8] last:border-0">
              <button style={pf} onClick={() => sec.sub.length ? setExp(exp === sec.label ? null : sec.label) : (onNavigate(), onClose())}
                className="w-full flex items-center justify-between px-6 py-4 text-[1.0625rem] text-[#1a1a1a] text-left hover:bg-[#f5f0e8] transition-colors">
                {sec.label}
                {sec.sub.length > 0 && <span className={`transition-transform duration-200 ${exp === sec.label ? "rotate-90" : ""}`}><I.ChevR /></span>}
              </button>
              {sec.sub.length > 0 && exp === sec.label && (
                <div className="bg-[#f5f0e8]">
                  {sec.sub.map(sub => (
                    <button key={sub} style={pf} onClick={() => { onNavigate(sub); onClose(); }}
                      className="w-full flex items-center gap-2 px-9 py-3 text-[0.9375rem] text-[#5a4a3a] text-left hover:text-[#885926] transition-colors">
                      <span className="w-1 h-1 rounded-full bg-[#885926] shrink-0" />{sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="shrink-0 border-t border-[#d7d2c6] px-6 py-4 space-y-3">
          <button style={pf} onClick={() => { onAccount(); onClose(); }} className="flex items-center gap-2 text-[0.9375rem] text-[#5a4a3a] hover:text-[#885926] transition-colors w-full">
            <I.Account />Sign in / Register
          </button>
          <button style={pf} className="flex items-center gap-2 text-[0.875rem] text-[#9a8070]"><I.Mail />newsletter@makhtaba.com</button>
        </div>
      </aside>
    </>
  );
}

/* ═══════════ CART DRAWER ═══════════ */
function CartDrawer({ open, onClose, items, onQtyChange, onRemove, onCheckout }: {
  open: boolean; onClose: () => void; items: CartItem[];
  onQtyChange: (id: number, d: number) => void; onRemove: (id: number) => void; onCheckout: () => void;
}) {
  const sub = items.reduce((s, i) => s + (i.salePrice ?? i.price) * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const remaining = Math.max(0, FREE_SHIP - sub);
  const pct = Math.min(100, (sub / FREE_SHIP) * 100);
  const upsell = PRODUCTS.filter(p => !items.find(i => i.id === p.id) && p.category === "Add-ons").slice(0, 2);

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <aside className={`fixed top-0 right-0 z-50 h-full w-[22rem] sm:w-[26rem] bg-[#fffdf5] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* header */}
        <div className="flex items-center justify-between h-[3.5625rem] px-5 border-b border-[#d7d2c6] shrink-0">
          <div className="flex items-center gap-2">
            <span style={pf} className="text-[1.0625rem] text-[#1a1a1a]">Cart</span>
            {count > 0 && <span style={ss} className="text-[0.8125rem] text-[#885926]">({count})</span>}
          </div>
          <button onClick={onClose} className="text-[#5a4a3a] hover:opacity-60"><I.X /></button>
        </div>
        {/* free shipping bar */}
        <div className="px-5 py-2.5 bg-[#f5f0e8] border-b border-[#d7d2c6] shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span style={pf} className="text-[0.75rem] text-[#5a4a3a]">
              {remaining === 0 ? "🎉 You've unlocked free shipping!" : `₹${remaining} away from free shipping`}
            </span>
            <I.Truck />
          </div>
          <div className="h-1.5 bg-[#d7d2c6] rounded-full overflow-hidden">
            <div className="h-full bg-[#885926] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {/* items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-5">
            <I.Cart />
            <p style={pf} className="text-[1.0625rem] text-[#5a4a3a]">Your cart is empty</p>
            <button style={pf} onClick={onClose} className="text-[0.9375rem] text-[#885926] underline underline-offset-2">Continue shopping</button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-[#e8e2d8] px-5">
              {items.map(item => (
                <li key={item.id} className="flex gap-3 py-4">
                  <ProductImg product={item} className="w-16 h-24 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p style={pf} className="text-[0.875rem] leading-snug text-[#1a1a1a] line-clamp-2">{item.title}</p>
                    {item.size && <p style={pf} className="text-[0.75rem] text-[#9a8070] mt-0.5">Size: {item.size}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#c8c0b5] h-[1.75rem]">
                        <button className="flex items-center justify-center w-7 h-full hover:bg-[#f0ece5] disabled:opacity-30" onClick={() => onQtyChange(item.id, -1)} disabled={item.qty <= 1}><I.Minus /></button>
                        <span style={ss} className="w-7 text-center text-[0.875rem] text-[#1a1a1a] select-none">{item.qty}</span>
                        <button className="flex items-center justify-center w-7 h-full hover:bg-[#f0ece5]" onClick={() => onQtyChange(item.id, 1)}><I.Plus /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={ss} className="text-[0.9375rem] text-[#1a1a1a]">₹{((item.salePrice ?? item.price) * item.qty).toLocaleString()}</span>
                        <button className="text-[#9a8070] hover:text-red-600 transition-colors" onClick={() => onRemove(item.id)}><I.Trash /></button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {/* upsell */}
              {upsell.length > 0 && (
                <li className="py-3">
                  <p style={pf} className="text-[0.75rem] text-[#9a8070] mb-2">You might also like</p>
                  {upsell.map(p => (
                    <div key={p.id} className="flex items-center gap-2 py-1.5">
                      <ProductImg product={p} className="w-8 h-10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p style={pf} className="text-[0.8125rem] text-[#1a1a1a] truncate">{p.title}</p>
                        <p style={ss} className="text-[0.75rem] text-[#885926]">₹{p.price}</p>
                      </div>
                      <button style={pf} onClick={() => {}} className="h-7 px-2 border border-[#885926] text-[0.6875rem] text-[#885926] hover:bg-[#885926] hover:text-white transition-colors whitespace-nowrap shrink-0">Add</button>
                    </div>
                  ))}
                </li>
              )}
            </ul>
            {/* footer */}
            <div className="shrink-0 border-t border-[#d7d2c6] px-5 pt-4 pb-5 space-y-3">
              <div className="flex justify-between items-center">
                <span style={pf} className="text-[0.9375rem] text-[#5a4a3a]">Subtotal</span>
                <span style={ss} className="text-[1.0625rem] text-[#1a1a1a]">₹{sub.toLocaleString()}</span>
              </div>
              {remaining === 0 && <p style={pf} className="text-[0.75rem] text-green-700">✓ Free shipping applied</p>}
              <p style={pf} className="text-[0.75rem] text-[#9a8070]">Taxes calculated at checkout</p>
              <button style={pf} onClick={() => { onClose(); onCheckout(); }}
                className="w-full h-12 bg-[#885926] text-white text-[1.0625rem] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Checkout · ₹{sub.toLocaleString()} <I.ArrowR />
              </button>
              <button style={pf} onClick={onClose} className="w-full text-center text-[0.875rem] text-[#5a4a3a] underline underline-offset-2 hover:opacity-70">Continue shopping</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ═══════════ PRODUCT DETAIL PAGE ═══════════ */
function ProductPage({ product, onAddToCart, onBack, wishlist, onWishlist, related, onView }: {
  product: Product; onAddToCart: (p: Product, size?: string) => void;
  onBack: () => void; wishlist: Set<number>; onWishlist: (id: number) => void;
  related: Product[]; onView: (p: Product) => void;
}) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [open, setOpen] = useState<string | null>("About this item");
  const wished = wishlist.has(product.id);
  const price = product.salePrice ?? product.price;

  useEffect(() => { setQty(1); setSize(product.sizes?.[0] ?? ""); setOpen("About this item"); }, [product.id]);

  const accordions = [
    { label: "About this item", body: product.description },
    { label: "Shipping & Delivery", body: "Standard delivery in 3–7 business days. Free shipping on orders over ₹999. Express delivery available at checkout." },
    { label: "Returns", body: "30-day hassle-free returns on all items. Books must be in original condition. Contact us to initiate a return." },
  ];

  return (
    <div className="flex-1 bg-[#fffdf5]">
      {/* breadcrumb */}
      <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-[#f0ece5]">
        <button style={pf} onClick={onBack} className="flex items-center gap-1 text-[0.75rem] text-[#5a4a3a] hover:text-[#885926] transition-colors">
          <I.ArrowL /> Back
        </button>
        <span style={pf} className="text-[0.75rem] text-[#c8c0b5]">/</span>
        <span style={pf} className="text-[0.75rem] text-[#5a4a3a]">{product.category}</span>
        {product.subject && <><span style={pf} className="text-[0.75rem] text-[#c8c0b5]">/</span><span style={pf} className="text-[0.75rem] text-[#1a1a1a]">{product.subject}</span></>}
      </div>

      <div className="px-4 sm:px-6 pb-[5rem]">
        {/* image */}
        <ProductImg product={product} className="w-full aspect-[4/5] mt-3 sm:aspect-[3/4]" />

        {/* info */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <h1 style={pf} className="text-[1.5rem] sm:text-[1.75rem] font-normal leading-tight text-[#1a1a1a] flex-1">{product.title}</h1>
            <button onClick={() => onWishlist(product.id)} className="shrink-0 w-9 h-9 flex items-center justify-center border border-[#d7d2c6] hover:border-[#885926] transition-colors mt-1">
              <I.Heart filled={wished} />
            </button>
          </div>
          {product.author && <p style={pf} className="mt-1 text-[0.9375rem] text-[#5a4a3a]">by {product.author}</p>}
          <div className="mt-2 flex items-center gap-3">
            <Stars rating={product.rating} count={product.reviews} />
          </div>

          {/* price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span style={ss} className="text-[1.5rem] text-[#1a1a1a]">₹{price}</span>
            {product.salePrice && <span style={ss} className="text-[1.0625rem] text-[#9a8070] line-through">₹{product.price}</span>}
            {product.salePrice && <Badge red>Save ₹{product.price - product.salePrice}</Badge>}
          </div>

          {/* stock */}
          <p style={pf} className={`mt-1.5 text-[0.8125rem] ${product.stock <= 5 ? "text-[#dc2626]" : "text-green-700"}`}>
            {product.stock <= 5 ? `⚠ Only ${product.stock} left in stock` : "✓ In stock"}
          </p>

          {/* size selector */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="mt-4">
              <p style={pf} className="text-[0.8125rem] text-[#1a1a1a] mb-2">Size: <strong>{size}</strong></p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} style={pf} onClick={() => setSize(s)}
                    className={`h-9 min-w-[2.5rem] px-3 border text-[0.875rem] transition-colors ${size === s ? "border-[#885926] bg-[#885926] text-white" : "border-[#c8c0b5] text-[#1a1a1a] hover:border-[#885926]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* qty */}
          <div className="mt-4 flex items-center gap-3">
            <p style={pf} className="text-[0.8125rem] text-[#1a1a1a]">Quantity</p>
            <div className="flex items-center border border-[#c8c0b5] h-10">
              <button className="flex items-center justify-center w-10 h-full hover:bg-[#f0ece5] disabled:opacity-30" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}><I.Minus /></button>
              <span style={ss} className="w-10 text-center text-[1rem] text-[#1a1a1a] select-none">{qty}</span>
              <button className="flex items-center justify-center w-10 h-full hover:bg-[#f0ece5]" onClick={() => setQty(q => q + 1)}><I.Plus /></button>
            </div>
          </div>

          {/* trust badges */}
          <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-[#e8e2d8]">
            {[["Authentic", <I.Shield />], ["Free Ship ₹999+", <I.Truck />], ["30-day Return", <I.Return />]].map(([label, icon]) => (
              <div key={label as string} className="flex flex-col items-center gap-1 text-center">
                <span className="text-[#885926]">{icon as React.ReactNode}</span>
                <span style={pf} className="text-[0.625rem] text-[#5a4a3a] leading-tight">{label as string}</span>
              </div>
            ))}
          </div>

          {/* accordions */}
          <div className="mt-2 divide-y divide-[#e8e2d8]">
            {accordions.map(acc => (
              <div key={acc.label}>
                <button style={pf} onClick={() => setOpen(open === acc.label ? null : acc.label)}
                  className="w-full flex items-center justify-between py-3.5 text-[0.9375rem] text-[#1a1a1a] text-left hover:text-[#885926] transition-colors">
                  {acc.label}
                  <span className={`transition-transform duration-200 ${open === acc.label ? "rotate-180" : ""}`}><I.ChevD /></span>
                </button>
                {open === acc.label && (
                  <p style={pf} className="pb-3.5 text-[0.875rem] leading-relaxed text-[#5a4a3a]">{acc.body}</p>
                )}
              </div>
            ))}
          </div>

          {/* share */}
          <button style={pf} className="mt-4 flex items-center gap-1.5 text-[0.8125rem] text-[#9a8070] hover:text-[#885926] transition-colors">
            <I.Share />Share this product
          </button>

          {/* related */}
          {related.length > 0 && (
            <div className="mt-6">
              <h2 style={pf} className="text-[1.125rem] text-[#1a1a1a] mb-3">You may also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4">
                {related.map(p => (
                  <div key={p.id} className="cursor-pointer" onClick={() => onView(p)}>
                    <ProductImg product={p} className="aspect-[3/4] w-full" />
                    <p style={pf} className="mt-1.5 text-[0.875rem] text-[#1a1a1a] line-clamp-2">{p.title}</p>
                    <p style={ss} className="text-[0.8125rem] text-[#885926]">₹{p.salePrice ?? p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* sticky bottom ATC bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#fffdf5]/95 border-t border-[#d7d2c6] px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
        <div className="flex-1">
          <p style={pf} className="text-[0.75rem] text-[#5a4a3a] leading-none">{product.title.length > 22 ? product.title.slice(0, 22) + "…" : product.title}</p>
          <p style={ss} className="text-[1.0625rem] text-[#1a1a1a] mt-0.5">₹{price * qty}</p>
        </div>
        <button style={pf} onClick={() => onAddToCart(product, size || undefined)}
          className="h-11 flex-1 bg-[#885926] text-white text-[1rem] hover:opacity-90 transition-opacity active:scale-[0.98]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ═══════════ SHOP PAGE ═══════════ */
function ShopPage({ initialFilter, onView, onAddToCart, wishlist, onWishlist }: {
  initialFilter: string; onView: (p: Product) => void; onAddToCart: (p: Product) => void;
  wishlist: Set<number>; onWishlist: (id: number) => void;
}) {
  const [f, setF] = useState(initialFilter);
  const [sort, setSort] = useState("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  useEffect(() => setF(initialFilter), [initialFilter]);

  const items = PRODUCTS
    .filter(p => f === "All" || p.category === f || p.subject === f)
    .sort((a, b) => {
      if (sort === "Price: Low → High") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sort === "Price: High → Low") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      if (sort === "A–Z") return a.title.localeCompare(b.title);
      if (sort === "Best selling") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="flex-1 bg-[#fffdf5]">
      {/* collection header */}
      <div className="bg-[#fffdf5] border-b border-[#d7d2c6] px-4 sm:px-6 lg:px-10 pt-5 pb-4">
        <h1 style={pf} className="text-[1.875rem] sm:text-[2.25rem] font-normal text-[#1a1a1a]">{f === "All" ? "All Products" : f}</h1>
        <p style={pf} className="mt-0.5 text-[0.875rem] text-[#9a8070]">{items.length} product{items.length !== 1 ? "s" : ""}</p>
      </div>
      {/* sticky filter + sort */}
      <div className="sticky top-[3.5625rem] z-10 bg-[#fffdf5] border-b border-[#d7d2c6]">
        <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-10 py-2.5 scrollbar-hide">
          {FILTERS.map(tab => (
            <button key={tab} style={pf} onClick={() => setF(tab)}
              className={`shrink-0 h-8 px-3 text-[0.8125rem] border transition-colors whitespace-nowrap ${f === tab ? "bg-[#885926] border-[#885926] text-white" : "border-[#c8c0b5] text-[#5a4a3a] hover:border-[#885926] hover:text-[#885926]"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 px-4 sm:px-6 lg:px-10 pb-2">
          <span style={pf} className="text-[0.75rem] text-[#9a8070]">Sort:</span>
          <div className="relative">
            <button style={pf} onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-1.5 h-7 px-2.5 border border-[#c8c0b5] text-[0.8125rem] text-[#1a1a1a] hover:border-[#885926] transition-colors">
              {sort}<I.ChevD />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-[#d7d2c6] shadow-lg min-w-[10rem]">
                {SORTS.map(o => (
                  <button key={o} style={pf} onClick={() => { setSort(o); setSortOpen(false); }}
                    className={`block w-full text-left px-3 py-2 text-[0.8125rem] hover:bg-[#f5f0e8] ${sort === o ? "text-[#885926]" : "text-[#1a1a1a]"}`}>
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* grid */}
      <div className="px-4 sm:px-6 lg:px-10 py-5 sm:py-6">
        {items.length === 0
          ? <div className="flex flex-col items-center py-16 gap-3">
              <p style={pf} className="text-[1rem] text-[#5a4a3a]">No products found</p>
              <button style={pf} onClick={() => setF("All")} className="text-[0.9375rem] text-[#885926] underline">View all</button>
            </div>
          : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-8">
              {items.map(p => <ProductCard key={p.id} product={p} onView={() => onView(p)} onAddToCart={onAddToCart} wishlist={wishlist} onWishlist={onWishlist} />)}
            </div>
        }
      </div>
    </div>
  );
}

/* ═══════════ ACCOUNT PAGE ═══════════ */
function AccountPage({ wishlist, onView, onAddToCart }: { wishlist: Set<number>; onView: (p: Product) => void; onAddToCart: (p: Product) => void }) {
  const [tab, setTab] = useState<"login" | "dash">("login");
  const [email, setEmail] = useState("");
  const [orders] = useState([
    { id: "MKH-1042", date: "28 May 2026", total: 730, status: "Delivered", items: ["Kitab at Tawheed", "Al Usool al Thalatha"] },
    { id: "MKH-0987", date: "12 Apr 2026", total: 450, status: "Delivered", items: ["Bulugh al Maram"] },
  ]);
  const wishlisted = PRODUCTS.filter(p => wishlist.has(p.id));

  if (tab === "login") return (
    <div className="flex-1 bg-[#fffdf5] px-4 sm:px-6 py-10">
      <div className="max-w-[22rem] mx-auto">
        <h1 style={pf} className="text-[1.75rem] text-[#1a1a1a] mb-1">Sign in</h1>
        <p style={pf} className="text-[0.9375rem] text-[#5a4a3a] mb-6">Access your orders, wishlist, and more.</p>
        <div className="space-y-3">
          {[["Email address", "email", email, setEmail], ["Password", "password", "", () => {}]].map(([label, type, val, setter]) => (
            <div key={label as string}>
              <label style={pf} className="block text-[0.8125rem] text-[#5a4a3a] mb-1">{label as string}</label>
              <input type={type as string} value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)}
                style={pf} className="w-full h-11 border border-[#c8c0b5] px-3 text-[0.9375rem] text-[#1a1a1a] bg-white focus:outline-none focus:border-[#885926] transition-colors" />
            </div>
          ))}
          <button style={pf} className="text-[0.8125rem] text-[#885926] hover:opacity-70">Forgot password?</button>
          <button style={pf} onClick={() => setTab("dash")}
            className="w-full h-11 bg-[#885926] text-white text-[1rem] hover:opacity-90 transition-opacity mt-1">
            Sign in
          </button>
        </div>
        <div className="mt-4 text-center">
          <span style={pf} className="text-[0.875rem] text-[#5a4a3a]">New to Makhtaba? </span>
          <button style={pf} className="text-[0.875rem] text-[#885926] underline underline-offset-2">Create account</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#fffdf5] px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={pf} className="text-[1.5rem] text-[#1a1a1a]">My Account</h1>
          <p style={pf} className="text-[0.875rem] text-[#5a4a3a]">Welcome back, Ahmad</p>
        </div>
        <button style={pf} onClick={() => setTab("login")} className="text-[0.8125rem] text-[#885926] border border-[#885926] px-3 py-1.5 hover:bg-[#885926] hover:text-white transition-colors">Sign out</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[["Orders", orders.length.toString(), <I.Package />], ["Wishlist", wishlisted.length.toString(), <I.Heart />], ["Points earned", "₹145", <I.Star />]].map(([l, v, icon]) => (
          <div key={l as string} className="flex items-center gap-3 border border-[#e8e2d8] p-3.5">
            <span className="text-[#885926]">{icon as React.ReactNode}</span>
            <div><p style={pf} className="text-[0.75rem] text-[#9a8070]">{l as string}</p><p style={ss} className="text-[1.125rem] text-[#1a1a1a]">{v as string}</p></div>
          </div>
        ))}
      </div>
      {/* orders */}
      <h2 style={pf} className="text-[1.125rem] text-[#1a1a1a] mb-2">Recent Orders</h2>
      <div className="space-y-2 mb-6">
        {orders.map(o => (
          <div key={o.id} className="border border-[#e8e2d8] p-3.5">
            <div className="flex items-center justify-between mb-1">
              <span style={pf} className="text-[0.8125rem] font-normal text-[#885926]">{o.id}</span>
              <Badge green>{o.status}</Badge>
            </div>
            <p style={pf} className="text-[0.75rem] text-[#9a8070]">{o.date}</p>
            <p style={pf} className="text-[0.8125rem] text-[#5a4a3a] mt-1">{o.items.join(", ")}</p>
            <div className="mt-2 flex items-center justify-between">
              <span style={ss} className="text-[0.9375rem] text-[#1a1a1a]">₹{o.total}</span>
              <button style={pf} className="text-[0.75rem] text-[#885926] underline underline-offset-2">Reorder</button>
            </div>
          </div>
        ))}
      </div>
      {/* wishlist */}
      {wishlisted.length > 0 && (
        <>
          <h2 style={pf} className="text-[1.125rem] text-[#1a1a1a] mb-2">Saved Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wishlisted.map(p => (
              <div key={p.id} className="cursor-pointer" onClick={() => onView(p)}>
                <ProductImg product={p} className="aspect-[3/4] w-full" />
                <p style={pf} className="mt-1 text-[0.8125rem] text-[#1a1a1a] line-clamp-2">{p.title}</p>
                <button style={pf} onClick={e => { e.stopPropagation(); onAddToCart(p); }}
                  className="mt-1 w-full h-7 border border-[#885926] text-[0.6875rem] text-[#885926] hover:bg-[#885926] hover:text-white transition-colors">
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════ CHECKOUT ═══════════ */
function CheckoutFlow({ items, onConfirm, onBack }: {
  items: CartItem[]; onConfirm: () => void; onBack: () => void;
}) {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({ email: "", first: "", last: "", phone: "" });
  const [ship, setShip] = useState({ address: "", city: "", state: "", pin: "" });
  const [pay, setPay] = useState({ card: "", expiry: "", cvv: "", name: "" });
  const sub = items.reduce((s, i) => s + (i.salePrice ?? i.price) * i.qty, 0);
  const ship_cost = sub >= FREE_SHIP ? 0 : 99;

  const Field = ({ label, value, onChange, placeholder = "", half = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; half?: boolean }) => (
    <div className={half ? "flex-1 min-w-0" : "w-full"}>
      <label style={pf} className="block text-[0.8125rem] text-[#5a4a3a] mb-1">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={pf} className="w-full h-11 border border-[#c8c0b5] px-3 text-[0.9375rem] text-[#1a1a1a] bg-white focus:outline-none focus:border-[#885926] transition-colors" />
    </div>
  );

  return (
    <div className="flex-1 bg-[#f5f0e8]">
      {/* progress */}
      <div className="bg-[#fffdf5] border-b border-[#d7d2c6] px-4 py-3">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          {["Contact", "Shipping", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.6875rem] border ${step > i + 1 ? "bg-[#885926] border-[#885926] text-white" : step === i + 1 ? "border-[#885926] text-[#885926]" : "border-[#c8c0b5] text-[#9a8070]"}`}>
                {step > i + 1 ? <I.Check /> : i + 1}
              </div>
              <span style={pf} className={`text-[0.75rem] ${step === i + 1 ? "text-[#885926]" : "text-[#9a8070]"}`}>{label}</span>
              {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? "bg-[#885926]" : "bg-[#d7d2c6]"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 flex flex-col lg:flex-row gap-5">
        {/* form */}
        <div className="flex-1 bg-[#fffdf5] border border-[#d7d2c6] p-5">
          {step === 1 && (
            <>
              <h2 style={pf} className="text-[1.125rem] text-[#1a1a1a] mb-4">Contact information</h2>
              <div className="space-y-3">
                <Field label="Email address" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} placeholder="you@email.com" />
                <div className="flex gap-3"><Field label="First name" value={contact.first} onChange={v => setContact(c => ({ ...c, first: v }))} half /><Field label="Last name" value={contact.last} onChange={v => setContact(c => ({ ...c, last: v }))} half /></div>
                <Field label="Phone number" value={contact.phone} onChange={v => setContact(c => ({ ...c, phone: v }))} placeholder="+91 98765 43210" />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 style={pf} className="text-[1.125rem] text-[#1a1a1a] mb-4">Shipping address</h2>
              <div className="space-y-3">
                <Field label="Address" value={ship.address} onChange={v => setShip(s => ({ ...s, address: v }))} placeholder="Street, building…" />
                <Field label="City" value={ship.city} onChange={v => setShip(s => ({ ...s, city: v }))} />
                <div className="flex gap-3"><Field label="State" value={ship.state} onChange={v => setShip(s => ({ ...s, state: v }))} half /><Field label="PIN code" value={ship.pin} onChange={v => setShip(s => ({ ...s, pin: v }))} half /></div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 style={pf} className="text-[1.125rem] text-[#1a1a1a] mb-4">Payment</h2>
              <div className="space-y-3">
                <Field label="Card number" value={pay.card} onChange={v => setPay(p => ({ ...p, card: v }))} placeholder="1234 5678 9012 3456" />
                <div className="flex gap-3"><Field label="Expiry" value={pay.expiry} onChange={v => setPay(p => ({ ...p, expiry: v }))} placeholder="MM/YY" half /><Field label="CVV" value={pay.cvv} onChange={v => setPay(p => ({ ...p, cvv: v }))} placeholder="123" half /></div>
                <Field label="Name on card" value={pay.name} onChange={v => setPay(p => ({ ...p, name: v }))} />
              </div>
              <div className="mt-3 flex items-center gap-1.5"><I.Shield /><span style={pf} className="text-[0.75rem] text-[#5a4a3a]">256-bit SSL encryption. Your data is safe.</span></div>
            </>
          )}
          <div className="flex items-center gap-3 mt-5">
            {step > 1 && <button style={pf} onClick={() => setStep(s => s - 1)} className="h-11 px-4 border border-[#c8c0b5] text-[0.9375rem] text-[#5a4a3a] hover:border-[#885926] transition-colors">Back</button>}
            <button style={pf} onClick={() => step < 3 ? setStep(s => s + 1) : onConfirm()}
              className="flex-1 h-11 bg-[#885926] text-white text-[1rem] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              {step < 3 ? "Continue" : "Place order"} <I.ArrowR />
            </button>
          </div>
        </div>
        {/* order summary */}
        <div className="lg:w-72 bg-[#fffdf5] border border-[#d7d2c6] p-4 h-fit">
          <h3 style={pf} className="text-[0.9375rem] text-[#1a1a1a] mb-3">Order summary</h3>
          <ul className="space-y-2.5 divide-y divide-[#e8e2d8]">
            {items.map(i => (
              <li key={i.id} className="flex items-center gap-2 pt-2.5 first:pt-0">
                <ProductImg product={i} className="w-10 h-14 shrink-0" />
                <div className="flex-1 min-w-0"><p style={pf} className="text-[0.8125rem] text-[#1a1a1a] line-clamp-2">{i.title}</p><p style={pf} className="text-[0.75rem] text-[#9a8070]">Qty {i.qty}</p></div>
                <span style={ss} className="text-[0.875rem] text-[#1a1a1a] shrink-0">₹{(i.salePrice ?? i.price) * i.qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-[#d7d2c6] space-y-1.5">
            <div className="flex justify-between"><span style={pf} className="text-[0.8125rem] text-[#5a4a3a]">Subtotal</span><span style={ss} className="text-[0.875rem]">₹{sub}</span></div>
            <div className="flex justify-between"><span style={pf} className="text-[0.8125rem] text-[#5a4a3a]">Shipping</span><span style={ss} className={`text-[0.875rem] ${ship_cost === 0 ? "text-green-700" : ""}`}>{ship_cost === 0 ? "Free" : `₹${ship_cost}`}</span></div>
            <div className="flex justify-between pt-1.5 border-t border-[#d7d2c6]"><span style={pf} className="text-[0.9375rem] text-[#1a1a1a]">Total</span><span style={ss} className="text-[1rem] text-[#1a1a1a]">₹{sub + ship_cost}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ ORDER CONFIRM ═══════════ */
function OrderConfirm({ onHome }: { onHome: () => void }) {
  const order = `MKH-${1043 + Math.floor(Math.random() * 100)}`;
  return (
    <div className="flex-1 bg-[#fffdf5] flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-[#885926] flex items-center justify-center text-white mb-5"><I.Check big /></div>
      <h1 style={pf} className="text-[1.75rem] text-[#1a1a1a]">Thank you!</h1>
      <p style={ss} className="mt-1 text-[1.125rem] text-[#885926]">{order}</p>
      <p style={pf} className="mt-3 text-[0.9375rem] text-[#5a4a3a] max-w-[18rem]">Your order is confirmed. We'll email you when it ships. Estimated delivery: 3–7 days.</p>
      <div className="mt-6 flex flex-col gap-2 w-full max-w-[16rem]">
        <button style={pf} onClick={onHome} className="h-11 bg-[#885926] text-white text-[1rem] hover:opacity-90 transition-opacity">Continue shopping</button>
        <button style={pf} className="h-11 border border-[#885926] text-[#885926] text-[0.9375rem] hover:bg-[#885926]/5 transition-colors">Track order</button>
      </div>
    </div>
  );
}

/* ═══════════ HOME PAGE ═══════════ */
function HomePage({ onGoShop, onView, onAddToCart, wishlist, onWishlist }: {
  onGoShop: (f?: string) => void; onView: (p: Product) => void;
  onAddToCart: (p: Product) => void; wishlist: Set<number>; onWishlist: (id: number) => void;
}) {
  const subjectRef = useRef<HTMLDivElement>(null);
  const picks = PRODUCTS.slice(0, 6);
  const addons = PRODUCTS.filter(p => p.category === "Add-ons");
  const langBooks = PRODUCTS.filter(p => p.category === "Books").slice(0, 6);
  const clothes = PRODUCTS.filter(p => p.category === "Clothes");
  const [lang, setLang] = useState("Arabic");
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[#fffdf5] px-[2.1875rem] sm:px-[3rem] lg:px-[5rem] pt-[5.6875rem] sm:pt-[6.5rem] lg:pt-[8rem] pb-[4.4375rem] sm:pb-[5rem] lg:pb-[6rem]">
        <div className="text-center">
          <p style={pf} className="text-[1.875rem] sm:text-[2.25rem] lg:text-[2.625rem] font-normal leading-[0.95] text-[#885926]">Finally afford</p>
          <h1 style={pfI} className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-normal leading-[0.95] text-[#885926]">Beneficial knowledge</h1>
          <p style={pf} className="mt-[0.5625rem] text-[1.125rem] sm:text-[1.25rem] font-normal leading-[0.95] text-[#867461]">Build your first islamic library</p>
          <div className="mt-[3.25rem] sm:mt-[3.75rem] flex flex-wrap items-center justify-center gap-[1.125rem]">
            <button style={pf} onClick={() => onGoShop()} className="h-[2.4375rem] sm:h-12 min-w-[9.8125rem] sm:min-w-[11rem] bg-[#885926] px-6 text-[1.125rem] sm:text-[1.25rem] text-white hover:opacity-90 transition-opacity active:scale-[0.98]">Shop now</button>
            <button style={pf} onClick={() => onGoShop("Add-ons")} className="text-[1.125rem] sm:text-[1.25rem] text-black hover:opacity-70 transition-opacity">Browse add-ons</button>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="border-y border-[#d7d2c6] bg-[#fffdf5] px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            [<I.Book />, "Authentic Texts", "Sourced from trusted publishers"],
            [<I.Truck />, "Free Shipping", "On orders over ₹999"],
            [<I.Return />, "30-Day Returns", "Hassle-free, no questions asked"],
            [<I.Shield />, "Secure Payments", "256-bit SSL encryption"],
          ].map(([icon, title, sub]) => (
            <div key={title as string} className="flex items-center gap-3">
              <span className="text-[#885926] shrink-0">{icon as React.ReactNode}</span>
              <div><p style={pf} className="text-[0.875rem] sm:text-[0.9375rem] text-[#1a1a1a] leading-tight">{title as string}</p><p style={pf} className="text-[0.6875rem] sm:text-[0.75rem] text-[#9a8070] leading-tight">{sub as string}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BROWSE SUBJECTS ── */}
      <section className="bg-[#885926] pt-[1.125rem] sm:pt-5 pb-6 sm:pb-8 text-center">
        <div className="px-[1.6875rem] sm:px-[3rem]">
          <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal text-[#f3f3f3]">Browse subjects</h2>
          <p style={pf} className="mt-[0.1875rem] text-[1.125rem] font-normal text-[rgba(255,253,245,0.69)]">Master the sciences level by level</p>
        </div>
        <div className="mt-4 relative">
          <button onClick={() => subjectRef.current?.scrollBy({ left: -140, behavior: "smooth" })}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
            <I.ArrowL />
          </button>
          <div ref={subjectRef} className="flex gap-[0.5625rem] overflow-x-auto scrollbar-hide px-10" style={{ scrollSnapType: "x mandatory" }}>
            {SUBJECTS.map(subj => (
              <button key={subj} onClick={() => onGoShop(subj)} className="shrink-0 flex flex-col items-center" style={{ scrollSnapAlign: "start", width: "6.6875rem" }}>
                <span style={pf} className="mb-3 text-[1.0625rem] font-normal text-white hover:text-[rgba(255,253,245,0.80)] transition-colors">{subj}</span>
                <div className="aspect-[107/153] w-full bg-white/90" />
              </button>
            ))}
          </div>
          <button onClick={() => subjectRef.current?.scrollBy({ left: 140, behavior: "smooth" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
            <I.ArrowR />
          </button>
        </div>

        {/* OUR PICKS */}
        <div className="px-[1.6875rem] sm:px-[3rem] mt-10 sm:mt-12 text-center">
          <h2 style={pf} className="text-[1.25rem] sm:text-[1.375rem] font-normal text-white">Our picks</h2>
          <p style={pf} className="mt-[0.1875rem] text-[1.125rem] font-normal text-[rgba(255,253,245,0.69)]">Learn what we recommend for you</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-8">
            {picks.map(item => (
              <div key={item.id} className="group relative text-left">
                <button className="w-full" onClick={() => onView(item)}>
                  <ProductImg product={item} className="aspect-[159/252] w-full" />
                </button>
                <button onClick={() => onWishlist(item.id)} className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white/80 hover:bg-white transition-colors">
                  <I.Heart filled={wishlist.has(item.id)} />
                </button>
                <button style={pf} onClick={() => onAddToCart(item)} className="w-full h-8 bg-[#885926]/80 hover:bg-[#885926] text-white text-[0.75rem] mt-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">+ Add to cart</button>
                <button className="w-full text-left" onClick={() => onView(item)}>
                  <Stars rating={item.rating} sm />
                  <p style={pf} className="mt-1 text-[0.9375rem] text-[#f3f3f3] line-clamp-2">{item.title}</p>
                  {item.author && <p style={pf} className="text-[0.75rem] text-[#e8e8e8] truncate">{item.author}</p>}
                  <div className="mt-1 flex items-center gap-2">
                    {item.salePrice ? <><span style={ss} className="text-[0.9375rem] text-[#fca5a5]">₹{item.salePrice}</span><span style={ss} className="text-[0.8125rem] text-[#e8e8e8]/60 line-through">₹{item.price}</span></> : <span style={ss} className="text-[0.9375rem] text-[#f3f3f3]">₹{item.price}</span>}
                  </div>
                </button>
              </div>
            ))}
          </div>
          <button style={pf} onClick={() => onGoShop()} className="mt-8 h-[1.75rem] min-w-28 border border-white px-6 text-[1.125rem] text-[#f3f3f3] hover:bg-white/10 transition-colors">View all</button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#fffdf5] border-t border-[#d7d2c6] px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <h2 style={pf} className="text-[1.375rem] sm:text-[1.5rem] text-center text-[#1a1a1a] mb-6">What our customers say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="border border-[#e8e2d8] p-4 sm:p-5">
              <Stars rating={t.stars} />
              <p style={pf} className="mt-3 text-[0.875rem] sm:text-[0.9375rem] text-[#5a4a3a] leading-relaxed">"{t.text}"</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#885926] flex items-center justify-center text-white text-[0.6875rem]" style={pf}>{t.name[0]}</div>
                <div><p style={pf} className="text-[0.8125rem] text-[#1a1a1a] leading-none">{t.name}</p><p style={pf} className="text-[0.6875rem] text-[#9a8070]">{t.loc}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADDITIONAL ITEMS ── */}
      <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-[4.0625rem] sm:pt-[4.5rem] pb-8 sm:pb-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div><h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] text-black">Additional Items</h2><p style={pf} className="mt-3 text-[1.125rem] text-[#857461]">Buy that which benefits you</p></div>
          <button style={pf} onClick={() => onGoShop("Add-ons")} className="text-[0.75rem] text-[#885926] underline underline-offset-2 shrink-0 hover:opacity-70">View all</button>
        </div>
        <div className="-mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto scrollbar-hide">
          <div className="flex gap-[0.9375rem] pb-2" style={{ width: "max-content" }}>
            {addons.map(item => (
              <div key={item.id} className="w-[9.3125rem] sm:w-44 shrink-0">
                <button className="w-full" onClick={() => onView(item)}><ProductImg product={item} className="aspect-[149/241] w-full" /></button>
                <Stars rating={item.rating} count={item.reviews} sm />
                <button className="w-full text-left" onClick={() => onView(item)}>
                  <p style={pf} className="mt-1 text-[0.9375rem] text-black line-clamp-2">{item.title}</p>
                  <p style={ss} className="mt-1 text-[0.9375rem] text-black">₹{item.price}</p>
                </button>
                <button style={pf} onClick={() => onAddToCart(item)} className="mt-2 h-8 w-full border border-[#885926] bg-[#fffdf5] text-[0.8125rem] text-[#885926] hover:bg-[#fff8eb] transition-colors">Add to cart</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGE BOOKS ── */}
      <section className="bg-[#fffdf5] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-6 sm:pt-8 pb-6 sm:pb-8">
        <ToggleGroup className="grid w-full grid-cols-3 border-b border-[#d7d2c6] pb-2" type="single" value={lang} onValueChange={v => { if (v) setLang(v); }}>
          {["English", "Urdu", "Arabic"].map(item => (
            <ToggleGroupItem key={item} value={item} style={pf} className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-[1.125rem] text-[#867461] data-[state=on]:bg-transparent data-[state=on]:text-[#885926] data-[state=on]:shadow-none">
              <span className="relative inline-block pb-2">{item}{item === lang && <span className="absolute left-0 bottom-0 block h-px w-full bg-[#885926]" />}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-[0.5625rem] gap-y-5 sm:gap-y-7">
          {langBooks.map(item => (
            <div key={item.id} className="group relative">
              <button className="w-full" onClick={() => onView(item)}>
                <ProductImg product={item} className="aspect-[159/252] w-full" />
              </button>
              <button onClick={() => onWishlist(item.id)} className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white/80 hover:bg-white transition-colors">
                <I.Heart filled={wishlist.has(item.id)} />
              </button>
              <button style={pf} onClick={() => onAddToCart(item)} className="w-full h-7 border border-[#885926]/50 text-[0.6875rem] text-[#885926] mt-0.5 bg-transparent hover:bg-[#885926]/5 transition-colors sm:opacity-0 sm:group-hover:opacity-100">
                + Add to cart
              </button>
              <button className="w-full text-left" onClick={() => onView(item)}>
                <Stars rating={item.rating} sm />
                <p style={pf} className="mt-0.5 text-[0.9375rem] text-black line-clamp-2">{item.title}</p>
                <p style={pf} className="text-[0.75rem] text-[#5a4a3a] truncate">{item.author}</p>
                <p style={ss} className="mt-0.5 text-[0.9375rem] text-black">₹{item.salePrice ?? item.price}</p>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button style={pf} onClick={() => onGoShop("Books")} className="h-[1.75rem] border border-[#885926] px-6 text-[1rem] text-[#885926] hover:bg-[#885926]/5 transition-colors">View all books</button>
        </div>
      </section>

      {/* ── CLOTHES ── */}
      <section className="bg-white border-y border-[#b1b1b1] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] pt-10 pb-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div><h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] text-black">Clothes</h2><p style={pf} className="mt-3 text-[1.125rem] text-[#857461]">Accompany knowledge with modesty</p></div>
          <button style={pf} onClick={() => onGoShop("Clothes")} className="text-[0.75rem] text-[#885926] underline underline-offset-2 shrink-0 hover:opacity-70">View all</button>
        </div>
        <div className="-mx-[2.0625rem] sm:-mx-[3rem] lg:-mx-[5rem] px-[2.0625rem] sm:px-[3rem] lg:px-[5rem] overflow-x-auto scrollbar-hide">
          <div className="flex gap-[0.4375rem] pb-2" style={{ width: "max-content" }}>
            {clothes.map(item => (
              <div key={item.id} className="w-[9.9375rem] sm:w-44 shrink-0 text-center">
                <button className="w-full" onClick={() => onView(item)}><ProductImg product={item} className="aspect-[159/252] w-full" /></button>
                <Stars rating={item.rating} sm />
                <button className="w-full text-center" onClick={() => onView(item)}>
                  <p style={pf} className="mt-1 text-[0.9375rem] text-black">{item.title}</p>
                  <p style={ss} className="mt-1 text-[0.9375rem] text-black">₹{item.price}</p>
                </button>
                <button style={pf} onClick={() => onView(item)} className="mt-2 h-8 w-full border border-[#885926] bg-[#fffdf5] text-[0.8125rem] text-[#885926] hover:bg-[#fff8eb] transition-colors">View options</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-[#885926] px-4 sm:px-6 lg:px-10 py-10 sm:py-12 text-center">
        <h2 style={pf} className="text-[1.5rem] sm:text-[1.75rem] text-white">Stay informed</h2>
        <p style={pf} className="mt-2 text-[1rem] text-[rgba(255,253,245,0.75)]">New arrivals, reading lists, and exclusive discounts.</p>
        {subbed
          ? <p style={pf} className="mt-5 text-[1.0625rem] text-white">Jazakallahu khairan! You're subscribed.</p>
          : <div className="mt-5 flex max-w-sm mx-auto">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={pf}
                className="flex-1 h-11 px-4 bg-white text-[0.9375rem] text-[#1a1a1a] placeholder-[#9a8070] outline-none border border-r-0 border-white/30" />
              <button style={pf} onClick={() => { if (email) setSubbed(true); }} className="h-11 px-5 bg-[#5c3a18] text-white text-[0.9375rem] hover:bg-[#4a2f13] transition-colors border border-white/20 whitespace-nowrap">Subscribe</button>
            </div>
        }
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1208] px-4 sm:px-6 lg:px-10 pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <img src={makhtabaLogo} alt="Makhtaba" className="h-8 w-auto object-contain mb-3 invert" />
            <p style={pf} className="text-[0.8125rem] text-[#c8b99c] leading-relaxed">Your trusted Islamic bookstore. Knowledge is an obligation upon every Muslim.</p>
          </div>
          {[
            { heading: "Shop", links: ["All Products", "Books", "Clothes", "Add-ons"] },
            { heading: "Help", links: ["FAQ", "Shipping policy", "Returns", "Contact us"] },
            { heading: "Company", links: ["About us", "Blog", "Careers", "Press"] },
          ].map(col => (
            <div key={col.heading}>
              <p style={pf} className="text-[0.75rem] text-[#9a8070] uppercase tracking-wide mb-3">{col.heading}</p>
              {col.links.map(link => (
                <button key={link} style={pf} className="block text-[0.875rem] text-[#c8b99c] hover:text-white transition-colors mb-2">{link}</button>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={pf} className="text-[0.75rem] text-[#9a8070]">© 2026 Makhtaba. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span style={pf} className="text-[0.625rem] text-[#9a8070]">Secure payments</span>
            {["VISA", "MC", "UPI", "COD"].map(m => <span key={m} style={pf} className="text-[0.6875rem] text-[#c8b99c] border border-white/10 px-1.5 py-0.5">{m}</span>)}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export const Makhtaba = (): JSX.Element => {
  const [view, setView] = useState<ViewId>("home");
  const [shopFilter, setShopFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prevView, setPrevView] = useState<ViewId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const navigate = useCallback((v: ViewId) => { setPrevView(view); setView(v); }, [view]);

  const goToShop = useCallback((filter = "All") => { setShopFilter(filter); navigate("shop"); }, [navigate]);

  const viewProduct = useCallback((p: Product) => { setSelectedProduct(p); navigate("product"); }, [navigate]);

  const addToCart = useCallback((p: Product, size?: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === p.id && i.size === size);
      if (existing) return prev.map(i => (i.id === p.id && i.size === size) ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1, size }];
    });
    setCartOpen(true);
  }, []);

  const changeQty = useCallback((id: number, d: number) =>
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)), []);

  const removeItem = useCallback((id: number) =>
    setCartItems(prev => prev.filter(i => i.id !== id)), []);

  const toggleWishlist = useCallback((id: number) =>
    setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const related = selectedProduct
    ? PRODUCTS.filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.subject === selectedProduct.subject)).slice(0, 4)
    : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:wght@400&display=swap');
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onView={p => { viewProduct(p); setSearchOpen(false); }} />
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={f => goToShop(f)} onAccount={() => navigate("account")} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onQtyChange={changeQty} onRemove={removeItem}
        onCheckout={() => { setCartOpen(false); navigate("checkout"); }} />

      <main className="min-h-screen w-full bg-[#ebe7df]">
        <div className="mx-auto flex min-h-screen w-full max-w-[24.5625rem] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex-col bg-[#fffdf5]">

          {/* ── STICKY HEADER ── */}
          <header className="sticky top-0 z-30 bg-[#fffdf5] border-b border-[#d7d2c6] h-[3.5625rem] px-[2.0625rem] flex items-center justify-between">
            <div className="flex items-center gap-[1.375rem]">
              <button onClick={() => setMenuOpen(true)} className="text-black hover:opacity-70 transition-opacity"><I.Hamburger /></button>
              <button onClick={() => setSearchOpen(true)} className="text-black hover:opacity-70 transition-opacity"><I.Search /></button>
            </div>
            <button onClick={() => setView("home")} className="flex items-center"><img src={makhtabaLogo} alt="Makhtaba" className="h-[2.8125rem] w-auto object-contain select-none" /></button>
            <div className="flex items-center gap-[1.375rem]">
              <button onClick={() => navigate("account")} className="text-black hover:opacity-70 transition-opacity"><I.Account /></button>
              <button className="relative text-black hover:opacity-70 transition-opacity" onClick={() => setCartOpen(true)}>
                <I.Cart />
                {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#885926] text-white text-[0.5rem] font-bold rounded-full h-[1.125rem] w-[1.125rem] flex items-center justify-center leading-none">{cartCount}</span>}
              </button>
            </div>
          </header>

          {/* breadcrumb for sub-pages */}
          {view !== "home" && view !== "confirm" && (
            <nav className="bg-[#fffdf5] px-4 sm:px-6 lg:px-10 pt-2.5 flex items-center gap-1.5 border-b border-[#f0ece5]">
              <button style={pf} onClick={() => setView("home")} className="text-[0.75rem] text-[#5a4a3a] hover:text-[#885926] transition-colors flex items-center gap-1">
                <I.ArrowL /> Home
              </button>
              {view === "shop" && <><span style={pf} className="text-[0.75rem] text-[#c8c0b5]">/</span><span style={pf} className="text-[0.75rem] text-[#1a1a1a]">{shopFilter === "All" ? "Shop" : shopFilter}</span></>}
              {view === "product" && selectedProduct && <><span style={pf} className="text-[0.75rem] text-[#c8c0b5]">/</span><span style={pf} className="text-[0.75rem] text-[#5a4a3a] hover:text-[#885926] cursor-pointer" onClick={() => setView(prevView === "shop" ? "shop" : "home")}>{prevView === "shop" ? shopFilter : "Home"}</span></>}
              {view === "account" && <><span style={pf} className="text-[0.75rem] text-[#c8c0b5]">/</span><span style={pf} className="text-[0.75rem] text-[#1a1a1a]">Account</span></>}
              {view === "checkout" && <><span style={pf} className="text-[0.75rem] text-[#c8c0b5]">/</span><span style={pf} className="text-[0.75rem] text-[#1a1a1a]">Checkout</span></>}
            </nav>
          )}

          {/* ── VIEWS ── */}
          {view === "home" && <HomePage onGoShop={goToShop} onView={viewProduct} onAddToCart={addToCart} wishlist={wishlist} onWishlist={toggleWishlist} />}
          {view === "shop" && <ShopPage initialFilter={shopFilter} onView={viewProduct} onAddToCart={addToCart} wishlist={wishlist} onWishlist={toggleWishlist} />}
          {view === "product" && selectedProduct && <ProductPage product={selectedProduct} onAddToCart={addToCart} onBack={() => setView(prevView)} wishlist={wishlist} onWishlist={toggleWishlist} related={related} onView={viewProduct} />}
          {view === "account" && <AccountPage wishlist={wishlist} onView={viewProduct} onAddToCart={addToCart} />}
          {view === "checkout" && <CheckoutFlow items={cartItems} onConfirm={() => { setCartItems([]); navigate("confirm"); }} onBack={() => navigate("home")} />}
          {view === "confirm" && <OrderConfirm onHome={() => setView("home")} />}
        </div>
      </main>
    </>
  );
};

export default Makhtaba;
