import React, { useState } from 'react';
import { Search, ShieldCheck, Menu, X, ChevronRight } from 'lucide-react';

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
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'essential-oils', label: 'ESSENTIAL OILS' },
    { id: 'botanicals', label: 'BOTANICALS' },
    { id: 'catalogue', label: 'FULL CATALOGUE' },
    { id: 'packaging', label: 'PACKAGING' },
    { id: 'quality', label: 'QUALITY' },
    { id: 'about', label: 'ABOUT' },
    { id: 'buy-quote', label: 'BUY / QUOTE' },
    { id: 'payments', label: 'PAYMENTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'buy-quote' || id === 'contact') {
      openQuoteModal();
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('search');
      setSearchOpen(false);
    }
  };

  return (
    <header className="w-full relative z-40">
      {/* Top Banner Row */}
      <div className="w-full bg-[#f4efd3] text-[#17231e] text-[11px] py-1.5 font-sans border-b border-[#dfcfad]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Sanskrit motto / Sourcing provenance indicator */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="text-[#b88a2c] font-bold">🌿</span>
            <span className="text-[#041e18] font-semibold">
              Indian botanical sourcing corridors · Mandsaur · Alleppey · Mysore
            </span>
          </div>

          {/* Lot-document action remains deliberately evidence-led. */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={openCoaModal}
              className="bg-[#f4efd3] hover:bg-[#eae3c2] text-[#041e18] border border-[#041e18]/30 px-3 py-1 font-semibold text-[10.5px] uppercase tracking-eyebrow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#b88a2c]" />
              <span>REQUEST LOT DOCUMENTS</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Dark Green Navigation Bar */}
      <nav className="w-full bg-[#041e18] text-[#fbf7ed] border-b border-[#b88a2c]/30 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between py-3 md:py-3.5">
          
          {/* Logo Mark & Text using Custom AI Metallic Gold Logo Emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left cursor-pointer group"
          >
            <div className="w-13 h-13 flex items-center justify-center shrink-0 p-0.5 rounded-full border-2 border-[#b88a2c] bg-[#041e18] group-hover:border-[#fbf7ed] transition-colors shadow-lg overflow-hidden">
              <img
                src="/assets/images/ancient_indian_botanicals_gold_logo.png"
                alt="Ancient Indian Botanicals Metallic Gold Logo"
                width="1024"
                height="1024"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-[0.14em] text-[#fbf7ed] group-hover:text-[#b88a2c] transition-colors leading-none uppercase">
                ANCIENT INDIAN
              </span>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-[#fbf7ed] group-hover:text-[#b88a2c] transition-colors leading-tight uppercase">
                BOTANICALS
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-[1px] w-2.5 bg-[#b88a2c]/60" />
                <span className="text-[8.5px] tracking-[0.16em] uppercase text-[#b88a2c] font-light">
                  PURE BY NATURE. TRUSTED BY TIME.
                </span>
                <span className="h-[1px] w-2.5 bg-[#b88a2c]/60" />
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer relative py-1.5 ${
                  activeTab === link.id
                    ? 'text-[#b88a2c]'
                    : 'text-[#fbf7ed]/90 hover:text-[#b88a2c]'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b88a2c]" />
                )}
              </button>
            ))}
          </div>

          {/* Quick Search Toggle / Desktop Search Box */}
          <div className="flex items-center gap-3">
            
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="SEARCH CATALOGUE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#062b23] border border-[#b88a2c]/40 text-[11px] text-[#fbf7ed] placeholder-[#82966f] pl-3 pr-8 py-1.5 w-44 xl:w-52 focus:outline-none focus:border-[#b88a2c] uppercase tracking-wider"
              />
              <button type="submit" aria-label="Search catalogue" className="absolute right-2 text-[#b88a2c] hover:text-[#fbf7ed] cursor-pointer">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? 'Close catalogue search' : 'Open catalogue search'}
              className="lg:hidden p-2 text-[#fbf7ed] hover:text-[#b88a2c] border border-[#b88a2c]/30 rounded-none cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#fbf7ed] hover:text-[#b88a2c] border border-[#b88a2c]/40 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#b88a2c]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="lg:hidden p-4 bg-[#062b23] border-t border-[#b88a2c]/30">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="SEARCH INGREDIENTS, BOTANICALS, OILS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-[#041e18] border border-[#b88a2c] text-xs text-[#fbf7ed] p-2 focus:outline-none"
              />
              <button type="submit" className="bg-[#b88a2c] text-[#041e18] px-4 py-2 text-xs font-bold uppercase">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Flyout Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#041e18] border-t border-[#b88a2c]/40 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-xs uppercase tracking-eyebrow font-semibold py-2 border-b border-[#b88a2c]/20 flex items-center justify-between ${
                    activeTab === link.id ? 'text-[#b88a2c] font-bold' : 'text-[#fbf7ed]/90'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#b88a2c]" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#b88a2c]/30">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCoaModal();
                }}
                className="w-full bg-[#b88a2c] text-[#041e18] py-2.5 text-xs font-bold uppercase tracking-eyebrow flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Request Lot Documents</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
