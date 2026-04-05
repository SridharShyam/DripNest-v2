import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, 
  ChevronRight, Minus, Plus, Sparkles, Star, ChevronLeft, Search, Loader2 
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductCard, RatingStars } from '../components/ui/ProductCard';
import { Button, Badge } from '../components/ui/Button';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAI } from '../hooks/useAI';
import { formatPrice } from '../utils/formatters';
import toast from 'react-hot-toast';
import { clsx } from "clsx";

export const ProductDetail = () => {
  const { id } = useParams();
  const product = useMemo(() => products.find(p => p.id === id), [id]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(id);
  const { loading: aiLoading, response: aiResponse, getStylingCombinations } = useAI();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setSelectedImage(0);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Search className="text-violet-200 mb-6" size={64} />
        <h2 className="font-display text-4xl font-bold text-navy-900 mb-4">Product Not Found</h2>
        <Link to="/shop">
          <Button variant="primary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to bag!`, {
      icon: null,
      style: { background: '#3C3489', color: '#fff' }
    });
  };

  const relatedProducts = products
    .filter(p => p.id !== id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-violet-400 mb-12 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-violet-800">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-violet-800">Shop</Link>
          <ChevronRight size={10} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-violet-800 capitalize">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-navy-900 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6 h-max">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={clsx(
                    "relative w-20 aspect-[3/4] overflow-hidden rounded-sm transition-all border-2",
                    selectedImage === idx ? "border-violet-800 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-sm bg-gray-50">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Image Navigation */}
              <div className="absolute inset-x-4 bottom-4 flex justify-between pointer-events-none md:hidden">
                <button 
                  onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  className="p-3 rounded-full bg-white/80 backdrop-blur pointer-events-auto shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  className="p-3 rounded-full bg-white/80 backdrop-blur pointer-events-auto shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="flex justify-between items-start mb-2">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-violet-400">{product.brand}</p>
                <Badge variant={product.inStock ? "default" : "outline"} className={product.inStock ? "" : "text-gray-400 border-gray-400"}>
                  {product.inStock ? "In Stock" : "Temporarily Out of Stock"}
                </Badge>
              </div>
              <h1 className="font-display text-4xl font-bold text-navy-900 leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-6">
                <RatingStars rating={product.rating} reviews={product.reviews} />
                <span className="h-4 w-px bg-violet-100" />
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-2xl font-black text-navy-900">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="font-body text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                  {product.originalPrice && (
                    <span className="font-body text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded ml-2">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="font-body text-gray-500 leading-relaxed">
              {product.description}
            </p>

            <div className="h-px bg-violet-50" />

            {/* Selection Options */}
            <div className="flex flex-col gap-10">
              {/* Color Selector */}
              <div>
                <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-navy-900 mb-4">Select Color</h4>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={clsx(
                        "w-10 h-10 rounded-full border-2 transition-all p-1",
                        selectedColor === color ? "border-violet-800 scale-110" : "border-transparent"
                      )}
                    >
                      <div className="w-full h-full rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: color }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-navy-900">Select Size</h4>
                  <button className="text-[10px] font-bold text-violet-800 border-b border-violet-800 pb-0.5 hover:text-violet-400 transition-colors uppercase tracking-widest">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={clsx(
                        "h-12 border font-body text-xs font-bold transition-all flex items-center justify-center rounded-sm",
                        selectedSize === size ? "bg-violet-800 text-white border-violet-800 shadow-lg" : "border-neutral-200 text-navy-900 hover:border-violet-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-navy-900 mb-4">Quantity</h4>
                <div className="flex items-center w-32 h-14 border border-violet-100 rounded-sm">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex-1 h-full flex items-center justify-center text-navy-900 hover:bg-violet-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center font-body font-bold text-navy-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="flex-1 h-full flex items-center justify-center text-navy-900 hover:bg-violet-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-16 uppercase tracking-[0.2em] font-black text-sm"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingBag size={20} className="mr-3" />
                  Add to Bag
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={clsx(
                    "flex-none w-16 h-16 p-0",
                    wishlisted ? "bg-violet-50 border-violet-800" : ""
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleItem(product);
                    if (!wishlisted) toast.success('Moved to wishlist');
                  }}
                >
                  <Heart size={24} fill={wishlisted ? "#3C3489" : "transparent"} strokeWidth={wishlisted ? 0 : 1.5} className="text-violet-800" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 p-6 bg-violet-50/50 rounded-xl space-y-4">
              <div className="flex items-center gap-4 text-sm font-body text-navy-900">
                <Truck className="text-violet-800" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-bold">Fast Delivery</p>
                  <p className="text-xs text-gray-500">Estimated delivery: 3–5 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-body text-navy-900">
                <RotateCcw className="text-violet-800" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-bold">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day money back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Stylist Panel */}
        <section className="mb-32">
          <div className="bg-gradient-to-r from-navy-900 to-violet-900 rounded-3xl p-10 lg:p-16 relative overflow-hidden text-white shadow-3xl">
             {/* Gradient Overlay */}
            <div className="absolute top-0 right-0 w-max h-full p-20 flex flex-col justify-center opacity-10 pointer-events-none">
              <Sparkles size={400} strokeWidth={0.5} />
            </div>

            <div className="max-w-4xl relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-violet-800 rounded-2xl shadow-xl">
                  <Sparkles size={24} className="text-violet-100" />
                </div>
                <h3 className="font-display text-4xl font-bold">How to style this?</h3>
              </div>
              
              <p className="font-body text-xl text-violet-100 mb-10 leading-relaxed italic opacity-80">
                "Not sure what to pair this with? Our Virtual AI Stylist can build full outfit combinations tailored to this specific piece."
              </p>

              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-navy-900 px-12 h-16 text-lg"
                onClick={() => getStylingCombinations(product.name)}
                disabled={aiLoading}
              >
                {aiLoading ? <Loader2 className="animate-spin mr-3" /> : <Sparkles className="mr-3" />}
                {aiLoading ? "Consulting Stylist..." : "Ask AI Stylist"}
              </Button>

              <AnimatePresence>
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 p-8 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/20 whitespace-pre-wrap font-body text-lg leading-relaxed shadow-inner"
                  >
                    {aiResponse}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-32">
          <div className="flex border-b border-violet-50 mb-12 gap-12 overflow-x-auto no-scrollbar">
            {['description', 'reviews', 'shipping & returns'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "pb-6 text-sm font-bold uppercase tracking-[0.2em] transition-all relative",
                  activeTab === tab ? "text-navy-900" : "text-gray-400 hover:text-navy-900"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-violet-800" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
             {activeTab === 'description' && (
               <div className="max-w-4xl font-body text-lg text-gray-600 leading-loose space-y-6">
                 <p>{product.description}</p>
                 <ul className="list-disc pl-5 space-y-3">
                   <li>Handcrafted premium fabric for ultimate longevity.</li>
                   <li>Sustainable dyes that maintain brilliance after multiple washes.</li>
                   <li>Reinforced stitching at stress points.</li>
                   <li>Signature DripNest embroidered logo detailing.</li>
                 </ul>
                 <p className="text-sm font-bold text-navy-900 uppercase tracking-widest mt-12">Fabric & Care</p>
                 <p>100% Cotton. Cold machine wash with similar colors. Do not bleach. Tumble dry low.</p>
               </div>
             )}

             {activeTab === 'reviews' && (
               <div className="space-y-12">
                 <div className="flex items-center gap-12">
                   <div className="text-center">
                     <span className="font-display text-7xl font-bold text-navy-900">{product.rating}</span>
                     <div className="flex justify-center my-2 text-violet-800"><RatingStars rating={product.rating} /></div>
                     <p className="text-xs font-bold text-gray-500 uppercase">Based on {product.reviews} reviews</p>
                   </div>
                   <div className="hidden md:flex flex-col flex-1 gap-2">
                     {[5, 4, 3, 2, 1].map(star => (
                       <div key={star} className="flex items-center gap-4">
                         <span className="text-xs font-bold w-4">{star}</span>
                         <Star size={10} className="text-violet-800" fill="#3C3489" />
                         <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                            className="h-full bg-violet-800" 
                            style={{ width: star === 5 ? '72%' : star === 4 ? '18%' : '5%' }} 
                           />
                         </div>
                         <span className="text-[10px] font-bold text-gray-400 w-8">{star === 5 ? '72%' : star === 4 ? '18%' : '5%'}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="p-8 border border-violet-50 rounded-2xl">
                       <div className="flex justify-between mb-4">
                         <div className="flex gap-1 text-violet-800"><RatingStars rating={5} /></div>
                         <span className="text-[10px] font-bold text-gray-400">Mar 22, 2024</span>
                       </div>
                       <p className="font-display text-xl font-bold text-navy-900 mb-4">"Exceeded expectations!"</p>
                       <p className="font-body text-sm text-gray-500 mb-6 leading-relaxed">
                         The quality of the fabric is top-notch. It fits perfectly and the color is exactly as shown in the pictures. Highly recommended!
                       </p>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-violet-800 text-white flex items-center justify-center text-[10px] font-bold uppercase">JD</div>
                         <span className="text-xs font-bold text-navy-900">Jayesh D.</span>
                         <ShieldCheck size={14} className="text-green-500 ml-auto" />
                         <span className="text-[10px] font-bold text-green-500 uppercase">Verified Purchase</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl font-bold text-navy-900">Complete the Look</h2>
            <Link to="/shop" className="text-sm font-bold text-violet-800 border-b border-violet-800">Visit Shop</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
