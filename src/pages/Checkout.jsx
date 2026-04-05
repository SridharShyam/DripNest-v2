import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Truck, ShieldCheck, Check, ChevronRight, 
  ChevronLeft, ArrowRight, Lock, MapPin, Smartphone, Landmark, Banknote, ShoppingBag 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/formatters';
import { Button, Badge } from '../components/ui/Button';
import { clsx } from "clsx";

export const Checkout = () => {
  const [step, setStep] = useState(1);
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();
  const shipping = total > 999 ? 0 : 149;
  const tax = total * 0.12;
  const finalTotal = total + tax + shipping;

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address1: '', address2: '', city: '', state: '', pincode: '',
    saveAddress: true
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handlePlaceOrder = () => {
    // Generate a random order ID
    const orderId = `DN-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    navigate('/order-success', { state: { orderId, total: finalTotal, items, address: formData } });
  };

  const steps = [
    { title: 'Information', icon: <Truck size={18} /> },
    { title: 'Confirmation', icon: <ShieldCheck size={18} /> },
    { title: 'Payment', icon: <CreditCard size={18} /> }
  ];

  if (items.length === 0 && step !== 4) {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="font-display text-4xl font-bold text-navy-900 mb-4">Your bag is empty.</h2>
        <Link to="/shop">
          <Button variant="primary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row">
      {/* LEFT: Checkout Flow */}
      <div className="flex-1 px-6 py-12 lg:px-24 lg:py-20 flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <Link to="/" className="font-display text-3xl font-bold text-violet-800">DRIPNEST</Link>
          <div className="flex items-center gap-2 text-gray-400 font-body text-xs font-bold uppercase tracking-widest sm:block hidden">
            <Lock size={12} className="inline mr-1" /> Secure 256-Bit SSL
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-6 mb-16 overflow-x-auto no-scrollbar">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center gap-4 group shrink-0">
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold font-body transition-all",
                step > idx + 1 ? "bg-green-500 text-white" : step === idx + 1 ? "bg-violet-800 text-white shadow-lg" : "bg-violet-50 text-violet-200"
              )}>
                {step > idx + 1 ? <Check size={18} /> : <span>{idx + 1}</span>}
              </div>
              <span className={clsx(
                "font-body text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
                step === idx + 1 ? "text-navy-900" : "text-gray-300"
              )}>
                {s.title}
              </span>
              {idx < steps.length - 1 && <ChevronRight className="text-gray-100" size={16} />}
            </div>
          ))}
        </div>

        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="font-display text-4xl font-bold text-navy-900 mb-6">Delivery Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-navy-900 uppercase tracking-widest pl-1">First Name</label>
                       <input 
                        type="text" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                        className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 focus:ring-1 focus:ring-violet-800 transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-navy-900 uppercase tracking-widest pl-1">Last Name</label>
                       <input 
                        type="text" 
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                        className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 transition-all"
                       />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-violet-400 mb-6">Contact & Address</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 transition-all" 
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (+91)" 
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 transition-all" 
                    />
                    <input 
                      type="text" 
                      placeholder="Address Line 1" 
                      value={formData.address1}
                      onChange={(e) => setFormData(p => ({ ...p, address1: e.target.value }))}
                      className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 transition-all" 
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <input 
                        type="text" 
                        placeholder="City" 
                        value={formData.city}
                        onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                        className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 transition-all" 
                      />
                      <input 
                        type="text" 
                        placeholder="Pincode" 
                        value={formData.pincode}
                        onChange={(e) => setFormData(p => ({ ...p, pincode: e.target.value }))}
                        className="w-full h-14 bg-white border border-violet-100 rounded-sm px-6 font-body focus:outline-none focus:border-violet-800 transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    size="lg" 
                    className="w-full h-16 uppercase tracking-[0.2em] font-black group"
                    onClick={handleNext}
                    disabled={!formData.email || !formData.address1}
                  >
                    Save & Continue
                    <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="font-display text-4xl font-bold text-navy-900 mb-6">Review Order</h2>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-4 no-scrollbar">
                    {items.map(item => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-violet-50">
                        <div className="w-16 aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-display font-bold text-navy-900 line-clamp-1">{item.name}</p>
                          <p className="font-body text-[10px] font-bold uppercase text-gray-400">Size: {item.size} • Qty: {item.quantity}</p>
                          <p className="font-body font-bold text-violet-800 mt-1">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-violet-50 rounded-2xl">
                   <div className="flex justify-between items-start mb-6">
                     <h3 className="font-display text-xl font-bold text-navy-900">Ship to</h3>
                     <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-violet-800 tracking-widest border-b border-violet-800">Edit</button>
                   </div>
                   <p className="font-body text-sm text-gray-600 leading-relaxed">
                     {formData.firstName} {formData.lastName}<br />
                     {formData.address1}, {formData.city}, {formData.pincode}<br />
                     {formData.phone}
                   </p>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="ghost" className="px-8 h-16 uppercase tracking-widest" onClick={handleBack}>Back</Button>
                  <Button size="lg" className="flex-1 h-16 uppercase tracking-[0.2em] font-black" onClick={handleNext}>Confirm Details</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="font-display text-4xl font-bold text-navy-900 mb-6">Secure Payment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                     <div 
                      onClick={() => setPaymentMethod('card')}
                      className={clsx(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 group",
                        paymentMethod === 'card' ? "border-violet-800 bg-violet-50 shadow-lg" : "border-violet-50 hover:border-violet-200"
                      )}
                    >
                       <div className={clsx("p-3 rounded-xl transition-colors", paymentMethod === 'card' ? "bg-violet-800 text-white" : "bg-white text-gray-400 group-hover:text-violet-800")}>
                        <CreditCard size={24} />
                       </div>
                       <div>
                        <p className="font-body font-bold text-navy-900">Credit / Debit Card</p>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Visa, Mastercard, Amex</p>
                       </div>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('upi')}
                      className={clsx(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 group",
                        paymentMethod === 'upi' ? "border-violet-800 bg-violet-50 shadow-lg" : "border-violet-50 hover:border-violet-200"
                      )}
                    >
                       <div className={clsx("p-3 rounded-xl transition-colors", paymentMethod === 'upi' ? "bg-violet-800 text-white" : "bg-white text-gray-400 group-hover:text-violet-800")}>
                        <Smartphone size={24} />
                       </div>
                       <div>
                        <p className="font-body font-bold text-navy-900">UPI Payments</p>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">GPay, PhonePe, Paytm</p>
                       </div>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('bank')}
                      className={clsx(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 group",
                        paymentMethod === 'bank' ? "border-violet-800 bg-violet-50 shadow-lg" : "border-violet-50 hover:border-violet-200"
                      )}
                    >
                       <div className={clsx("p-3 rounded-xl transition-colors", paymentMethod === 'bank' ? "bg-violet-800 text-white" : "bg-white text-gray-400 group-hover:text-violet-800")}>
                        <Landmark size={24} />
                       </div>
                       <div>
                        <p className="font-body font-bold text-navy-900">Net Banking</p>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">All major banks</p>
                       </div>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('cod')}
                      className={clsx(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 group",
                        paymentMethod === 'cod' ? "border-violet-800 bg-violet-50 shadow-lg" : "border-violet-50 hover:border-violet-200"
                      )}
                    >
                       <div className={clsx("p-3 rounded-xl transition-colors", paymentMethod === 'cod' ? "bg-violet-800 text-white" : "bg-white text-gray-400 group-hover:text-violet-800")}>
                        <Banknote size={24} />
                       </div>
                       <div>
                        <p className="font-body font-bold text-navy-900">Cash on Delivery</p>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Extra ₹49 per order</p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {paymentMethod === 'card' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-navy-900 uppercase tracking-widest pl-1">Card Number</label>
                           <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full h-14 border border-violet-100 rounded-sm px-6 font-body focus:border-violet-800 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <input type="text" placeholder="MM/YY" className="w-full h-14 border border-violet-100 rounded-sm px-6 font-body focus:border-violet-800 outline-none" />
                          <input type="text" placeholder="CVV" className="w-full h-14 border border-violet-100 rounded-sm px-6 font-body focus:border-violet-800 outline-none" />
                        </div>
                      </motion.div>
                    )}
                    {paymentMethod === 'upi' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                         <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full h-14 border border-violet-100 rounded-sm px-6 font-body focus:border-violet-800 outline-none" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="ghost" className="px-8 h-16 uppercase tracking-widest" onClick={handleBack}>Back</Button>
                  <Button size="lg" className="flex-1 h-16 uppercase tracking-[0.2em] font-black group shadow-xl" onClick={handlePlaceOrder}>
                    Pay {formatPrice(finalTotal)}
                    <Lock size={18} className="ml-3" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-auto pt-16 flex items-center gap-8 text-gray-300 font-body text-xs font-bold uppercase tracking-widest">
           <Link to="/" className="hover:text-violet-800 transition-colors">Returns Policy</Link>
           <Link to="/" className="hover:text-violet-800 transition-colors">Privacy Policy</Link>
           <Link to="/" className="hover:text-violet-800 transition-colors">Terms of Service</Link>
        </div>
      </div>

      {/* RIGHT: Order Summary Sticky */}
      <aside className="w-full lg:w-[450px] bg-violet-50/50 p-6 py-12 lg:p-20 border-l border-violet-50 h-max lg:sticky lg:top-0">
        <h3 className="font-display text-3xl font-bold text-navy-900 mb-12 flex items-center gap-3">
          <ShoppingBag className="text-violet-800" size={24} />
          Order Summary
        </h3>

        <div className="space-y-8 mb-12">
          {items.map(item => (
            <div key={`${item.id}-${item.size}`} className="flex gap-6 group">
              <div className="relative w-20 aspect-[3/4] bg-white rounded-sm overflow-hidden shrink-0 shadow-sm border border-black/5">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-violet-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-display font-bold text-navy-900 line-clamp-1">{item.name}</p>
                <p className="font-body text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Size: {item.size} • Color: {item.color}</p>
              </div>
              <div className="font-body font-bold text-navy-900">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-violet-100 mb-8" />

        <div className="space-y-4 font-body font-medium text-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-sm">Subtotal</span>
            <span className="font-bold text-navy-900">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Shipping</span>
            <span className="font-bold text-navy-900">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between items-center text-violet-400">
            <span className="text-sm">Tax (GST)</span>
            <span className="font-bold">{formatPrice(tax)}</span>
          </div>
          <div className="h-px bg-violet-200 mt-4" />
          <div className="flex justify-between items-center text-3xl font-display font-black text-navy-900 pt-4">
            <span>Total</span>
            <span className="text-violet-800">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Promo code hint */}
        <div className="mt-20 p-8 border-2 border-dashed border-violet-100 rounded-3xl text-center group transition-colors hover:border-violet-800">
           <Badge variant="outline" className="mb-4 group-hover:bg-violet-800 group-hover:text-white transition-colors">DRIPNEST EXCLUSIVE</Badge>
           <p className="font-display text-lg font-bold text-navy-900 mb-2">Have a gift card?</p>
           <p className="font-body text-xs text-gray-400 leading-relaxed uppercase tracking-widest">Apply it at the next step for instant discounts.</p>
        </div>
      </aside>
    </div>
  );
};
