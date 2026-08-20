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
import { QuoteFormModal } from './components/QuoteFormModal';
import { VerifyCoaModal } from './components/VerifyCoaModal';
import { ContactDock } from './components/ContactDock';
import { HomePackagingShowcase } from './components/HomePackagingShowcase';
import { CatalogueProductPage } from './components/CatalogueProductPage';
import { CATALOGUE_PRODUCTS, getCatalogueGroup } from './data/catalogue';
import {
  PAGE_META,
  PAGE_ROUTES,
  SITE_URL,
  getPageIdFromPath,
  getPathForPage,
  getProductIdFromPath,
  normalizePath,
} from './siteRoutes';
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

const updateMetaTag = (selector: string, attribute: string, value: string) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

export function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const activeTab = getPageIdFromPath(currentPath);
  const productId = getProductIdFromPath(currentPath);
  const routeProduct = productId ? CATALOGUE_PRODUCTS.find((product) => product.id === productId) ?? null : null;
  
  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteProductName, setQuoteProductName] = useState<string>('');
  const [coaModalOpen, setCoaModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const legacyPage = window.location.hash.slice(1);
    if (legacyPage && PAGE_ROUTES[legacyPage]) {
      const replacement = PAGE_ROUTES[legacyPage];
      window.history.replaceState({}, '', replacement);
      setCurrentPath(replacement);
    }

    const syncPathFromUrl = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', syncPathFromUrl);
    return () => window.removeEventListener('popstate', syncPathFromUrl);
  }, []);

  useEffect(() => {
    const pageMeta = routeProduct
      ? {
          title: `${routeProduct.name} | B2B Indian Botanical Supply`,
          description: `${routeProduct.whyBuyersKnowIt} Forms, applications, documentation and current availability are confirmed per enquiry.`,
          image: routeProduct.image,
          type: 'product',
        }
      : {
          ...(PAGE_META[activeTab] ?? PAGE_META.home),
          image: '/assets/images/hero-botanical-still-life.webp',
          type: 'website',
        };
    const canonical = `${SITE_URL}${currentPath === '/' ? '/' : currentPath}`;
    const image = pageMeta.image.startsWith('http') ? pageMeta.image : `${SITE_URL}${pageMeta.image}`;

    document.title = pageMeta.title;
    updateMetaTag('meta[name="description"]', 'content', pageMeta.description);
    updateMetaTag('link[rel="canonical"]', 'href', canonical);
    updateMetaTag('meta[property="og:type"]', 'content', pageMeta.type);
    updateMetaTag('meta[property="og:title"]', 'content', pageMeta.title);
    updateMetaTag('meta[property="og:description"]', 'content', pageMeta.description);
    updateMetaTag('meta[property="og:url"]', 'content', canonical);
    updateMetaTag('meta[property="og:image"]', 'content', image);
    updateMetaTag('meta[name="twitter:title"]', 'content', pageMeta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', pageMeta.description);
    updateMetaTag('meta[name="twitter:image"]', 'content', image);

    const schema = routeProduct
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: routeProduct.name,
          alternateName: routeProduct.botanicalName,
          url: canonical,
          image,
          description: routeProduct.fieldDescription,
          category: getCatalogueGroup(routeProduct),
          brand: { '@type': 'Organization', name: 'Ancient Indian Botanicals', url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png` },
        }
      : {
          '@context': 'https://schema.org',
          '@type': activeTab === 'home' ? 'WebSite' : 'WebPage',
          name: pageMeta.title,
          description: pageMeta.description,
          url: canonical,
          publisher: { '@type': 'Organization', name: 'Ancient Indian Botanicals', url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png` },
        };
    let schemaElement = document.getElementById('route-structured-data');
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'route-structured-data';
      schemaElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [activeTab, currentPath, routeProduct]);

  const navigateToTab = (tab: string) => {
    const nextPath = getPathForPage(tab);
    if (normalizePath(window.location.pathname) !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
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
            <HomePackagingShowcase
              openPackagingPage={() => navigateToTab('packaging')}
              openQuoteModal={() => handleOpenQuoteModal()}
            />
            <OriginsSection />
            <WorkflowSection onStartEnquiry={() => handleOpenQuoteModal()} />
            <ProductCatalogue
              initialCategory="all"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              openQuoteModal={handleOpenQuoteModal}
            />
          </>
        )}

        {activeTab === 'essential-oils' && (
          <EssentialOilsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => setCoaModalOpen(true)}
          />
        )}

        {activeTab === 'botanicals' && (
          <BotanicalsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
          <PackagingPage openQuoteModal={handleOpenQuoteModal} />
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

        {activeTab === 'product' && routeProduct && (
          <CatalogueProductPage
            product={routeProduct}
            relatedProducts={CATALOGUE_PRODUCTS.filter((product) => product.id !== routeProduct.id && getCatalogueGroup(product) === getCatalogueGroup(routeProduct)).slice(0, 3)}
            openQuoteModal={handleOpenQuoteModal}
          />
        )}

        {(activeTab === 'not-found' || (activeTab === 'product' && !routeProduct)) && (
          <section className="bg-[#f4efe5] px-4 py-24 text-center text-[#1f2925] md:px-8">
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Page not found</span>
            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">This sourcing route is not available.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[#66706b]">Return to the complete catalogue or contact our trade desk with the product you require.</p>
            <a href="/catalogue" className="mt-7 inline-flex bg-[#173f34] px-7 py-3 text-xs font-bold uppercase tracking-eyebrow text-[#fbf8f1]">Browse the catalogue</a>
          </section>
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
