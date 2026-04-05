import { Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <span className="font-display text-3xl font-bold tracking-tight text-white mb-6 block">DRIPNEST</span>
            <p className="font-body text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              Where Style Lives. Experience premium fashion curation with a soft violet soul. Built for the modern aesthetic.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="p-2 rounded-full border border-gray-700 hover:border-violet-400 hover:text-violet-400 transition-all">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="p-2 rounded-full border border-gray-700 hover:border-violet-400 hover:text-violet-400 transition-all">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-semibold mb-8 text-violet-200">Shop</h4>
            <ul className="flex flex-col gap-4 font-body text-sm text-gray-400">
              <li><Link to="/shop?gender=men" className="hover:text-violet-100">Men's Collection</Link></li>
              <li><Link to="/shop?gender=women" className="hover:text-violet-100">Women's Collection</Link></li>
              <li><Link to="/shop?tag=new" className="hover:text-violet-100">New Arrivals</Link></li>
              <li><Link to="/shop?tag=sale" className="hover:text-violet-100">Sale Extravaganza</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-semibold mb-8 text-violet-200">Customer Support</h4>
            <ul className="flex flex-col gap-4 font-body text-sm text-gray-400">
              <li><Link to="#" className="hover:text-violet-100">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-violet-100">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-violet-100">Size Guide</Link></li>
              <li><Link to="/track-order" className="hover:text-violet-100">Track Your Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-semibold mb-8 text-violet-200">Get In Touch</h4>
            <ul className="flex flex-col gap-5 font-body text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-violet-400" />
                <span>support@dripnest.in</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-violet-400" />
                <span>+91 91234 56789</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-violet-400" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-sm text-gray-500">© 2024 DripNest. Built with ❤️ in India.</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 py-1 border border-gray-700 rounded">VISA</span>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 py-1 border border-gray-700 rounded">MASTERCARD</span>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 py-1 border border-gray-700 rounded">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
