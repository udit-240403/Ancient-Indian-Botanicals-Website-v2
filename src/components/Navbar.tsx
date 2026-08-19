import React, { useState } from 'react';
import { Search, ShieldCheck, Menu, X, ChevronRight, Mail, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCoaModal: () => void;
  openQuoteModal: (productName?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openCoaModal,
  openQuoteModal,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'essential-oils', label: 'OILS' },
    { id: 'botanicals', label: 'BOTANICALS' },
    { id: 'catalogue', label: 'FULL CATALOGUE' },
    { id: 'packaging', label: 'PACKAGING' },
    { id: 'quality', label: 'QUALITY' },
    { id: 'about', label: 'ABOUT' },
    { id: 'payments', label: 'PAYMENTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('search');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="relative z-40 w-full">
      <div className="w-full border-b border-[#dfcfad] bg-[#f4efd3] py-1.5 font-sans text-[10px] text-[#17231e] sm:text-[11px]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-2 font-semibold tracking-wide">
            <span aria-hidden="true" className="text-[#8aa34d]">◆</span>
            <span className="truncate">
              <span className="sm:hidden">Indian botanical sourcing · Mandsaur</span>
              <span className="hidden sm:inline">Indian botanical sourcing corridors · Mandsaur · Alleppey · Mysore</span>
            </span>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <a href="mailto:office@ancientindianbotanicals.com" className="flex items-center gap-1.5 font-semibold transition-colors hover:text-[#967020]"><Mail className="h-3.5 w-3.5" />office@ancientindianbotanicals.com</a>
            <button onClick={openCoaModal} className="flex items-center gap-1.5 border border-[#041e18]/25 px-3 py-1 font-bold uppercase tracking-eyebrow transition-colors hover:bg-[#eae3c2]"><ShieldCheck className="h-3.5 w-3.5 text-[#967020]" />Request lot documents</button>
          </div>
        </div>
      </div>

      <nav className="w-full border-b border-[#b88a2c]/35 bg-[#041e18] text-[#fbf7ed] shadow-[0_16px_42px_rgba(0,0,0,.22)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
          <button onClick={() => handleNavClick('home')} className="group flex min-w-0 items-center gap-2.5 text-left sm:gap-4">
            <div className="relative flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-[#d4a43d] bg-[#f4efd3] p-1 shadow-[0_0_0_4px_rgba(212,164,61,.14),0_12px_34px_rgba(0,0,0,.38)] sm:h-24 sm:w-24">
              <img
                src="/assets/images/aib-official-symbol.webp"
                alt="Ancient Indian Botanicals official flowering botanical and lotus symbol"
                width="512"
                height="512"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(event) => { event.currentTarget.src = '/assets/images/aib-official-logo.webp'; }}
                className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </div>
            <div className="min-w-0">
              <span className="block whitespace-nowrap font-serif text-[1rem] font-bold uppercase leading-[.95] tracking-[0.075em] text-[#fbf7ed] transition-colors group-hover:text-[#d4a43d] min-[390px]:text-[1.12rem] sm:text-[1.8rem] sm:tracking-[0.13em]">Ancient Indian</span>
              <span className="block whitespace-nowrap font-serif text-[1rem] font-bold uppercase leading-tight tracking-[0.12em] text-[#fbf7ed] transition-colors group-hover:text-[#d4a43d] min-[390px]:text-[1.12rem] sm:text-[1.8rem] sm:tracking-[0.18em]">Botanicals</span>
              <div className="mt-1.5 hidden items-center gap-2 min-[430px]:flex">
                <span className="h-px w-3 bg-[#b88a2c]/60" />
                <span className="whitespace-nowrap text-[7.5px] font-semibold uppercase tracking-[0.15em] text-[#d4a43d] sm:text-[9px]">Pure by nature · trusted by time</span>
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-3 lg:flex">
            <form onSubmit={handleSearchSubmit} className="relative hidden xl:block">
              <input type="text" placeholder="SEARCH THE 92-PRODUCT CATALOGUE" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-64 border border-[#b88a2c]/35 bg-[#062b23] py-2.5 pl-3 pr-9 text-[10px] uppercase tracking-wider text-[#fbf7ed] placeholder:text-[#82966f] focus:border-[#b88a2c] focus:outline-none" />
              <button type="submit" aria-label="Search catalogue" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d4a43d]"><Search className="h-4 w-4" /></button>
            </form>
            <button onClick={() => openQuoteModal()} className="flex items-center gap-2 bg-[#b88a2c] px-5 py-3 text-[10px] font-extrabold uppercase tracking-eyebrow text-[#041e18] transition-colors hover:bg-[#d4a43d]">Start an enquiry <ArrowRight className="h-4 w-4" /></button>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button onClick={() => setSearchOpen((value) => !value)} aria-label={searchOpen ? 'Close catalogue search' : 'Open catalogue search'} className="hidden border border-[#b88a2c]/35 p-2.5 text-[#fbf7ed] min-[410px]:block"><Search className="h-4 w-4" /></button>
            <button onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle navigation menu" className="border border-[#b88a2c]/45 p-2.5 text-[#fbf7ed]">{mobileMenuOpen ? <X className="h-6 w-6 text-[#d4a43d]" /> : <Menu className="h-6 w-6" />}</button>
          </div>
        </div>

        <div className="hidden border-t border-[#b88a2c]/20 bg-[#062b23] lg:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-7 px-8 py-3">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`relative py-1 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${activeTab === link.id ? 'text-[#d4a43d]' : 'text-[#fbf7ed]/82 hover:text-[#d4a43d]'}`}>
                {link.label}
                {activeTab === link.id && <span className="absolute -bottom-3 left-0 h-[2px] w-full bg-[#d4a43d]" />}
              </button>
            ))}
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-[#b88a2c]/25 bg-[#062b23] p-4 lg:hidden">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input type="text" placeholder="Search products, forms or industries..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-w-0 flex-1 border border-[#b88a2c]/50 bg-[#041e18] p-3 text-xs text-[#fbf7ed] focus:border-[#b88a2c] focus:outline-none" />
              <button type="submit" className="bg-[#b88a2c] px-4 py-3 text-[10px] font-bold uppercase text-[#041e18]">Search</button>
            </form>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="border-t border-[#b88a2c]/30 bg-[#041e18] px-5 py-5 shadow-2xl lg:hidden">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-6">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => handleNavClick(link.id)} className={`flex items-center justify-between border-b border-[#b88a2c]/18 py-3 text-left text-[11px] font-bold uppercase tracking-eyebrow ${activeTab === link.id ? 'text-[#d4a43d]' : 'text-[#fbf7ed]/88'}`}><span>{link.label}</span><ChevronRight className="h-4 w-4 text-[#b88a2c]" /></button>
              ))}
            </div>
            <div className="mt-5 grid gap-2 border-t border-[#b88a2c]/25 pt-4 sm:grid-cols-2">
              <button onClick={() => { setMobileMenuOpen(false); openQuoteModal(); }} className="flex items-center justify-center gap-2 bg-[#b88a2c] py-3 text-[10px] font-bold uppercase tracking-eyebrow text-[#041e18]"><Mail className="h-4 w-4" />Start enquiry</button>
              <button onClick={() => { setMobileMenuOpen(false); openCoaModal(); }} className="flex items-center justify-center gap-2 border border-[#b88a2c]/45 py-3 text-[10px] font-bold uppercase tracking-eyebrow text-[#fbf7ed]"><ShieldCheck className="h-4 w-4 text-[#d4a43d]" />Lot documents</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
