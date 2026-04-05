import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, Circle, MapPin, Search, Headset, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button, Badge } from '../components/ui/Button';
import { mockOrders } from '../data/orders';
import { formatPrice } from '../utils/formatters';
import { clsx } from "clsx";

export const OrderTracking = () => {
  const { orderId } = useParams();
  const order = mockOrders.find(o => o.id === orderId) || mockOrders[1];

  const steps = [
    { label: 'Order Placed', time: 'May 20, 10:24 AM', status: 'complete' },
    { label: 'Order Confirmed', time: 'May 20, 11:15 AM', status: 'complete' },
    { label: 'Packed & Ready', time: 'May 21, 04:32 PM', status: 'complete' },
    { label: 'Out for Delivery', time: 'Today, 09:00 AM', status: 'current' },
    { label: 'Delivered', time: 'Expected by 6 PM', status: 'pending' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-40 pb-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-4">
                <Link to="/" className="hover:text-violet-800">Home</Link> / <span className="text-navy-900">Tracking</span>
              </nav>
              <h1 className="font-display text-5xl font-black text-navy-900 leading-tight">Track Your Style</h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="font-body text-gray-500">Order ID: <span className="font-bold text-violet-800 uppercase tracking-widest">{order.id}</span></p>
                <div className="h-4 w-px bg-violet-100" />
                <p className="font-body text-gray-500">Estimated delivery: <span className="font-bold text-navy-900">May 25, 2024</span></p>
              </div>
            </div>

            <Link to="/shop">
              <Button variant="outline" className="px-8 h-14 uppercase tracking-widest font-black text-xs">
                Back to Shop
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            {/* LEFT: Timeline */}
            <div className="lg:col-span-4 bg-violet-50/50 rounded-3xl p-10 border border-violet-50">
              <h3 className="font-display text-2xl font-bold mb-10 text-navy-900 flex items-center gap-3">
                <Search size={22} className="text-violet-800" /> Status
              </h3>
              
              <div className="space-y-0">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex gap-8 pb-10 group">
                    {idx < steps.length - 1 && (
                      <div className={clsx(
                        "absolute left-[13px] top-6 w-[2px] h-full",
                        step.status === 'complete' ? "bg-violet-800" : "bg-violet-100"
                      )} />
                    )}
                    
                    <div className="relative z-10 shrink-0">
                      {step.status === 'complete' ? (
                        <CheckCircle2 size={28} className="text-violet-800 bg-white rounded-full shadow-lg" fill="#3C3489" stroke="#fff" />
                      ) : step.status === 'current' ? (
                        <div className="w-7 h-7 rounded-full bg-violet-800 relative flex items-center justify-center border-4 border-white shadow-xl">
                          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full bg-violet-800/40" />
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      ) : (
                        <Circle size={28} className="text-violet-100 bg-white rounded-full" />
                      )}
                    </div>
                    
                    <div>
                      <p className={clsx(
                        "font-display text-xl font-bold mb-1",
                        step.status === 'current' ? "text-violet-800" : step.status === 'complete' ? "text-navy-900" : "text-gray-300"
                      )}>
                        {step.label}
                      </p>
                      <p className="font-body text-xs font-bold text-gray-400 tracking-widest uppercase">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Map & Items */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Map Placeholder */}
              <div className="aspect-[16/7] md:aspect-[16/5] bg-violet-100/50 rounded-3xl border-2 border-dashed border-violet-200 flex flex-col items-center justify-center p-12 text-center group transition-colors hover:bg-violet-100">
                <div className="p-4 bg-white rounded-2xl shadow-xl mb-6 transition-transform group-hover:scale-110">
                  <MapPin size={32} className="text-violet-800" />
                </div>
                <h4 className="font-display text-2xl font-bold text-navy-900 mb-2">Live Tracking Map</h4>
                <p className="font-body text-gray-500 text-sm max-w-sm">The tracking map will appear once your package leaves the regional sorting facility. Stay tuned!</p>
              </div>

              {/* Items Summary */}
              <div className="bg-white rounded-3xl p-10 shadow-3xl border border-violet-50">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-display text-2xl font-bold text-navy-900">Inside your package</h3>
                  <Badge variant="outline" className="border-violet-100 text-violet-400 uppercase tracking-widest">{order.items.length} PIECES</Badge>
                </div>
                <div className="space-y-8">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="w-20 aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden shrink-0 shadow-sm border border-black/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="font-display text-xl font-bold text-navy-900 mb-1">{item.name}</p>
                        <p className="font-body text-[10px] font-black uppercase text-gray-400 tracking-widest underline decoration-violet-200 underline-offset-4">SIZE: {item.size} • QTY: {item.quantity}</p>
                        <p className="font-body font-bold text-violet-800 mt-2">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-violet-50 my-10" />
                <div className="flex justify-between items-center bg-violet-50/50 p-6 rounded-2xl">
                   <p className="font-body text-xs font-black uppercase tracking-[0.2em] text-gray-500">Total Order Value</p>
                   <p className="font-display text-3xl font-black text-navy-900">{formatPrice(order.total)}</p>
                </div>
              </div>

              {/* Support */}
              <div className="p-8 border-2 border-violet-50 rounded-3xl flex flex-col md:flex-row items-center gap-8 group hover:border-violet-800 transition-colors">
                <div className="p-4 bg-violet-800 rounded-2xl shadow-xl text-white">
                  <Headset size={28} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-display text-xl font-bold text-navy-900 mb-1">Facing any trouble?</h4>
                  <p className="font-body text-sm text-gray-500">Contact our 24/7 DripNest Support for quick resolutions.</p>
                </div>
                <Button variant="primary" className="px-8 h-14 uppercase tracking-widest font-black text-xs whitespace-nowrap">
                  Get Help Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
