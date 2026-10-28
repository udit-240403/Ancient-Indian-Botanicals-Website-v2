import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AssuranceStrip } from './components/AssuranceStrip';
import { ProductFamilies } from './components/ProductFamilies';
import { ContactDock } from './components/ContactDock';
import { CorePortfolio } from './components/CorePortfolio';
import { BuyerTranslationNotice } from './components/BuyerTranslationNotice';
import { CATALOGUE_PRODUCTS, getCatalogueGroup } from './data/catalogue';
import FAQS from './data/faq.json';
import internationalNames from './data/international-product-names.json';
import productSearchSeo from './data/product-search-seo.json';
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
const InternationalProductNamesPage = lazy(() => import('./components/InternationalProductNamesPage').then((module) => ({ default: module.InternationalProductNamesPage })));
const CatalogueProductPage = lazy(() => import('./components/CatalogueProductPage').then((module) => ({ default: module.CatalogueProductPage })));
const QuoteFormModal = lazy(() => import('./components/QuoteFormModal').then((module) => ({ default: module.QuoteFormModal })));
const VerifyCoaModal = lazy(() => import('./components/VerifyCoaModal').then((module) => ({ default: module.VerifyCoaModal })));
const EssentialOilsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.EssentialOilsPage })));
const BotanicalsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.BotanicalsPage })));
const StandardizedExtractsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.StandardizedExtractsPage })));
const FoodIngredientsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.FoodIngredientsPage })));
const PackagingPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.PackagingPage })));
const QualityPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.QualityPage })));
const FAQPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.FAQPage })));
const AboutPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.AboutPage })));
const PaymentsPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.PaymentsPage })));
const ContactPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.ContactPage })));
const VerificationPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.VerificationPage })));
const LegalPage = lazy(() => import('./components/Pages').then((module) => ({ default: module.LegalPage })));
const CultivationStories = lazy(() => import('./components/CultivationStories').then((module) => ({ default: module.CultivationStories })));
const OriginsSection = lazy(() => import('./components/OriginsSection').then((module) => ({ default: module.OriginsSection })));
const WorkflowSection = lazy(() => import('./components/WorkflowSection').then((module) => ({ default: module.WorkflowSection })));
const HomePackagingShowcase = lazy(() => import('./components/HomePackagingShowcase').then((module) => ({ default: module.HomePackagingShowcase })));
const PartnerCapabilityGallery = lazy(() => import('./components/PartnerCapabilityGallery').then((module) => ({ default: module.PartnerCapabilityGallery })));

const PRODUCT_SEARCH_GUIDE_BY_ID = new Map(
  productSearchSeo.map((guide) => [guide.productId, guide]),
);

const PageLoading = () => (
  <div className="min-h-[55vh] bg-[#f4efe5] px-4 py-16 text-[#1f2925] md:px-8" role="status" aria-live="polite">
    <div className="mx-auto max-w-[1440px] animate-pulse">
      <span className="block text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Ancient Indian Botanicals</span>
      <div className="mt-5 h-12 max-w-2xl bg-[#dfd6c6]" />
      <div className="mt-5 h-4 max-w-3xl bg-[#e6ded0]" />
      <div className="mt-2 h-4 max-w-xl bg-[#e6ded0]" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="aspect-[4/3] border border-[#b88a2c]/20 bg-[#e7dfd1]" />)}
      </div>
    </div>
  </div>
);

