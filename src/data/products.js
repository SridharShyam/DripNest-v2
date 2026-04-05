export const products = [
  // WOMEN - Outerwear
  {
    id: "DN001",
    name: "Lavender Linen Blazer",
    brand: "DripNest Studio",
    category: "outerwear",
    gender: "women",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#7F77DD", "#FFFFFF", "#2C2C2A"],
    inStock: true,
    isNew: true,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["blazer", "formal", "summer"],
    description: "A tailored linen blazer in our signature lavender, perfect for high-fashion layering."
  },
  {
    id: "DN002",
    name: "Classic Beige Trench",
    brand: "DripNest Luxe",
    category: "outerwear",
    gender: "women",
    price: 5999,
    originalPrice: null,
    rating: 4.9,
    reviews: 56,
    sizes: ["S", "M", "L"],
    colors: ["#E5D3B3", "#2C2C2A"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ed3b3cb75?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["trench", "classic", "seasonal"],
    description: "An iconic trench coat designed for the modern woman who values timeless elegance."
  },
  
  // WOMEN - Dresses
  {
    id: "DN003",
    name: "Violet Silk Slip Dress",
    brand: "DripNest Studio",
    category: "dresses",
    gender: "women",
    price: 2499,
    originalPrice: 3299,
    rating: 4.7,
    reviews: 89,
    sizes: ["XS", "S", "M"],
    colors: ["#7F77DD", "#3C3489"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1539008835158-303027c95b0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["dress", "silk", "evening"],
    description: "Flowy, elegant, and ethereal. This pure silk dress captures the essence of Digital Lavender."
  },
  {
    id: "DN004",
    name: "Midnight Floral Maxi",
    brand: "Urban Glow",
    category: "dresses",
    gender: "women",
    price: 1899,
    originalPrice: null,
    rating: 4.5,
    reviews: 42,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#26215C", "#000000"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["maxi", "floral", "boho"],
    description: "Breathtaking floral patterns on a deep violet canvas. Ideal for brunch or beach sunsets."
  },
  {
    id: "DN005",
    name: "Lilac Wrap Dress",
    brand: "DripNest Studio",
    category: "dresses",
    gender: "women",
    price: 2199,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 67,
    sizes: ["M", "L", "XL"],
    colors: ["#AFA9EC"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["wrap", "soft", "daily"],
    description: "A comfortable wrap dress in soft lilac jersey. Flattering for every silhouette."
  },
  {
    id: "DN006",
    name: "Emerald Satin Mini",
    brand: "Luxe Flora",
    category: "dresses",
    gender: "women",
    price: 1599,
    originalPrice: null,
    rating: 4.4,
    reviews: 31,
    sizes: ["XS", "S", "M"],
    colors: ["#004B49"],
    inStock: false,
    isNew: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ed3b3cb75?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["mini", "satin", "party"],
    description: "Dazzle in this emerald satin mini dress. Perfect for cocktail nights."
  },
  
  // WOMEN - Tops
  {
    id: "DN007",
    name: "Oversized Cotton Tee",
    brand: "DripNest Essentials",
    category: "tops",
    gender: "women",
    price: 899,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 210,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#2C2C2A", "#CECBF6"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["tee", "casual", "basic"],
    description: "Premium heavy-weight cotton tee with a perfect oversized drop-shoulder fit."
  },
  {
    id: "DN008",
    name: "Knitted Halter Top",
    brand: "Urban Glow",
    category: "tops",
    gender: "women",
    price: 1299,
    originalPrice: null,
    rating: 4.6,
    reviews: 45,
    sizes: ["XS", "S", "M"],
    colors: ["#7F77DD", "#EEEDFE"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["knit", "crop", "summer"],
    description: "Chic knitted halter top in Digital Lavender. A summer must-have."
  },
  {
    id: "DN009",
    name: "Sheer Organza Blouse",
    brand: "DripNest Luxe",
    category: "tops",
    gender: "women",
    price: 1799,
    originalPrice: null,
    rating: 4.7,
    reviews: 28,
    sizes: ["S", "M", "L"],
    colors: ["#FFFFFF", "#AFA9EC"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["blouse", "sheer", "office"],
    description: "Sophisticated organza blouse with detailed cuffs. Elevate your formal wear."
  },
  {
    id: "DN010",
    name: "Cropped Hoodie",
    brand: "Athleisure X",
    category: "tops",
    gender: "women",
    price: 1499,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 156,
    sizes: ["S", "M", "L"],
    colors: ["#2C2C2A", "#534AB7"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["hoodie", "sporty", "crop"],
    description: "Soft fleece cropped hoodie. Cozy enough for home, cool enough for the streets."
  },

  // WOMEN - Bottoms
  {
    id: "DN011",
    name: "High-Waist Wide Legs",
    brand: "DripNest Studio",
    category: "bottoms",
    gender: "women",
    price: 1999,
    originalPrice: null,
    rating: 4.8,
    reviews: 74,
    sizes: ["26", "28", "30", "32"],
    colors: ["#FFFFFF", "#2C2C2A"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["wide-leg", "formal", "linen"],
    description: "Tailored wide-leg trousers that elongate the silhouette. Pairs perfectly with our linen blazer."
  },
  {
    id: "DN012",
    name: "Pleated Midi Skirt",
    brand: "Luxe Flora",
    category: "bottoms",
    gender: "women",
    price: 1699,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 53,
    sizes: ["S", "M", "L"],
    colors: ["#AFA9EC", "#7F77DD"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["skirt", "midi", "pleated"],
    description: "Shiny sateen pleated skirt. Moves beautifully with every step."
  },
  
  // MEN - Tops
  {
    id: "DN013",
    name: "Heather Violet Polo",
    brand: "DripNest Men",
    category: "tops",
    gender: "men",
    price: 1299,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 312,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#7F77DD", "#3C3489"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["polo", "casual", "cotton"],
    description: "Premium piqué cotton polo in a sophisticated violet shade."
  },
  {
    id: "DN014",
    name: "Boxy Graphic Tee",
    brand: "Urban Edge",
    category: "tops",
    gender: "men",
    price: 999,
    originalPrice: null,
    rating: 4.4,
    reviews: 145,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#2C2C2A", "#FFFFFF"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["graphic", "streetwear", "boxy"],
    description: "Concrete-inspired graphic on a heavy boxy tee. Pure streetwear soul."
  },
  {
    id: "DN015",
    name: "Linen Relaxed Shirt",
    brand: "DripNest Luxe",
    category: "tops",
    gender: "men",
    price: 2199,
    originalPrice: null,
    rating: 4.9,
    reviews: 67,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#FFFFFF", "#CECBF6", "#E5D3B3"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["shirt", "linen", "summer"],
    description: "Breathable Italian linen shirt with a relaxed mandarin collar."
  },
  {
    id: "DN016",
    name: "Chunky Knit Sweater",
    brand: "DripNest Men",
    category: "tops",
    gender: "men",
    price: 2899,
    originalPrice: 3899,
    rating: 4.7,
    reviews: 42,
    sizes: ["M", "L", "XL"],
    colors: ["#3C3489", "#26215C"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["sweater", "knit", "winter"],
    description: "Warm, heavy-gauge knit sweater for those cozy winter evenings."
  },
  {
    id: "DN017",
    name: "Utility Overshirt",
    brand: "Urban Edge",
    category: "tops",
    gender: "men",
    price: 2499,
    originalPrice: null,
    rating: 4.5,
    reviews: 58,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2C2C2A", "#534AB7"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["overshirt", "utility", "outerwear"],
    description: "Multi-pocket durable cotton overshirt. Rugged yet refined."
  },

  // MEN - Bottoms
  {
    id: "DN018",
    name: "Slim Fit Chinos",
    brand: "DripNest Essentials",
    category: "bottoms",
    gender: "men",
    price: 1899,
    originalPrice: null,
    rating: 4.6,
    reviews: 423,
    sizes: ["30", "32", "34", "36"],
    colors: ["#2C2C2A", "#E5D3B3", "#3C3489"],
    inStock: true,
    isNew: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["chinos", "slim-fit", "workwear"],
    description: "Classic stretch-cotton chinos with a precision slim-fit cut."
  },
  {
    id: "DN019",
    name: "Relaxed Cargo Pants",
    brand: "Urban Edge",
    category: "bottoms",
    gender: "men",
    price: 2299,
    originalPrice: 2899,
    rating: 4.4,
    reviews: 89,
    sizes: ["M", "L", "XL"],
    colors: ["#2C2C2A", "#534AB7"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["cargo", "relaxed", "streetwear"],
    description: "Modernized cargos with tapered ankles and deep utility pockets."
  },
  {
    id: "DN020",
    name: "Technical Joggers",
    brand: "Athleisure X",
    category: "bottoms",
    gender: "men",
    price: 1699,
    originalPrice: null,
    rating: 4.7,
    reviews: 134,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#26215C", "#000000"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://source.unsplash.com/600x800/?mens,trousers,fashion&sig=DN020a",
      "https://source.unsplash.com/600x800/?mens,trousers,fashion&sig=DN020b"
    ],
    tags: ["joggers", "techwear", "active"],
    description: "Water-repellent technical joggers for the active urbanite."
  },
  
  // MEN - Outerwear
  {
    id: "DN021",
    name: "Biker Leather Jacket",
    brand: "DripNest Luxe",
    category: "outerwear",
    gender: "men",
    price: 7999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 34,
    sizes: ["M", "L", "XL"],
    colors: ["#2C2C2A"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["leather", "jacket", "biker"],
    description: "Grained faux-leather jacket with heavy metal hardware. A rock-and-roll classic."
  },
  {
    id: "DN022",
    name: "Padded Puffer Vest",
    brand: "Urban Glow",
    category: "outerwear",
    gender: "men",
    price: 3499,
    originalPrice: null,
    rating: 4.6,
    reviews: 21,
    sizes: ["S", "M", "L"],
    colors: ["#534AB7", "#7F77DD"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["vest", "puffer", "layering"],
    description: "Lightweight yet warm puffer vest. Perfect for transitional weather."
  },

  // ACCESSORIES
  {
    id: "DN023",
    name: "Signature Violet Tote",
    brand: "DripNest Luxe",
    category: "accessories",
    gender: "unisex",
    price: 1299,
    originalPrice: null,
    rating: 4.8,
    reviews: 56,
    sizes: ["OS"],
    colors: ["#7F77DD"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["bag", "tote", "exclusive"],
    description: "Our signature tote featuring the DripNest monogram in Digital Lavender."
  },
  {
    id: "DN024",
    name: "Retro Rectangular Sunnies",
    brand: "Urban Edge",
    category: "accessories",
    gender: "unisex",
    price: 899,
    originalPrice: 1499,
    rating: 4.5,
    reviews: 82,
    sizes: ["OS"],
    colors: ["#000000", "#7F77DD"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1511499767390-a7390324838b?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["sunglasses", "retro", "eyewear"],
    description: "90s-inspired rectangular sunglasses with tinted lenses."
  },
  {
    id: "DN025",
    name: "Bucket Hat",
    brand: "Athleisure X",
    category: "accessories",
    gender: "unisex",
    price: 699,
    originalPrice: null,
    rating: 4.3,
    reviews: 45,
    sizes: ["S/M", "L/XL"],
    colors: ["#FFFFFF", "#2C2C2A", "#7F77DD"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1588632657545-42cf6f76c000?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["hat", "streetwear", "summer"],
    description: "Reversible bucket hat for multiple styling options."
  },
  {
    id: "DN026",
    name: "Leather Minimalist Belt",
    brand: "DripNest Men",
    category: "accessories",
    gender: "men",
    price: 1199,
    originalPrice: null,
    rating: 4.7,
    reviews: 112,
    sizes: ["32", "34", "36", "38"],
    colors: ["#2C2C2A", "#4A4A4A"],
    inStock: true,
    isNew: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["belt", "leather", "formal"],
    description: "Full-grain leather belt with a brushed steel buckle."
  },
  {
    id: "DN027",
    name: "Silk Scarf",
    brand: "Luxe Flora",
    category: "accessories",
    gender: "women",
    price: 1499,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 34,
    sizes: ["OS"],
    colors: ["#CECBF6", "#AFA9EC"],
    inStock: true,
    isNew: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["scarf", "silk", "luxury"],
    description: "Hand-rolled silk scarf with abstract violet-hued prints."
  },
  {
    id: "DN028",
    name: "Beanie Hat",
    brand: "Urban Glow",
    category: "accessories",
    gender: "unisex",
    price: 599,
    originalPrice: null,
    rating: 4.4,
    reviews: 67,
    sizes: ["OS"],
    colors: ["#3C3489", "#2C2C2A"],
    inStock: true,
    isNew: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d510e10?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["beanie", "knit", "winter"],
    description: "Soft ribbed-knit beanie for maximum warmth and style."
  },

  // ADDING MORE FOR TOTAL 40+
  // WOMEN TOPS/DRESSES
  { id: "DN029", name: "Satin Camisole", brand: "Luxe Flora", category: "tops", gender: "women", price: 799, originalPrice: 1199, rating: 4.2, reviews: 145, sizes: ["S","M","L"], colors: ["#FFFFFF","#000000","#7F77DD"], inStock: true, isNew: false, isSale: true, images: ["https://source.unsplash.com/600x800/?womens,blouse,fashion&sig=DN029a", "https://source.unsplash.com/600x800/?womens,blouse,fashion&sig=DN029b"], description: "Elegant satin camisole with lace trim." },
  { id: "DN030", name: "Denim Jacket", brand: "Urban Glow", category: "outerwear", gender: "women", price: 2999, originalPrice: null, rating: 4.6, reviews: 88, sizes: ["S","M","L"], colors: ["#7F77DD"], inStock: true, isNew: true, isSale: false, images: ["https://source.unsplash.com/600x800/?womens,jacket,fashion&sig=DN030a", "https://source.unsplash.com/600x800/?womens,jacket,fashion&sig=DN030b"], description: "Classic denim jacket with a modern violet wash." },
  { id: "DN031", name: "Leather Trousers", brand: "DripNest Luxe", category: "bottoms", gender: "women", price: 4599, originalPrice: null, rating: 4.8, reviews: 42, sizes: ["26","28","30"], colors: ["#2C2C2A"], inStock: true, isNew: true, isSale: false, images: ["https://source.unsplash.com/600x800/?womens,skirt,fashion&sig=DN031a", "https://source.unsplash.com/600x800/?womens,skirt,fashion&sig=DN031b"], description: "Tailored vegan leather trousers in midnight violet." },
  { id: "DN032", name: "Ribbed Bodycon", brand: "Urban Glow", category: "dresses", gender: "women", price: 1299, originalPrice: 1899, rating: 4.4, reviews: 156, sizes: ["XS","S","M"], colors: ["#3C3489","#7F77DD"], inStock: true, isNew: false, isSale: true, images: ["https://source.unsplash.com/600x800/?womens,dress,fashion&sig=DN032a", "https://source.unsplash.com/600x800/?womens,dress,fashion&sig=DN032b"], description: "Stretchy ribbed bodycon dress for all-day comfort." },
  
  // MEN TOPS/BOTTOMS
  { id: "DN033", name: "V-Neck Cashmere", brand: "DripNest Men", category: "tops", gender: "men", price: 5499, originalPrice: null, rating: 5.0, reviews: 12, sizes: ["M","L","XL"], colors: ["#534AB7"], inStock: true, isNew: true, isSale: false, images: ["https://source.unsplash.com/600x800/?mens,shirt,fashion&sig=DN033a", "https://source.unsplash.com/600x800/?mens,shirt,fashion&sig=DN033b"], description: "Pure cashmere V-neck sweater. Unmatched softness." },
  { id: "DN034", name: "Striped Oxford", brand: "DripNest Luxe", category: "tops", gender: "men", price: 1999, originalPrice: 2499, rating: 4.5, reviews: 210, sizes: ["S","M","L","XL"], colors: ["#FFFFFF","#CECBF6"], inStock: true, isNew: false, isSale: true, images: ["https://source.unsplash.com/600x800/?mens,shirt,fashion&sig=DN034a", "https://source.unsplash.com/600x800/?mens,shirt,fashion&sig=DN034b"], description: "Classic striped Oxford shirt for a crisp look." },
  { id: "DN035", name: "Skinny Biker Jeans", brand: "Urban Edge", category: "bottoms", gender: "men", price: 3499, originalPrice: null, rating: 4.7, reviews: 92, sizes: ["30","32","34"], colors: ["#2C2C2A"], inStock: true, isNew: true, isSale: false, images: ["https://source.unsplash.com/600x800/?mens,trousers,fashion&sig=DN035a", "https://source.unsplash.com/600x800/?mens,trousers,fashion&sig=DN035b"], description: "Distressed skinny jeans with ribbed biker details." },
  { id: "DN036", name: "Sweat Shorts", brand: "Athleisure X", category: "bottoms", gender: "men", price: 1199, originalPrice: 1499, rating: 4.3, reviews: 67, sizes: ["M","L","XL"], colors: ["#CECBF6","#2C2C2A"], inStock: true, isNew: false, isSale: true, images: ["https://source.unsplash.com/600x800/?mens,trousers,fashion&sig=DN036a", "https://source.unsplash.com/600x800/?mens,trousers,fashion&sig=DN036b"], description: "Soft loopback cotton sweat shorts." },
  
  // ACCESSORIES & MISC
  { id: "DN037", name: "Violet Canvas Sneakers", brand: "Athleisure X", category: "shoes", gender: "unisex", price: 3299, originalPrice: null, rating: 4.6, reviews: 45, sizes: ["7","8","9","10","11"], colors: ["#7F77DD"], inStock: true, isNew: true, isSale: false, images: ["https://source.unsplash.com/600x800/?fashion,sneakers,shoes&sig=DN037a", "https://source.unsplash.com/600x800/?fashion,sneakers,shoes&sig=DN037b"], description: "High-top canvas sneakers in signature violet." },
  { id: "DN038", name: "Leather Weekend Bag", brand: "DripNest Luxe", category: "accessories", gender: "unisex", price: 6999, originalPrice: 8999, rating: 4.9, reviews: 18, sizes: ["OS"], colors: ["#2C2C2A"], inStock: true, isNew: false, isSale: true, images: ["https://source.unsplash.com/600x800/?fashion,accessories,bag&sig=DN038a", "https://source.unsplash.com/600x800/?fashion,accessories,bag&sig=DN038b"], description: "Spacious luxury weekend bag in pebbled leather." },
  { id: "DN039", name: "Gold Chain Necklace", brand: "Luxe Flora", category: "accessories", gender: "women", price: 1899, originalPrice: null, rating: 4.7, reviews: 34, sizes: ["OS"], colors: ["#FFD700"], inStock: true, isNew: true, isSale: false, images: ["https://source.unsplash.com/600x800/?fashion,accessories,bag&sig=DN039a", "https://source.unsplash.com/600x800/?fashion,accessories,bag&sig=DN039b"], description: "18k gold-plated chunky chain necklace." },
  { id: "DN040", name: "Minimalist Watch", brand: "DripNest Men", category: "accessories", gender: "men", price: 4999, originalPrice: 6499, rating: 4.8, reviews: 25, sizes: ["OS"], colors: ["#2C2C2A","#FFFFFF"], inStock: true, isNew: false, isSale: true, images: ["https://source.unsplash.com/600x800/?fashion,accessories,bag&sig=DN040a", "https://source.unsplash.com/600x800/?fashion,accessories,bag&sig=DN040b"], description: "Sleek minimalist watch with a sapphire crystal face." }
];
