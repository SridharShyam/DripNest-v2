import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  const handleMoveToCart = (product) => {
    addItem(product, product.sizes[0], product.colors[0]);
    removeItem(product.id);
    toast.success(`${product.name} moved to bag!`, {
      icon: null,
      style: { background: '#3C3489', color: '#fff' }
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-40 pb-24 container mx-auto px-6">
        <div className="flex flex-col mb-16 gap-6">
          <Badge variant="outline" className="w-max px-6">CURATED WISHLIST</Badge>
          <h1 className="font-display text-7xl font-black text-navy-900 leading-tight">Pieces You Love</h1>
          <p className="font-body text-gray-500 text-xl italic max-w-2xl leading-relaxed">
            Your personal digital archive of luxury aesthetics. Save now, style forever.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 bg-violet-50/50 rounded-3xl border-2 border-dashed border-violet-100 px-6 text-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-xl text-violet-200">
              <Heart size={48} />
            </div>
            <h3 className="font-display text-3xl font-bold text-navy-900 mb-4">Your wishlist is empty.</h3>
            <p className="font-body text-gray-500 mb-12 max-w-md">Browse our latest collections and click the heart icon on any piece to save it here for later.</p>
            <Link to="/shop">
              <Button variant="primary" className="px-16 h-16 uppercase tracking-[0.2em] font-black group">
                Discover Trends
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {items.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="mt-6 flex flex-col gap-3 px-4">
                  <Button 
                    variant="primary" 
                    className="w-full h-12 uppercase tracking-widest font-black text-[10px]"
                    onClick={() => handleMoveToCart(product)}
                  >
                    <ShoppingBag size={14} className="mr-2" />
                    Move to Bag
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 uppercase tracking-widest font-bold text-[10px]"
                    onClick={() => removeItem(product.id)}
                  >
                    Remove Piece
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
