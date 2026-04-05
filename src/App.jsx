import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Wishlist } from './pages/Wishlist';
import { Profile } from './pages/Profile';
import { OrderTracking } from './pages/OrderTracking';
import { BackInStockAlerts } from './pages/BackInStockAlerts';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchBar } from './components/ai/SearchBar';
import { useUIStore } from './store/uiStore';
import { StyleAdvisor } from './components/ai/StyleAdvisor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function App() {
  const location = useLocation();
  const { cartOpen, setCartOpen, searchOpen, setSearchOpen } = useUIStore();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={location.pathname}
           variants={pageVariants}
           initial="initial"
           animate="animate"
           exit="exit"
           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/track/:orderId" element={<OrderTracking />} />
            <Route path="/alerts" element={<BackInStockAlerts />} />
            <Route path="/style-advisor" element={
              <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
                <Navbar />
                <StyleAdvisor />
                <Footer />
              </div>
            } />
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
                <h1 className="font-display text-9xl font-black text-violet-100">404</h1>
                <h2 className="font-display text-4xl font-bold text-navy-900 -mt-8 mb-4">Retired Look</h2>
                <a href="/" className="px-12 h-16 bg-violet-800 text-white rounded-sm flex items-center justify-center font-body font-bold uppercase tracking-widest">Back to Home</a>
              </div>
            } />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
