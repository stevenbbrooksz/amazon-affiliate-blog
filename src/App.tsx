import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Footer } from './components/Footer';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { Category } from './pages/Category';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { canonicalUrl, getSeoForPath, normalizePath, SITE_NAME, SITE_URL } from './seo';

export function AppContent() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-orange-600 selection:text-white pb-24 md:pb-16">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides/:slug" element={<PostDetail />} />
          <Route path="/post/:id" element={<Navigate to="/" replace />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AnnouncementBar />
      <Footer />
    </div>
  );
}

function SeoUpdater() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const isNotFound = seo.path !== normalizePath(location.pathname);
    const title = isNotFound ? 'Page Not Found - AMZREVIEWS' : seo.title;
    const description = isNotFound ? 'The requested AMZREVIEWS page could not be found.' : seo.description;
    const canonical = isNotFound ? `${SITE_URL}/404` : canonicalUrl(seo.path);

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', isNotFound ? 'noindex,follow' : 'index,follow');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', `${SITE_URL}/og-image.svg`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', `${SITE_URL}/og-image.svg`);
    upsertCanonical(canonical);
  }, [location.pathname]);

  return null;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }
  tag.href = href;
}

export default function App() {
  return (
    <Router>
      <SeoUpdater />
      <GoogleAnalytics />
      <AppContent />
    </Router>
  );
}
