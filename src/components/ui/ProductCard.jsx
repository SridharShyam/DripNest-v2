import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/formatters';
import { Button, Badge } from './Button';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const RatingStars = ({ rating, reviews }) => (
  <div className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.round(rating) ? "#3C3489" : "transparent"}
          stroke={i <= Math.round(rating) ? "#3C3489" : "#CECBF6"}
        />
      ))}
    </div>
    {reviews && <span>({reviews})</span>}
  </div>
);

export const ProductCard = ({ product }) => {
  const { id, name, brand, price, originalPrice, rating, reviews, images, isNew, isSale, inStock } = product;
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
    toast.success(`${name} added to cart!`, {
      icon: null,
      style: {
        borderRadius: '2px',
        background: '#3C3489',
        color: '#fff',
        fontFamily: 'DM Sans'
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (!wishlisted) {
      toast.success('Added to wishlist', { icon: '❤️' });
    } else {
      toast.error('Removed from wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col w-full h-full bg-white transition-shadow hover:shadow-2xl hover:shadow-violet-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`} className="relative block overflow-hidden aspect-[3/4]">
        <motion.img
          src={hovered && images[1] ? images[1] : images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && <Badge variant="new">NEW</Badge>}
          {isSale && <Badge variant="sale">SALE</Badge>}
          {!inStock && <Badge className="bg-black text-white">OUT OF STOCK</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-violet-800 transition-all hover:bg-white hover:scale-110 active:scale-90 z-20"
        >
          <Heart size={18} fill={wishlisted ? "#3C3489" : "transparent"} strokeWidth={wishlisted ? 0 : 2} />
        </button>

        {/* Quick View Button (Desktop only on hover) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 hidden md:flex gap-2"
            >
              <Button
                variant="primary"
                className="flex-1 text-xs h-9 uppercase tracking-widest bg-violet-800/90 backdrop-blur-sm"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingBag size={14} className="mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 font-body font-bold">{brand}</p>
          <RatingStars rating={rating} reviews={reviews} />
        </div>
        
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-display text-lg text-navy-900 group-hover:text-violet-600 transition-colors line-clamp-1 leading-tight">
            {name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-body font-bold text-navy-900">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="font-body text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        
        {/* Mobile Add Button */}
        <div className="md:hidden mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-[10px] uppercase tracking-wider"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            Add to Bag
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