const DeferredHomeSection: React.FC<React.PropsWithChildren<{ minHeight?: string }>> = ({ children, minHeight = 'min-h-[420px]' }) => {
  const [visible, setVisible] = useState(false);
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = marker.current;
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: '650px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={marker} className={visible ? '' : minHeight}>
      {visible ? <Suspense fallback={<div className={`${minHeight} animate-pulse bg-[#eee8dd]`} aria-hidden="true" />}>{children}</Suspense> : null}
    </div>
  );
};

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
  const productSearchGuide = routeProduct ? PRODUCT_SEARCH_GUIDE_BY_ID.get(routeProduct.id) : undefined;
  
  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteProductName, setQuoteProductName] = useState<string>('');
  const [coaModalOpen, setCoaModalOpen] = useState<boolean>(false);
  const [coaProductName, setCoaProductName] = useState<string>('');

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
          title: productSearchGuide?.seoTitle
            ?? `${routeProduct.name} | B2B Indian ${['seeds-food', 'cold-pressed-oils'].includes(getCatalogueGroup(routeProduct)) ? 'Ingredient' : 'Botanical'} Supply`,
          description: productSearchGuide?.metaDescription
            ?? `${routeProduct.whyBuyersKnowIt} Forms, applications, documentation and current availability are confirmed per enquiry.`,
          image: routeProduct.image,
          type: 'product',
        }
      : {
          ...(PAGE_META[activeTab] ?? PAGE_META.home),
          image: '/assets/images/product-families-flatlay.webp',
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

    const organization = { '@type': 'Organization', name: 'Ancient Indian Botanicals Private Limited', alternateName: ['Ancient Indian Botanicals', 'Ancient Indian Botanical', 'AncientIndianBotanicals', 'AncientIndianBotanical'], description: 'Indian B2B sourcing company incorporated in 2026 with GST, Udyam, IEC, APEDA RCMC, ICEGATE and ISO 9001:2015 credentials.', foundingDate: '2026', sameAs: ['https://www.linkedin.com/company/ancient-indian-botanicals/'], url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png` };
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
            alternateName: Array.from(new Set([...(routeProduct.alternateNames ?? []), routeProduct.botanicalName])),
            description: routeProduct.fieldDescription,
          },
          ...(productSearchGuide
            ? { mainEntity: productSearchGuide.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }
            : {}),
          keywords: Array.from(new Set([routeProduct.name, ...(routeProduct.alternateNames ?? []), ...(productSearchGuide?.names ?? []), routeProduct.botanicalName, getCatalogueGroup(routeProduct)])),
          publisher: organization,
        }
      : activeTab === 'faq'
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${canonical}#faq`,
            name: pageMeta.title,
            description: pageMeta.description,
            url: canonical,
            mainEntity: FAQS.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
            publisher: organization,
          }
      : activeTab === 'international-product-names'
        ? {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${canonical}#page`,
            name: pageMeta.title,
            description: pageMeta.description,
            url: canonical,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: internationalNames.length,
              itemListElement: internationalNames.map((entry, index) => {
                const product = CATALOGUE_PRODUCTS.find((item) => item.id === entry.productId);
                return {
                  '@type': 'ListItem',
                  position: index + 1,
                  name: entry.internationalName,
                  url: `${SITE_URL}/products/${entry.productId}`,
                  item: {
                    '@type': 'Thing',
                    name: product?.name ?? entry.internationalName,
                    alternateName: [entry.internationalName, entry.indianTradeName, product?.botanicalName, ...(product?.alternateNames ?? [])].filter(Boolean),
                  },
                };
              }),
            },
            publisher: organization,
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
          publisher: organization,
        };
    let schemaElement = document.getElementById('route-structured-data');
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'route-structured-data';
      schemaElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [activeTab, currentPath, routeProduct, productSearchGuide]);

  const navigateToTab = (tab: string) => {
    const nextPath = getPathForPage(tab);
    if (normalizePath(window.location.pathname) !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    const nextPath = `/products/${productId}`;
    if (normalizePath(window.location.pathname) !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (productName?: string) => {
    setQuoteProductName(productName || '');
    setQuoteModalOpen(true);
  };

  const handleOpenCoaModal = (productName?: string) => {
    setCoaProductName(productName || '');
    setCoaModalOpen(true);
  };

  const handleSelectCategory = (category: string) => {
    if (category === 'essential-oils' || category === 'standardized-extracts' || category === 'botanicals' || category === 'food-ingredients' || category === 'packaging') {
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
        openCoaModal={() => handleOpenCoaModal()}
        openQuoteModal={handleOpenQuoteModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BuyerTranslationNotice />

      {/* Main Page View Switcher */}
      <main className="flex-grow">
        <Suspense fallback={<PageLoading />}>
        {activeTab === 'home' && (
          <div className="home-cinematic">
            <div className="flex flex-col bg-[#041e18]">
              <div className="flex flex-col justify-center">
                <Hero
                  onExploreExtracts={() => navigateToTab('standardized-extracts')}
                  onBrowseBotanicals={() => navigateToTab('botanicals')}
                  openCoaModal={() => handleOpenCoaModal()}
                />
              </div>
              <AssuranceStrip />
            </div>

            <CorePortfolio
              openProduct={navigateToProduct}
              openQuoteModal={handleOpenQuoteModal}
            />

            <ProductFamilies
              onSelectCategory={handleSelectCategory}
              onViewAll={() => navigateToTab('catalogue')}
            />
            <DeferredHomeSection minHeight="min-h-[760px]">
              <PartnerCapabilityGallery onStartEnquiry={() => handleOpenQuoteModal('Partner capability and specification review')} />
            </DeferredHomeSection>
            <DeferredHomeSection minHeight="min-h-[520px]">
              <CultivationStories onBrowseBotanicals={() => navigateToTab('botanicals')} />
            </DeferredHomeSection>
            <DeferredHomeSection minHeight="min-h-[500px]">
              <HomePackagingShowcase
                openPackagingPage={() => navigateToTab('packaging')}
                openQuoteModal={() => handleOpenQuoteModal()}
              />
            </DeferredHomeSection>
            <DeferredHomeSection minHeight="min-h-[680px]">
              <OriginsSection />
            </DeferredHomeSection>
            <DeferredHomeSection minHeight="min-h-[520px]">
              <WorkflowSection onStartEnquiry={() => handleOpenQuoteModal()} />
            </DeferredHomeSection>
          </div>
        )}

        {activeTab === 'essential-oils' && (
          <EssentialOilsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => handleOpenCoaModal()}
          />
        )}

        {activeTab === 'botanicals' && (
          <BotanicalsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => handleOpenCoaModal()}
          />
        )}

        {activeTab === 'standardized-extracts' && (
          <StandardizedExtractsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => handleOpenCoaModal()}
          />
        )}

        {activeTab === 'food-ingredients' && (
          <FoodIngredientsPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
            openCoaModal={() => handleOpenCoaModal()}
          />
        )}

        {activeTab === 'catalogue' && (
          <CompleteCatalogue
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openQuoteModal={handleOpenQuoteModal}
          />
        )}

        {activeTab === 'international-product-names' && <InternationalProductNamesPage />}

        {activeTab === 'packaging' && (
          <PackagingPage openQuoteModal={handleOpenQuoteModal} />
        )}

        {activeTab === 'quality' && (
          <QualityPage
            openCoaModal={() => handleOpenCoaModal()}
            openQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activeTab === 'faq' && (
          <FAQPage
            openCoaModal={() => handleOpenCoaModal()}
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

        {activeTab === 'verification' && <VerificationPage />}

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
            openCoaModal={handleOpenCoaModal}
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
        openCoaModal={() => handleOpenCoaModal()}
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
            initialProductName={coaProductName}
          />
        </Suspense>
      )}

    </div>
  );
}

export default App;
