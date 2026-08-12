import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AssuranceStrip } from './components/AssuranceStrip';
import { ProductFamilies } from './components/ProductFamilies';
import { OriginsSection } from './components/OriginsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ProductCatalogue } from './components/ProductCatalogue';
import { CompleteCatalogue } from './components/CompleteCatalogue';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteFormModal } from './components/QuoteFormModal';
import { VerifyCoaModal } from './components/VerifyCoaModal';
import { AiSpecConsultantModal } from './components/AiSpecConsultantModal';
import {
  EssentialOilsPage,
  BotanicalsPage,
  PackagingPage,
  QualityPage,
  AboutPage,
  PaymentsPage,
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
  const [aiConsultantModalOpen, setAiConsultantModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const syncTabFromUrl = () => {
      setActiveTab(window.location.hash.slice(1) || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', syncTabFromUrl);
    return () => window.removeEventListener('popstate', syncTabFromUrl);
  }, []);

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
        openAiConsultantModal={() => setAiConsultantModalOpen(true)}
        openQuoteModal={handleOpenQuoteModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Page View Switcher */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            {/* Landing Page Exact 100vh Fold Wrapper - Hero centered in middle, AssuranceStrip shifted up to anchor exact page fold ending */}
            <div className="h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] flex flex-col justify-between bg-[#041e18] overflow-hidden">
              <div className="flex-grow flex flex-col justify-center overflow-hidden">
                <Hero
                  onExploreOils={() => navigateToTab('essential-oils')}
                  onBrowseBotanicals={() => navigateToTab('botanicals')}
                  openCoaModal={() => setCoaModalOpen(true)}
                  openAiConsultantModal={() => setAiConsultantModalOpen(true)}
                />
              </div>
              <AssuranceStrip />
            </div>

            <ProductFamilies
              onSelectCategory={handleSelectCategory}
              onViewAll={() => navigateToTab('catalogue')}
            />
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
        openAiConsultantModal={() => setAiConsultantModalOpen(true)}
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

      {aiConsultantModalOpen && (
        <AiSpecConsultantModal
          onClose={() => setAiConsultantModalOpen(false)}
          onOpenQuote={(prodName) => handleOpenQuoteModal(prodName)}
        />
      )}

    </div>
  );
}

export default App;
