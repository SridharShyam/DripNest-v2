import { useNotificationStore } from '../store/userStore';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button, Badge } from '../components/ui/Button';
import { Bell, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatters';

export const BackInStockAlerts = () => {
  const { alerts, removeAlert } = useNotificationStore();

  const alertProducts = alerts.map(alert => {
    const product = products.find(p => p.id === alert.productId) || products[0];
    return { ...alert, product };
  });

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-40 pb-24 container mx-auto px-6">
        <div className="flex flex-col mb-16 gap-6">
          <Badge variant="outline" className="w-max px-6">INVENTORY MONITOR</Badge>
          <h1 className="font-display text-7xl font-black text-navy-900 leading-tight">Vigilant Stock Updates</h1>
          <p className="font-body text-gray-500 text-xl italic max-w-2xl leading-relaxed">
            Never miss a restock of your favorite pieces. Your style, updated in real-time.
          </p>
        </div>

        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-violet-100 rounded-3xl">
             <Bell className="text-violet-200 mb-6" size={64} />
             <h3 className="font-display text-3xl font-bold text-navy-900 mb-4">No active alerts.</h3>
             <p className="font-body text-gray-400 mb-12 max-w-md text-center">Set up restock notifications on any out-of-stock piece to see them appear here with live status updates.</p>
             <Link to="/shop">
               <Button variant="primary" className="px-16 h-16 uppercase tracking-[0.2em] font-black">
                 Visit Shop
               </Button>
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alertProducts.map((alert) => (
              <div key={alert.id} className="relative bg-violet-50/50 rounded-3xl p-8 border border-violet-100 group transition-all hover:bg-white hover:shadow-2xl hover:shadow-violet-200">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className={alert.restocked ? "text-green-500" : "text-violet-400"} />
                    <span className="font-body text-[10px] font-bold text-gray-400 uppercase tracking-widest">Added on May 20</span>
                  </div>
                  {alert.restocked ? (
                    <Badge variant="new" className="animate-pulse">RESTOCKED!</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-400 border-gray-200">PENDING RETRIEVAL</Badge>
                  )}
                </div>

                <div className="flex gap-6 mb-8 group">
                  <div className="w-20 aspect-[3/4] bg-white rounded-sm overflow-hidden shrink-0 shadow-sm border border-black/5">
                    <img src={alert.product.images[0]} alt={alert.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-navy-900 group-hover:text-violet-800 transition-colors leading-tight mb-2">{alert.product.name}</h3>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-violet-400">Size: {alert.size || 'M'}</p>
                    <p className="font-body font-black text-navy-900 mt-2">{formatPrice(alert.product.price)}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {alert.restocked ? (
                    <Link to={`/product/${alert.product.id}`}>
                      <Button variant="primary" className="w-full h-12 uppercase tracking-widest font-black text-xs">
                        <ShoppingBag size={14} className="mr-2" />
                        Shop Now
                      </Button>
                    </Link>
                  ) : (
                    <div className="p-4 bg-white/50 rounded-2xl border border-dashed border-violet-100 text-center font-body text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                       Monitoring availability in mumbai atelier...
                    </div>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 uppercase tracking-widest font-bold text-[10px]"
                    onClick={() => removeAlert(alert.id)}
                  >
                    <Trash2 size={14} className="mr-2" />
                    Remove Alert
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
