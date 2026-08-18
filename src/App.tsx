import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AssuranceStrip } from './components/AssuranceStrip';
import { ProductFamilies } from './components/ProductFamilies';
import { CultivationStories } from './components/CultivationStories';
import { OriginsSection } from './components/OriginsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ProductCatalogue } from './components/ProductCatalogue';
import { CompleteCatalogue } from './components/CompleteCatalogue';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteFormModal } from './components/QuoteFormModal';
import { VerifyCoaModal } from './components/VerifyCoaModal';
import { ContactDock } from './components/ContactDock';
import {
  EssentialOilsPage,
  BotanicalsPage,
  PackagingPage,
  QualityPage,
  AboutPage,
  PaymentsPage,
  ContactPage,
  LegalPage
} from './components/Pages';
import { BotanicalProduct } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>(() => window.location.hash.slice(1) || 'home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<BotanicalProduct | null>(null);
  
  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteProductName, setQuoteProductName] = useState<string>('');
  const [coaModalOpen, setCoaModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const syncTabFromUrl = () => {
      setActiveTab(window.location.hash.slice(1) || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', syncTabFromUrl);
    return () => window.removeEventListener('popstate', syncTabFromUrl);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Indian Botanical Ingredients & Essential Oils | Ancient Indian Botanicals',
      'essential-oils': 'Essential & Aroma Oils | Ancient Indian Botanicals',
      botanicals: 'Botanical Ingredients | Ancient Indian Botanicals',
      catalogue: 'Complete Product Catalogue | Ancient Indian Botanicals',
      packaging: 'Bulk & Private-Label Packaging | Ancient Indian Botanicals',
      quality: 'Lot Documentation & Quality Process | Ancient Indian Botanicals',
      about: 'About Ancient Indian Botanicals',
      payments: 'Commercial Terms | Ancient Indian Botanicals',
      contact: 'Contact the Trade Desk | Ancient Indian Botanicals',
      search: 'Search Product Catalogue | Ancient Indian Botanicals',
      terms: 'Terms of Trade | Ancient Indian Botanicals',
      shipping: 'Shipping Information | Ancient Indian Botanicals',
      privacy: 'Privacy Policy | Ancient Indian Botanicals',
      refunds: 'Claims & Quality Resolution | Ancient Indian Botanicals',
    };

    document.title = titles[activeTab] || titles.home;
  }, [activeTab]);

  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
    const nextUrl = tab === 'home' ? window.location.pathname : `#${tab}`;
    window.history.pushState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (productName?: string) => {
    setQuoteProductName(productName || '');
    setQuoteModalOpen(true);
  };

  const handleSelectCategory = (category: string) => {
    if (category === 'essential-oils' || category === 'botanicals' || category === 'packaging') {
      navigateToTab(category);
    } else if (category === 'catalogue') {
      navigateToTab('catalogue');
    } else {
      navigateToTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#062b23] text-[#fbf7ed] flex flex-col font-body selection:bg-[#b88a2c] selection:text-[#062b23]">
      
      {/* Shared Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        openCoaModal={() => setCoaModalOpen(true)}
        openQuoteModal={handleOpenQuoteModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Page View Switcher */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <div className="flex flex-col bg-[#041e18]">
              <div className="flex flex-col justify-center">
                <Hero
                  onExploreOils={() => navigateToTab('essential-oils')}
                  onBrowseBotanicals={() => navigateToTab('botanicals')}
                  openCoaModal={() => setCoaModalOpen(true)}
                />
              </div>
              <AssuranceStrip />
            </div>

            <ProductFamilies
              onSelectCategory={handleSelectCategory}
              onViewAll={() => navigateToTab('catalogue')}
            />
            <CultivationStories onBrowseBotanicals={() => navigateToTab('botanicals')} />
            <OriginsSection />
            <WorkflowSection onStartEnquiry={() => handleOpenQuoteModal()} />
            <ProductCatalogue
              initialCategory="all"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectProduct={(product) => setSelectedProduct(product)}
              openQuoteModal={handleOpenQuoteModal}
            />
          </>
        )}

        {activeTab === 'essential-oils' && (
          <EssentialOilsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(product) => setSelectedProduct(product)}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => setCoaModalOpen(true)}
          />
        )}

        {activeTab === 'botanicals' && (
          <BotanicalsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(product) => setSelectedProduct(product)}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => setCoaModalOpen(true)}
          />
        )}

        {activeTab === 'catalogue' && (
          <CompleteCatalogue
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
          />
        )}

        {activeTab === 'packaging' && (
          <PackagingPage openQuoteModal={() => handleOpenQuoteModal()} />
        )}

        {activeTab === 'quality' && (
          <QualityPage
            openCoaModal={() => setCoaModalOpen(true)}
            openQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage openQuoteModal={() => handleOpenQuoteModal()} />
        )}

        {activeTab === 'payments' && <PaymentsPage />}

        {activeTab === 'contact' && (
          <ContactPage openQuoteModal={() => handleOpenQuoteModal()} />
        )}

        {activeTab === 'search' && (
          <CompleteCatalogue
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
          />
        )}

        {(activeTab === 'terms' || activeTab === 'shipping' || activeTab === 'privacy' || activeTab === 'refunds') && (
          <LegalPage policyType={activeTab as any} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        setActiveTab={navigateToTab}
        openQuoteModal={handleOpenQuoteModal}
        openCoaModal={() => setCoaModalOpen(true)}
      />

      <ContactDock
        openQuoteModal={() => handleOpenQuoteModal()}
        openContactPage={() => navigateToTab('contact')}
      />

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenQuote={(prodName) => handleOpenQuoteModal(prodName)}
          onVerifyCoa={() => setCoaModalOpen(true)}
        />
      )}

      {quoteModalOpen && (
        <QuoteFormModal
          initialProductName={quoteProductName}
          onClose={() => setQuoteModalOpen(false)}
        />
      )}

      {coaModalOpen && (
        <VerifyCoaModal
          onClose={() => setCoaModalOpen(false)}
          onOpenQuote={(prodName) => handleOpenQuoteModal(prodName)}
        />
      )}

    </div>
  );
}

export default App;
