export interface MenuItem {
  id: string;
  name: string;
  category: "Starters" | "Main Course" | "Breads" | "Beverages" | "Desserts";
  description: string;
  price: number;
  rating: number;
  reviews: number;
  type: "Veg" | "Non-Veg";
  prepTime: string;
  calories: string;
  protein: string;
  spice: "Mild" | "Medium" | "Hot";
  image: string;
  popular?: boolean;
  chefRecommend?: boolean;
  recommendReason?: string;
  ingredients: string[];
}

export interface ComboDeal {
  id: string;
  name: string;
  items: string[];
  originalPrice: number;
  comboPrice: number;
  saving: number;
  image: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const CATEGORIES = ["All", "Starters", "Main Course", "Breads", "Beverages", "Desserts", "Chef's Special"] as const;

export const FILTERS_LIST = ["Veg", "Spicy", "Popular", "Under ₹150"] as const;

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS (4 items)
  {
    id: "s1",
    name: "Paneer Tikka",
    category: "Starters",
    description: "Clay-oven roasted cottage cheese cubes marinated in aromatic spices and yogurt.",
    price: 249,
    rating: 4.8,
    reviews: 210,
    type: "Veg",
    prepTime: "12 mins",
    calories: "340 kcal",
    protein: "14g",
    spice: "Hot",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: true,
    recommendReason: "Our signature clay-oven recipe passed down generations.",
    ingredients: ["Cottage Cheese", "Bell Peppers", "Spiced Yogurt Marinade", "Lemon Juice"]
  },
  {
    id: "s2",
    name: "Hara Bhara Kebab",
    category: "Starters",
    description: "Pan-fried patties of spinach, green peas, mashed potatoes, and mild spices.",
    price: 199,
    rating: 4.5,
    reviews: 95,
    type: "Veg",
    prepTime: "10 mins",
    calories: "210 kcal",
    protein: "6g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Spinach", "Green Peas", "Potatoes", "Spices", "Cashew Garnish"]
  },
  {
    id: "s3",
    name: "Veg Spring Roll",
    category: "Starters",
    description: "Crispy fried wraps packed with stir-fried seasonal vegetables and glass noodles.",
    price: 179,
    rating: 4.4,
    reviews: 80,
    type: "Veg",
    prepTime: "8 mins",
    calories: "180 kcal",
    protein: "4g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Cabbage", "Carrots", "Bell Peppers", "Soy Sauce Wrapper"]
  },
  {
    id: "s4",
    name: "Tandoori Mushroom",
    category: "Starters",
    description: "Whole fresh mushrooms skewered and roasted with an intense tandoori marinade.",
    price: 229,
    rating: 4.6,
    reviews: 115,
    type: "Veg",
    prepTime: "15 mins",
    calories: "190 kcal",
    protein: "8g",
    spice: "Medium",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: true,
    recommendReason: "Stuffed with cheese and spinach before roasting.",
    ingredients: ["Button Mushrooms", "Processed Cheese", "Spinach", "Tandoori Masala"]
  },

  // MAIN COURSE (6 items)
  {
    id: "m1",
    name: "Butter Paneer Masala",
    category: "Main Course",
    description: "Rich cream-infused tomato gravy layered over melt-in-the-mouth cottage cheese.",
    price: 299,
    rating: 4.9,
    reviews: 540,
    type: "Veg",
    prepTime: "15 mins",
    calories: "450 kcal",
    protein: "16g",
    spice: "Medium",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: false,
    ingredients: ["Premium Paneer", "Fresh Cream", "Cashews", "Tomato Paste", "Kasturi Methi"]
  },
  {
    id: "m2",
    name: "Dal Makhani",
    category: "Main Course",
    description: "Slow-cooked black lentils simmered overnight with cream, butter, and light charcoal smoke.",
    price: 269,
    rating: 4.9,
    reviews: 480,
    type: "Veg",
    prepTime: "20 mins",
    calories: "380 kcal",
    protein: "12g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: true,
    recommendReason: "Simmered continuously for 24 hours on active coal pits.",
    ingredients: ["Black Lentils", "Kidney Beans", "White Butter", "Charcoal Aroma"]
  },
  {
    id: "m3",
    name: "Paneer Lababdar",
    category: "Main Course",
    description: "Luscious cottage cheese in a chunky onion-tomato gravy with grated paneer highlights.",
    price: 319,
    rating: 4.7,
    reviews: 165,
    type: "Veg",
    prepTime: "15 mins",
    calories: "430 kcal",
    protein: "15g",
    spice: "Medium",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: true,
    recommendReason: "Sweeter and chunkier texture than standard gravies.",
    ingredients: ["Grated Paneer Cubes", "Melon Seeds", "Kashmiri Chilli", "Butter"]
  },
  {
    id: "m4",
    name: "Kadai Paneer",
    category: "Main Course",
    description: "Fresh cottage cheese cooked with freshly ground whole spices and crunchy bell peppers.",
    price: 289,
    rating: 4.6,
    reviews: 130,
    type: "Veg",
    prepTime: "12 mins",
    calories: "390 kcal",
    protein: "14g",
    spice: "Hot",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Paneer", "Freshly Ground Kadai Masala", "Capsicum", "Onion Petals"]
  },
  {
    id: "m5",
    name: "Malai Kofta",
    category: "Main Course",
    description: "Velvety potato-cheese dumplings submerged in a mild cashew-based yellow curry.",
    price: 329,
    rating: 4.8,
    reviews: 290,
    type: "Veg",
    prepTime: "18 mins",
    calories: "490 kcal",
    protein: "10g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: true,
    recommendReason: "Stuffed with golden raisins and slivered almonds.",
    ingredients: ["Paneer Kofta Dumplings", "Cashew Nuts Cream", "Mawa", "Cardamom Aroma"]
  },
  {
    id: "m6",
    name: "Dum Aloo Kashmiri",
    category: "Main Course",
    description: "Crispy baby potatoes slowly simmered in a yogurt-based spicy fennel flavored gravy.",
    price: 259,
    rating: 4.4,
    reviews: 75,
    type: "Veg",
    prepTime: "15 mins",
    calories: "320 kcal",
    protein: "5g",
    spice: "Hot",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Deep-fried Potatoes", "Kashmiri Chili Paste", "Fennel Powder", "Curd Sauce"]
  },

  // BREADS (4 items)
  {
    id: "b1",
    name: "Garlic Naan",
    category: "Breads",
    description: "Leavened flatbread brushed with garlic butter and fresh cilantro, clay oven roasted.",
    price: 79,
    rating: 4.8,
    reviews: 420,
    type: "Veg",
    prepTime: "5 mins",
    calories: "160 kcal",
    protein: "5g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: false,
    ingredients: ["Refined Flour", "Minced Garlic", "Butter Glaze", "Fresh Coriander"]
  },
  {
    id: "b2",
    name: "Butter Naan",
    category: "Breads",
    description: "Fluffy white flour bread stretched by hand and baked to golden brown, dripping in butter.",
    price: 69,
    rating: 4.7,
    reviews: 310,
    type: "Veg",
    prepTime: "5 mins",
    calories: "180 kcal",
    protein: "5g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Refined Flour", "Pure Ghee", "Butter Pool"]
  },
  {
    id: "b3",
    name: "Tandoori Roti",
    category: "Breads",
    description: "Whole wheat rustic flatbread roasted fresh on hot tandoor clay walls.",
    price: 39,
    rating: 4.5,
    reviews: 190,
    type: "Veg",
    prepTime: "4 mins",
    calories: "90 kcal",
    protein: "3g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Whole Wheat Flour", "Water", "Optional Butter Coat"]
  },
  {
    id: "b4",
    name: "Lachha Paratha",
    category: "Breads",
    description: "Crispy, multi-layered whole wheat flatbread made with a unique folding technique.",
    price: 75,
    rating: 4.6,
    reviews: 110,
    type: "Veg",
    prepTime: "6 mins",
    calories: "220 kcal",
    protein: "4g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: false,
    ingredients: ["Atta Wheat", "Ghee Layers", "Toasted Sesame Seeds"]
  },

  // BEVERAGES (4 items)
  {
    id: "v1",
    name: "Mango Lassi",
    category: "Beverages",
    description: "Thick sweet yogurt drink blended beautifully with premium Alphonso mango pulp.",
    price: 119,
    rating: 4.9,
    reviews: 380,
    type: "Veg",
    prepTime: "5 mins",
    calories: "280 kcal",
    protein: "7g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: false,
    ingredients: ["Alphonso Mango", "Chilled Curd", "Green Cardamom", "Pistachio Slivers"]
  },
  {
    id: "v2",
    name: "Masala Chaas",
    category: "Beverages",
    description: "Light salted buttermilk mixed with fresh mint, coriander, ginger, and roasted cumin.",
    price: 79,
    rating: 4.6,
    reviews: 120,
    type: "Veg",
    prepTime: "3 mins",
    calories: "80 kcal",
    protein: "3g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Buttermilk", "Rock Salt", "Cumin Dust", "Fresh Mint Leaf"]
  },
  {
    id: "v3",
    name: "Cold Coffee",
    category: "Beverages",
    description: "Rich, creamy milk blended with premium roasted espresso and fresh vanilla bean gelato.",
    price: 139,
    rating: 4.5,
    reviews: 98,
    type: "Veg",
    prepTime: "5 mins",
    calories: "320 kcal",
    protein: "6g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Arabica Beans", "Full Cream Milk", "Vanilla Scoop", "Cocoa Powder"]
  },
  {
    id: "v4",
    name: "Fresh Lime Soda",
    category: "Beverages",
    description: "Squeezed lime extract blended with carbonated tonic water, choice of sweet or salty.",
    price: 89,
    rating: 4.4,
    reviews: 140,
    type: "Veg",
    prepTime: "3 mins",
    calories: "90 kcal",
    protein: "0g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Fresh Lime Juice", "Soda", "Mint Sprigs", "Rock Salt Syrup"]
  },

  // DESSERTS (4 items)
  {
    id: "d1",
    name: "Gulab Jamun",
    category: "Desserts",
    description: "Warm, soft milk dumplings soaked deeply in saffron-cardamom flavored sugar syrup.",
    price: 99,
    rating: 4.8,
    reviews: 450,
    type: "Veg",
    prepTime: "4 mins",
    calories: "310 kcal",
    protein: "5g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: false,
    ingredients: ["Khoa", "Saffron Sugar Syrup", "Rose Water", "Silver Vark"]
  },
  {
    id: "d2",
    name: "Rasmalai",
    category: "Desserts",
    description: "Spongy cottage cheese patties immersed in rich saffron cardamom thickened milk.",
    price: 129,
    rating: 4.9,
    reviews: 390,
    type: "Veg",
    prepTime: "4 mins",
    calories: "270 kcal",
    protein: "8g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600",
    popular: true,
    chefRecommend: true,
    recommendReason: "Sourced with raw cow milk from organic farms.",
    ingredients: ["Chenna Discs", "Rabri Milk Base", "Almond Slivers", "Saffron strands"]
  },
  {
    id: "d3",
    name: "Gajar Halwa",
    category: "Desserts",
    description: "Slow-grated sweet carrots cooked beautifully with pure ghee, whole milk, and dry fruits.",
    price: 119,
    rating: 4.7,
    reviews: 210,
    type: "Veg",
    prepTime: "6 mins",
    calories: "350 kcal",
    protein: "4g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Red Carrots", "Desi Ghee", "Mawa Cream", "Cashews & Raisins"]
  },
  {
    id: "d4",
    name: "Kulfi",
    category: "Desserts",
    description: "Traditional dense Indian ice cream infused with rich pistachio chunks and saffron.",
    price: 99,
    rating: 4.6,
    reviews: 130,
    type: "Veg",
    prepTime: "4 mins",
    calories: "220 kcal",
    protein: "5g",
    spice: "Mild",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600",
    popular: false,
    chefRecommend: false,
    ingredients: ["Concentrated Milk", "Pistachios", "Almonds", "Rosewater Essence"]
  }
];

