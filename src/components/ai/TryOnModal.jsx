import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Camera, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

export const TryOnModal = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-4xl"
          >
            <div className="p-8 border-b border-violet-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="text-violet-800" size={24} />
                <h3 className="font-display text-2xl font-bold text-navy-900">AI Virtual Try-On</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-violet-50 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 text-center">
              {step === 1 ? (
                <>
                  <div className="aspect-video bg-violet-50 rounded-2xl border-2 border-dashed border-violet-200 flex flex-col items-center justify-center mb-8 group cursor-pointer hover:bg-violet-100 transition-all overflow-hidden relative">
                     <ImageIcon size={48} className="text-violet-200 mb-4 group-hover:scale-110 transition-transform" />
                     <p className="font-body text-navy-900/60 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
                       {loading ? 'Processing through AI models...' : 'Upload your photo or drag and drop'}
                     </p>
                     {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                           <Loader2 size={32} className="animate-spin text-violet-800" />
                        </div>
                     )}
                  </div>
                  <h4 className="font-display text-2xl font-bold text-navy-900 mb-4 tracking-tight leading-tight">See how {product.name} looks on you.</h4>
                  <p className="font-body text-gray-500 mb-10 max-w-sm mx-auto">Our AI engine will map the garment onto your figure for a realistic preview of size and fit.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" size="lg" className="px-10" onClick={handleUpload} disabled={loading}>
                      <Camera size={18} className="mr-2" /> Upload Photo
                    </Button>
                    <Button variant="outline" size="lg" className="px-10" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img src="https://picsum.photos/seed/person-demo/600/600" alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                       <Badge variant="new" className="bg-green-500 text-white border-none shadow-lg">98% FIT PRECISION</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-navy-900 mb-2">Looks Amazing! ✨</h4>
                    <p className="font-body text-gray-500">Based on your upload, size <span className="font-bold text-violet-800">M</span> would be a perfect fit.</p>
                  </div>
                  <div className="pt-6">
                    <Button variant="primary" size="lg" className="w-full h-16 uppercase tracking-widest font-black" onClick={onClose}>
                      <Check size={18} className="mr-2" /> Got It
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-6 bg-violet-50/50 flex justify-center border-t border-violet-50/50">
               <p className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 Privacy first: Photos are processed locally and never stored. <ShieldCheck size={12} />
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ShieldCheck = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
