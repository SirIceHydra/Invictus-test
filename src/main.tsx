import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import App from './App.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import { ShopProvider } from './shop/core/ShopProvider';
import { CartProvider } from './shop/core/cart/CartContext';
import './index.css';

// Custom scroll restoration component that works with BrowserRouter
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RootComponent() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ShopProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-primary text-secondary">
            <div className="scroll-progress-bar" />
            
            {/* Custom scroll restoration - automatically scrolls to top on route changes */}
            <ScrollToTop />
            
            {/* Navigation */}
            <Navigation isScrolled={isScrolled} />
            
            {/* Main Content with proper spacing */}
            <main className="pt-32">
              <App />
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ShopProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