export const COMBO_DEALS: ComboDeal[] = [
  {
    id: "c1",
    name: "Paneer Combo Single",
    items: ["Butter Paneer Masala", "Garlic Naan", "Fresh Lime Soda"],
    originalPrice: 467,
    comboPrice: 399,
    saving: 68,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "c2",
    name: "Royal Feast (For 2)",
    items: ["Paneer Lababdar", "Dal Makhani", "2 Garlic Naan", "2 Mango Lassi"],
    originalPrice: 945,
    comboPrice: 799,
    saving: 146,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600"
  }
];

export const REVIEW_ITEMS: ReviewItem[] = [
  {
    name: "Aarav Sharma",
    rating: 5,
    text: "Absolutely stunning Butter Paneer! Tastes incredibly authentic and premium. Delivered to our table in just 10 mins.",
    date: "Today, Table 4"
  },
  {
    name: "Ananya Mehta",
    rating: 5,
    text: "The Dal Makhani is phenomenal. Love the smokiness! Easy QR ordering process, very smooth UI design.",
    date: "Yesterday, Table 12"
  },
  {
    name: "Rohan Patel",
    rating: 4,
    text: "Very fresh Paneer Tikka. Best presentation I have seen in a casual fine dining setup.",
    date: "2 days ago, Table 9"
  }
];