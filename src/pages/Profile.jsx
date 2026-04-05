import { useUserStore } from '../store/userStore';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button, Badge } from '../components/ui/Button';
import { User, ShoppingBag, MapPin, Settings, LogOut, ChevronRight, Package, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockOrders } from '../data/orders';
import { formatPrice } from '../utils/formatters';

export const Profile = () => {
  const { user, logout } = useUserStore();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="font-display text-4xl font-bold text-navy-900 mb-4">Join our Style Circle.</h2>
        <p className="font-body text-gray-500 mb-8 max-w-sm">Login or sign up to access your personal digital archive and track orders.</p>
        <Button variant="primary" className="px-12 h-14 uppercase tracking-widest font-black">Login / Sign Up</Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-40 pb-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Sidebar Navigation */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
             <div className="p-10 bg-violet-50/50 rounded-3xl border border-violet-50 text-center flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-violet-800 text-white flex items-center justify-center text-4xl font-display font-bold shadow-xl mb-6">
                  {user.name[0]}
                </div>
                <h2 className="font-display text-3xl font-bold text-navy-900">{user.name}</h2>
                <p className="font-body text-sm text-gray-400 mt-2">{user.email}</p>
                <div className="mt-8 flex gap-3">
                   <Badge variant="outline" className="font-bold border-violet-800 text-violet-800">VIP ELITE</Badge>
                   <Badge variant="outline" className="font-bold border-violet-200 text-violet-400 font-body">MEMBER SINCE '24</Badge>
                </div>
             </div>

             <nav className="flex flex-col">
               {[
                 { label: 'Order History', icon: <ShoppingBag size={18} />, path: '#' },
                 { label: 'Shipping Addresses', icon: <MapPin size={18} />, path: '#' },
                 { label: 'Payment Options', icon: <CreditCard size={18} />, path: '#' },
                 { label: 'Account Settings', icon: <Settings size={18} />, path: '#' },
               ].map((item, idx) => (
                 <Link 
                  key={idx} 
                  to={item.path} 
                  className="flex items-center justify-between p-5 rounded-2xl transition-all hover:bg-violet-50 font-body text-sm font-bold text-navy-900 group"
                 >
                   <div className="flex items-center gap-4">
                      <div className="text-violet-400 group-hover:text-violet-800 transition-colors">{item.icon}</div>
                      {item.label}
                   </div>
                   <ChevronRight size={16} className="text-gray-200 group-hover:text-violet-800 group-hover:translate-x-1 transition-all" />
                 </Link>
               ))}
               <button 
                onClick={logout} 
                className="flex items-center gap-4 p-5 rounded-2xl text-red-500 font-body text-sm font-bold transition-all hover:bg-red-50 mt-10"
               >
                 <LogOut size={18} /> Logout
               </button>
             </nav>
          </aside>

          {/* RIGHT: Content Area */}
          <div className="lg:col-span-9 flex flex-col gap-12">
             <section>
               <div className="flex justify-between items-end mb-10">
                 <h3 className="font-display text-4xl font-black text-navy-900">Recent Orders</h3>
                 <Link to="#" className="text-sm font-bold text-violet-800 border-b border-violet-800 pb-0.5">Explore All</Link>
               </div>
               
               <div className="space-y-6">
                 {mockOrders.map((order, idx) => (
                   <div key={idx} className="bg-white rounded-3xl p-8 border border-violet-50 shadow-sm transition-all hover:shadow-xl hover:border-violet-100 group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                          <p className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-violet-400 mb-1">ORDER ID</p>
                          <h4 className="font-display text-2xl font-bold text-navy-900 uppercase">{order.id}</h4>
                        </div>
                        <div className="flex gap-4">
                           <Badge variant={order.status === 'Delivered' ? 'new' : 'default'} className="h-8 px-6">
                             {order.status.toUpperCase()}
                           </Badge>
                           <Link to={`/track/${order.id}`}>
                             <Button variant="outline" size="sm" className="h-8 px-6 text-[10px] uppercase font-bold tracking-widest group">
                               Track Order
                               <ChevronRight size={10} className="ml-1 group-hover:translate-x-1 transition-transform" />
                             </Button>
                           </Link>
                        </div>
                      </div>

                      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 border-b border-violet-50">
                        {order.items.map((item, i) => (
                          <div key={i} className="w-16 h-20 bg-gray-50 rounded-sm overflow-hidden shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center py-6">
                         <div className="font-body text-gray-500 text-sm">Ordered on <span className="font-bold text-navy-900">{order.date}</span></div>
                         <div className="flex items-center gap-3">
                           <span className="font-body text-xs font-bold text-gray-400 uppercase tracking-widest">Amount Paid</span>
                           <span className="font-display text-2xl font-black text-navy-900">{formatPrice(order.total)}</span>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             </section>

             {/* Personal Discovery */}
             <section className="bg-navy-900 text-white rounded-3xl p-10 lg:p-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-max h-full p-20 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:rotate-6 group-hover:scale-125">
                 <Package size={300} />
                </div>
                <h3 className="font-display text-4xl font-bold mb-6">Need a fresh Look?</h3>
                <p className="font-body text-xl text-violet-200 opacity-80 mb-10 max-w-xl leading-relaxed italic">
                  "Based on your recent aesthetic choices, our AI suggests a mix of neutral bottoms and signature violet outerwear."
                </p>
                <Link to="/shop">
                  <Button className="h-16 px-12 bg-white text-navy-900 hover:bg-violet-50 uppercase tracking-widest font-black text-sm group">
                    Curate My Look
                    <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
             </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
