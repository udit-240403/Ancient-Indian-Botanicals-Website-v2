import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AssuranceStrip } from './components/AssuranceStrip';
import { ProductFamilies } from './components/ProductFamilies';
import { CultivationStories } from './components/CultivationStories';
import { OriginsSection } from './components/OriginsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ProductCatalogue } from './components/ProductCatalogue';
import { ContactDock } from './components/ContactDock';
import { HomePackagingShowcase } from './components/HomePackagingShowcase';
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

const CompleteCatalogue = lazy(() => import('./components/CompleteCatalogue').then((module) => ({ default: module.CompleteCatalogue })));
const CatalogueProductPage = lazy(() => import('./components/CatalogueProductPage').then((module) => ({ default: module.CatalogueProductPage })));
const QuoteFormModal = lazy(() => import('./components/QuoteFormModal').then((module) => ({ default: module.QuoteFormModal })));
const VerifyCoaModal = lazy(() => import('./components/VerifyCoaModal').then((module) => ({ default: module.VerifyCoaModal })));
const EssentialOilsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.EssentialOilsPage })));
const BotanicalsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.BotanicalsPage })));
const FoodIngredientsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.FoodIngredientsPage })));
const PackagingPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.PackagingPage })));
const QualityPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.QualityPage })));
const AboutPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.AboutPage })));
const PaymentsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.PaymentsPage })));
const ContactPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.ContactPage })));
const LegalPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.LegalPage })));

const PageLoading = () => (
  <div className="flex min-h-[55vh] items-center justify-center bg-[#f4efe5] px-4 text-center text-[#1f2925]" role="status" aria-live="polite">
    <div>
      <span className="block text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Ancient Indian Botanicals</span>
      <p className="mt-3 font-serif text-2xl font-semibold">Preparing this sourcing route…</p>
    </div>
  </div>
);

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
          title: `${routeProduct.name} | B2B Indian ${['seeds-food', 'cold-pressed-oils'].includes(getCatalogueGroup(routeProduct)) ? 'Ingredient' : 'Botanical'} Supply`,
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
          '@type': 'WebPage',
          name: pageMeta.title,
          url: canonical,
          description: pageMeta.description,
          primaryImageOfPage: { '@type': 'ImageObject', contentUrl: image },
          about: {
            '@type': 'Thing',
            name: routeProduct.name,
            alternateName: routeProduct.botanicalName,
            description: routeProduct.fieldDescription,
          },
          keywords: [routeProduct.name, routeProduct.botanicalName, getCatalogueGroup(routeProduct)],
          publisher: { '@type': 'Organization', name: 'Ancient Indian Botanicals', alternateName: ['Ancient Indian Botanical', 'AncientIndianBotanicals', 'AncientIndianBotanical'], url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png` },
        }
      : {
          '@context': 'https://schema.org',
          '@type': activeTab === 'home' ? 'WebSite' : 'WebPage',
          ...(activeTab === 'home'
            ? {
                '@id': `${SITE_URL}/#website`,
                name: 'Ancient Indian Botanicals',
                alternateName: ['Ancient Indian Botanical', 'AncientIndianBotanicals'],
              }
            : {
                '@id': `${canonical}#page`,
                name: pageMeta.title,
                isPartOf: { '@id': `${SITE_URL}/#website` },
              }),
          description: pageMeta.description,
          url: canonical,
          publisher: { '@type': 'Organization', name: 'Ancient Indian Botanicals', alternateName: ['Ancient Indian Botanical', 'AncientIndianBotanicals', 'AncientIndianBotanical'], url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png` },
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
    if (category === 'essential-oils' || category === 'botanicals' || category === 'food-ingredients' || category === 'packaging') {
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
        <Suspense fallback={<PageLoading />}>
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

        {activeTab === 'food-ingredients' && (
          <FoodIngredientsPage
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
          <AboutPage openQuoteModal={handleOpenQuoteModal} />
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
        </Suspense>
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
        <Suspense fallback={null}>
          <QuoteFormModal
            initialProductName={quoteProductName}
            onClose={() => setQuoteModalOpen(false)}
          />
        </Suspense>
      )}

      {coaModalOpen && (
        <Suspense fallback={null}>
          <VerifyCoaModal
            onClose={() => setCoaModalOpen(false)}
            onOpenQuote={(prodName) => handleOpenQuoteModal(prodName)}
          />
        </Suspense>
      )}

    </div>
  );
}

export default App;
