"use client";

import React, { useState, useMemo, useEffect, createContext, useContext } from "react";
import { 
  Search, 
  Star, 
  Clock, 
  Utensils, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Coins, 
  ChevronRight, 
  X, 
  AlertCircle,
  ChevronLeft,
  Bell,
  CheckCircle2,
  Users,
  Timer,
  ShoppingBag,
  Flame,
  Volume2
} from "lucide-react";

const CATEGORIES = ["All", "Starters", "Main Course", "Breads", "Beverages", "Desserts", "Chef's Special"] as const;

const FALLBACK_MENU_ITEMS = [
  // STARTERS
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

  // MAIN COURSE
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

  // BREADS
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

  // BEVERAGES
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
  }
];

const COMBO_DEALS = [
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

const INITIAL_REVIEWS = [
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
  }
];

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
  prepTime: string;
}

export interface KdsOrder {
  id: string;
  sessionId?: string | null;
  table: string;
  items: CartItem[];
  notes: string;
  subtotal: number;
  gst: number;
  grandTotal: number;
  prepStage: number; // 0: Transmitted, 1: Prep, 2: Cooking, 3: Dispatched
  time: string;
  timestamp: number;
  priority: 'Normal' | 'Rush' | 'VIP';
  completedDishes: Record<string, boolean>; // Tracks individual dish items prepped in KDS
}

export interface StaffAlert {
  id: string;
  table: string;
  reason: string;
  time: string;
  resolved: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  gstValue: number;
  serviceCharge: number;
  cartGrandTotal: number;
  cartNotes: string;
  setCartNotes: (notes: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartNotes, setCartNotes] = useState<string>("");

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1, image: item.image, type: item.type, prepTime: item.prepTime }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevCart.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartNotes("");
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const gstValue = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal]);
  const serviceCharge = useMemo(() => (cartSubtotal > 0 ? 25 : 0), [cartSubtotal]);
  const cartGrandTotal = useMemo(() => cartSubtotal + gstValue + serviceCharge, [
    cartSubtotal,
    gstValue,
    serviceCharge,
  ]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartSubtotal,
        gstValue,
        serviceCharge,
        cartGrandTotal,
        cartNotes,
        setCartNotes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a global CartProvider wrapper");
  }
  return context;
}

function DineFlowApp() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    gstValue, 
    serviceCharge, 
    cartGrandTotal, 
    cartNotes, 
    setCartNotes 
  } = useCart();

  // Unified persistent database states simulated in runtime memory
  const [role, setRole] = useState<'customer' | 'kitchen'>('customer');
  const [placedOrders, setPlacedOrders] = useState<KdsOrder[]>([]);
  const fetchOrdersFromDatabase = async () => {
  try {
    const response = await fetch("/api/orders", { cache: "no-store" });
    if (!response.ok) return;

    const orders = await response.json();
    setPlacedOrders(orders);
  } catch (error) {
    console.error("Failed to sync KDS orders:", error);
  }
  };

  const fetchAlertsFromDatabase = async () => {
  try {
    const response = await fetch("/api/alerts", { cache: "no-store" });
    if (!response.ok) return;

    const alerts = await response.json();
    setActiveAlerts(alerts);
  } catch (error) {
    console.error("Failed to sync staff alerts:", error);
  }
};
  const [activeAlerts, setActiveAlerts] = useState<StaffAlert[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>(FALLBACK_MENU_ITEMS);
  const [activeTableNumber, setActiveTableNumber] = useState<string>("12");
  const [activeRestaurantSlug, setActiveRestaurantSlug] = useState<string>("demo");
  const [latestSubmittedOrderId, setLatestSubmittedOrderId] = useState<string | null>(null);
  const activeTableLabel = `Table ${activeTableNumber}`;
  const activeTableShortLabel = `T${activeTableNumber}`;
  const activeTableOrders = useMemo(
    () => placedOrders.filter(order => order.table === activeTableNumber),
    [placedOrders, activeTableNumber]
  );

  // Customer UI views
  const [currentScreen, setCurrentScreen] = useState<'home' | 'cart' | 'checkout' | 'confirmed' | 'orders'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // KDS filter states
  const [kdsFilter, setKdsFilter] = useState<'all' | 'active' | 'completed' | 'rush'>('active');

  // Modals & triggers
  const [detailedDish, setDetailedDish] = useState<any | null>(null);
  const [waiterModalOpen, setWaiterModalOpen] = useState<boolean>(false);
  const [waiterSubmitting, setWaiterSubmitting] = useState<boolean>(false);
  const [waiterSuccess, setWaiterSuccess] = useState<boolean>(false);
  const [waiterReason, setWaiterReason] = useState<string>("Water Refill");

  // Live reviews state
  const [reviewsList, setReviewsList] = useState<any[]>(INITIAL_REVIEWS);
  const [newReviewName, setNewReviewName] = useState<string>("");
  const [newReviewText, setNewReviewText] = useState<string>("");
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState<boolean>(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  // KDS system tracking stages
  const PREP_STAGES = [
    { title: "Order Transmitted", desc: "Sent to Kitchen Display 3", icon: "🚀", color: "text-blue-400" },
    { title: "Chef Accepted", desc: "Ingredients prepped & portioned", icon: "👨‍🍳", color: "text-yellow-400" },
    { title: "Piping Hot Cooking", desc: "Sizzling over clay oven / pans", icon: "🔥", color: "text-orange-500" },
    { title: `Heading to ${activeTableLabel}`, desc: "On its way with our floor host", icon: "🏃‍♂️", color: "text-emerald-500" }
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restaurantParam = params.get("restaurant")?.trim();
    const tableParam = params.get("table")?.trim();

    if (restaurantParam && /^[a-zA-Z0-9-]+$/.test(restaurantParam)) {
      setActiveRestaurantSlug(restaurantParam);
    }

    if (tableParam && /^[a-zA-Z0-9-]+$/.test(tableParam)) {
      setActiveTableNumber(tableParam);
    }
  }, []);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Local endpoint offline, using fallbacks");
      })
      .then(data => {
        if (data && data.length > 0) {
          setMenuItems(data);
        }
      })
      .catch(err => {
        console.warn("DineFlow API fetching offline, using structural fallbacks:", err.message);
      });
  }, []);
  useEffect(() => {
  const createOrReuseSession = async () => {
    const sessionKey = `dineflow-session:${activeRestaurantSlug}:${activeTableNumber}`;
    const existingSessionId = window.localStorage.getItem(sessionKey);

    if (existingSessionId) {
      setActiveSessionId(existingSessionId);
      return;
    }

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantSlug: activeRestaurantSlug,
          tableNumber: activeTableNumber,
        }),
      });

      if (!response.ok) return;

      const session = await response.json();
      window.localStorage.setItem(sessionKey, session.id);
      setActiveSessionId(session.id);
    } catch (error) {
      console.error("Failed to create table session:", error);
    }
  };

  createOrReuseSession();
}, [activeRestaurantSlug, activeTableNumber]);
  const playKitchenBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5 note
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime); // E6 note

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.8);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log("AudioContext blocked or not supported by client environment.", e);
    }
  };

  useEffect(() => {
    if (placedOrders.length > 0) {
      playKitchenBell();
    }
  }, [placedOrders.length]);

  useEffect(() => {
  fetchOrdersFromDatabase();
  fetchAlertsFromDatabase();

  if (role !== "kitchen") return;

  const interval = window.setInterval(() => {
    fetchOrdersFromDatabase();
    fetchAlertsFromDatabase();
  }, 2000);

  return () => window.clearInterval(interval);
}, [role]);

  const latestCustomerOrder = useMemo(() => {
  if (latestSubmittedOrderId) {
    const matchingOrder = activeTableOrders.find(
      order => order.id === latestSubmittedOrderId
    );

    if (matchingOrder) return matchingOrder;
  }

  return [...activeTableOrders].sort(
    (a, b) => b.timestamp - a.timestamp
  )[0] ?? null;
}, [activeTableOrders, latestSubmittedOrderId]);

  const filtersList = ["Veg", "Spicy", "Popular", "Under ₹150"];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      if (selectedCategory !== 'All') {
        if (selectedCategory === "Chef's Special") {
          if (!item.chefRecommend) return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      if (selectedFilters.length > 0) {
        for (const filter of selectedFilters) {
          if (filter === "Veg" && item.type !== "Veg") return false;
          if (filter === "Spicy" && item.spice !== "Hot") return false;
          if (filter === "Popular" && !item.popular) return false;
          if (filter === "Under ₹150" && item.price >= 150) return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedFilters, menuItems]);

  const getQuantityInCart = (itemId: string) => {
    const found = cart.find(i => i.id === itemId);
    return found ? found.quantity : 0;
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const triggerCheckout = () => {
    if (cart.length === 0) return;
    setCurrentScreen('checkout');
  };

  const confirmOrder = async () => {
    const hasChefSpecial = cart.some(i => i.price > 300);
    const orderPriority = hasChefSpecial ? 'VIP' : (cart.length >= 3 ? 'Rush' : 'Normal');

  const payload = {
    restaurantSlug: activeRestaurantSlug,
    tableNumber: activeTableNumber,
    sessionId: activeSessionId,
    items: cart,
    notes: cartNotes,
    subtotal: cartSubtotal,
    gst: gstValue,
    grandTotal: cartGrandTotal,
    priority: orderPriority,
  };

    let savedOrderId = "OR-" + Math.floor(1000 + Math.random() * 9000);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Order API rejected the checkout request.");
      }

      const savedOrder = await response.json();
      savedOrderId = savedOrder.order?.id ?? savedOrder.id ?? savedOrderId;
    } catch (error) {
      console.error("Order database submission failed, using mock ID:", error);
    }

    const mockOrderTicket: KdsOrder = {
      id: savedOrderId,
      table: activeTableNumber,
      items: [...cart],
      notes: cartNotes,
      subtotal: cartSubtotal,
      gst: gstValue,
      grandTotal: cartGrandTotal,
      prepStage: 0, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      priority: orderPriority,
      completedDishes: {}
    };
    
    setLatestSubmittedOrderId(savedOrderId);
    setPlacedOrders((prev) => [mockOrderTicket, ...prev]);
    fetchOrdersFromDatabase();
    clearCart();
    setCurrentScreen('confirmed');
  };

  const handleWaiterSubmit = async () => {
  setWaiterSubmitting(true);

  try {
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: activeTableNumber,
        reason: waiterReason,
      }),
    });

    if (!response.ok) throw new Error("Failed to create staff alert");

    const savedAlert = await response.json();

    setActiveAlerts(prev => [savedAlert, ...prev]);
    setWaiterSubmitting(false);
    setWaiterSuccess(true);

    setTimeout(() => {
      setWaiterSuccess(false);
      setWaiterModalOpen(false);
    }, 2500);
  } catch (error) {
    console.error("Failed to submit waiter alert:", error);
    setWaiterSubmitting(false);
  }
};

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const freshReview = {
      name: newReviewName,
      rating: newReviewRating,
      text: newReviewText,
      date: `Just now, ${activeTableLabel}`
    };

    setReviewsList([freshReview, ...reviewsList]);
    setNewReviewName("");
    setNewReviewText("");
    setNewReviewRating(5);
    setReviewSubmitSuccess(true);

    setTimeout(() => {
      setReviewSubmitSuccess(false);
    }, 3500);
  };

  const advanceKdsStage = async (orderId: string) => {
  const targetOrder = placedOrders.find(order => order.id === orderId);
  if (!targetOrder) return;

  const nextStage = Math.min(targetOrder.prepStage + 1, 3);

  try {
    const response = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        prepStage: nextStage,
      }),
    });

    if (!response.ok) throw new Error("Failed to update order stage");

    const updatedOrder = await response.json();

    setPlacedOrders(prev =>
      prev.map(order => order.id === orderId ? updatedOrder : order)
    );
  } catch (error) {
    console.error("Failed to advance KDS stage:", error);
  }
};

  const dismissKdsOrder = async (orderId: string) => {
  try {
    const response = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        prepStage: 4,
      }),
    });

    if (!response.ok) throw new Error("Failed to archive order");

    setPlacedOrders(prev => prev.filter(order => order.id !== orderId));
  } catch (error) {
    console.error("Failed to archive KDS order:", error);
  }
};

  const resolveAlert = async (alertId: string) => {
  try {
    const response = await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alertId,
        resolved: true,
      }),
    });

    if (!response.ok) throw new Error("Failed to resolve alert");

    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
  } catch (error) {
    console.error("Failed to resolve alert:", error);
  }
};

  const toggleKdsItemPrepped = async (orderId: string, itemKey: string) => {
  const targetOrder = placedOrders.find(order => order.id === orderId);
  if (!targetOrder) return;

  const nextValue = !targetOrder.completedDishes[itemKey];

  try {
    const response = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        itemKey,
        prepped: nextValue,
      }),
    });

    if (!response.ok) throw new Error("Failed to update dish checklist");

    const updatedOrder = await response.json();

    setPlacedOrders(prev =>
      prev.map(order => order.id === orderId ? updatedOrder : order)
    );
  } catch (error) {
    console.error("Failed to update KDS item:", error);
  }
};

  const filteredKdsOrders = useMemo(() => {
    return placedOrders.filter(order => {
      if (kdsFilter === 'all') return true;
      if (kdsFilter === 'active') return order.prepStage < 3;
      if (kdsFilter === 'completed') return order.prepStage === 3;
      if (kdsFilter === 'rush') return order.priority === 'Rush' || order.priority === 'VIP';
      return true;
    });
  }, [placedOrders, kdsFilter]);

  const activeSessionTotals = useMemo(() => {
    const active = activeTableOrders;
    const subtotal = active.reduce((sum, o) => sum + o.subtotal, 0);
    const gst = active.reduce((sum, o) => sum + o.gst, 0);
    const service = active.length > 0 ? 25 : 0;
    return {
      subtotal,
      gst,
      service,
      grandTotal: subtotal + gst + service
    };
  }, [activeTableOrders]);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1F2937] font-sans flex flex-col items-center w-full selection:bg-[#FF6B35]/20">
      
      {/* ==========================================
          UNIVERSAL RUNTIME DUAL-ROLE TOGGLE
          ========================================== */}
      <div className="w-full max-w-5xl bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <p className="text-white text-xs font-bold tracking-wide">
            <span className="text-amber-400">DineFlow</span> Operational Simulator v2.5
          </p>
        </div>

        <div className="flex bg-slate-850 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setRole('customer')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all ${
              role === 'customer' 
              ? 'bg-[#FF6B35] text-white shadow-md' 
              : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📱</span> Customer View (Mobile Sandbox)
          </button>
          <button
            onClick={() => setRole('kitchen')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all relative ${
              role === 'kitchen' 
              ? 'bg-[#FF6B35] text-white shadow-md' 
              : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🍳</span> Kitchen Monitor (KDS Tablet)
            {(placedOrders.filter(o => o.prepStage < 3).length > 0 || activeAlerts.length > 0) && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {placedOrders.filter(o => o.prepStage < 3).length + activeAlerts.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ==========================================
          CUSTOMER ROLE SCREEN VIEWS
          ========================================== */}
      {role === 'customer' && (
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative overflow-x-hidden border-x border-[#FF6B35]/10 pb-32">
          
          {/* Header */}
          {currentScreen === 'home' && (
            <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-amber-100/60 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#FF6B35]/20 transform rotate-3">
                  D
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="font-extrabold text-base tracking-tight text-slate-800">DineFlow Cafe</h1>
                    <span className="bg-[#2D6A4F] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      Open
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeTableLabel} • Smart Dining</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeTableOrders.length > 0 && (
                  <button 
                    onClick={() => setCurrentScreen('orders')}
                    className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <span>📋</span> Session ({activeTableOrders.length})
                  </button>
                )}
                <span className="bg-amber-50 text-[#FF6B35] border border-amber-200 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-xs">
                  {activeTableShortLabel}
                </span>
                <button 
                  onClick={() => { setWaiterSuccess(false); setWaiterModalOpen(true); }}
                  className="bg-[#FF6B35] text-white hover:bg-[#e05624] text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1"
                >
                  <Utensils className="w-3 h-3" />
                  Staff
                </button>
              </div>
            </header>
          )}

          {/* CUSTOMER HOME SCREEN */}
          {currentScreen === 'home' && (
            <div className="flex-1">
              
              {/* Promo Board */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" 
                  alt="Fine dining table layout" 
                  className="w-full h-full object-cover opacity-60 scale-105 filter brightness-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-[#F5B700] text-xs font-black mb-1">
                    <span className="flex items-center gap-0.5 bg-black/40 px-2 py-0.5 rounded-md">★ 4.8</span>
                    <span className="text-white/60">•</span>
                    <span className="text-white">1,200+ Guest Ratings</span>
                  </div>
                  <h2 className="text-white font-black text-2xl tracking-tight">On-Table Contactless Ordering</h2>
                  <p className="text-white/80 text-[11px] mt-1 font-light leading-relaxed">Place multiple rounds of orders. They compile onto your table check and alert chefs instantly.</p>
                </div>
              </div>

              {/* Live Info Bar */}
              <div className="px-4 py-3 bg-amber-50/70 border-b border-amber-100/60 flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  Active Cooking Speed: 15 mins
                </span>
                <span className="flex items-center gap-1.5 text-[#2D6A4F]">
                  <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-ping" />
                  {activeTableLabel} Connected
                </span>
              </div>

              {/* Search & Tag filter header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100/40 py-3 px-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search over 24+ fresh dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-amber-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
                  />
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3 text-slate-400 font-bold hover:text-black">
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                  {filtersList.map((filter) => {
                    const isActive = selectedFilters.includes(filter);
                    return (
                      <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                          isActive 
                          ? 'bg-[#FF6B35] text-white shadow-md' 
                          : 'bg-[#FFFDF7] border border-amber-200 text-slate-600 hover:bg-amber-50/50'
                        }`}
                      >
                        {filter === "Veg" && (
                          <span className="w-2 h-2 rounded-full border border-green-700 bg-white flex items-center justify-center mr-0.5">
                            <span className="w-1 h-1 bg-green-700 rounded-full"></span>
                          </span>
                        )}
                        {filter === "Spicy" && "🌶️"}
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Classifications */}
              <div className="px-4 mt-5">
                <h3 className="font-extrabold text-[10px] tracking-widest uppercase text-slate-400 mb-3">Menu Classifications</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const count = menuItems.filter(item => {
                      if (cat === 'All') return true;
                      if (cat === "Chef's Special") return item.chefRecommend;
                      return item.category === cat;
                    }).length;

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex-shrink-0 flex flex-col items-center p-2 rounded-2xl w-20 text-center transition-all border ${
                          isActive 
                          ? 'bg-[#FF6B35]/10 border-[#FF6B35] shadow-sm transform scale-105' 
                          : 'bg-white border-amber-100'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                          isActive ? 'bg-[#FF6B35] text-white' : 'bg-amber-50 text-[#FF6B35]'
                        }`}>
                          {cat === 'All' && '🍽️'}
                          {cat === 'Starters' && '🍢'}
                          {cat === 'Main Course' && '🍲'}
                          {cat === 'Breads' && '🫓'}
                          {cat === 'Beverages' && '🥤'}
                          {cat === 'Desserts' && '🍨'}
                          {cat === "Chef's Special" && '👨‍🍳'}
                        </div>
                        <span className="text-[10px] font-black text-slate-800 leading-tight truncate w-full">{cat}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5 font-bold">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Signature Combos */}
              <div className="px-4 mt-6">
                <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-1.5">
                  <span>💰</span> Signature Combos
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {COMBO_DEALS.map(combo => (
                    <div key={combo.id} className="flex-shrink-0 w-72 bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 rounded-3xl p-4 shadow-sm flex gap-3.5">
                      <img src={combo.image} className="w-20 h-20 object-cover rounded-2xl shadow-inner border border-amber-200" alt={combo.name} />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="bg-[#2D6A4F] text-white text-[9px] px-2 py-0.5 rounded-full font-extrabold">SAVE ₹{combo.saving}</span>
                          <h4 className="font-extrabold text-sm text-slate-800 mt-1 leading-tight">{combo.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{combo.items.join(" + ")}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-xs text-slate-400 line-through">₹{combo.originalPrice}</span>
                            <span className="text-sm font-black text-[#FF6B35] ml-1">₹{combo.comboPrice}</span>
                          </div>
                          <button 
                            onClick={() => {
                              combo.items.forEach(itemName => {
                                const match = menuItems.find(m => m.name.toLowerCase().includes(itemName.toLowerCase()) || itemName.toLowerCase().includes(m.name.toLowerCase()));
                                if (match) addToCart(match);
                              });
                            }}
                            className="bg-white hover:bg-amber-100 text-[#FF6B35] border border-amber-200 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-xs"
                          >
                            + Add Combo
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Menu Grid */}
              <div className="px-4 mt-6">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    {selectedCategory === 'All' ? 'Complete Menu' : `${selectedCategory}`} 
                    <span className="text-xs text-slate-400 ml-2 font-bold">( {filteredItems.length} items )</span>
                  </h3>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="bg-amber-50/40 rounded-3xl p-8 text-center border border-dashed border-amber-200">
                    <AlertCircle className="w-8 h-8 text-[#FF6B35] mx-auto mb-2" />
                    <h4 className="font-bold text-slate-700">No matching items found</h4>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedFilters([]); setSelectedCategory('All'); }}
                      className="mt-3.5 text-xs font-bold text-[#FF6B35] underline animate-pulse"
                    >
                      Reset active queries
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => setDetailedDish(item)}
                        className="bg-white border border-amber-100 rounded-3xl p-3.5 shadow-xs hover:shadow-md transition-all flex gap-3.5 relative cursor-pointer group"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 relative">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" alt={item.name} />
                          <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5">
                            ⭐ {item.rating}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="flex items-center gap-1.5">
                                <span className="w-3.5 h-3.5 rounded-sm border border-green-700 bg-white flex items-center justify-center">
                                  <span className="w-1.5 h-1.5 bg-green-700 rounded-full"></span>
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold">{item.prepTime}</span>
                              </span>
                              {item.chefRecommend && (
                                <span className="bg-amber-100 text-[#FF6B35] text-[8px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                  <Sparkles className="w-2 h-2" /> Signature
                                </span>
                              )}
                            </div>

                            <h4 className="font-extrabold text-sm text-slate-800 group-hover:text-[#FF6B35] transition-colors">{item.name}</h4>
                            <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-normal">{item.description}</p>
                          </div>

                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-base font-black text-slate-800">₹{item.price}</span>

                            {getQuantityInCart(item.id) > 0 ? (
                              <div className="flex items-center bg-[#FF6B35] text-white rounded-xl py-1.5 px-3 gap-3 text-xs font-bold shadow-md shadow-orange-500/10">
                                <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} className="hover:opacity-75 select-none">-</button>
                                <span className="min-w-[12px] text-center">{getQuantityInCart(item.id)}</span>
                                <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="hover:opacity-75 select-none">+</button>
                              </div>
                            ) : (
                              <button 
                                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                className="bg-white hover:bg-[#FF6B35] hover:text-white text-[#FF6B35] font-extrabold text-xs px-4 py-1.5 rounded-xl border-2 border-amber-100 transition-all"
                              >
                                ADD
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Table Feedbacks */}
              <div className="mt-8 bg-amber-50/40 p-5 border-y border-amber-100/50">
                <h3 className="font-extrabold text-slate-800 text-lg mb-1 flex items-center gap-1.5">
                  <span>⭐</span> Table Feedbacks
                </h3>
                <p className="text-[11px] text-slate-400 mb-4 font-medium">Real reviews submitted from live session tables.</p>
                
                <form onSubmit={handleReviewSubmit} className="bg-white rounded-3xl p-4 border border-amber-100 shadow-xs mb-5 space-y-3">
                  <h4 className="font-extrabold text-xs text-[#FF6B35] uppercase tracking-wide">Leave dining reviews</h4>
                  {reviewSubmitSuccess && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] p-2 rounded-xl font-bold flex items-center gap-1.5">
                      <span>✨</span> Review published to database!
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full text-xs bg-[#FFFDF7] border border-amber-100 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                        required
                      />
                    </div>
                    <div>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full text-xs bg-[#FFFDF7] border border-amber-100 rounded-xl px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6B35] font-bold text-amber-500"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                        <option value={3}>⭐⭐⭐ (3/5)</option>
                      </select>
                    </div>
                  </div>

                  <textarea 
                    placeholder="Describe taste, speed, or system experience..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full text-xs bg-[#FFFDF7] border border-amber-100 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#FF6B35] h-16 resize-none"
                    required
                  />

                  <button 
                    type="submit"
                    className="w-full bg-[#FF6B35] text-white font-extrabold text-xs py-2 rounded-xl shadow-md hover:bg-[#e05624] transition-all"
                  >
                    Submit Live Feed
                  </button>
                </form>

                <div className="space-y-3">
                  {reviewsList.map((rev, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 border border-amber-100/40 shadow-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-extrabold text-xs text-slate-700">{rev.name}</span>
                        <span className="text-amber-500 text-xs">{"★".repeat(rev.rating)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">"{rev.text}"</p>
                      <span className="text-[9px] text-slate-400 block mt-2 font-medium">{rev.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-24" />
            </div>
          )}

          {/* CUSTOMER CART VIEW */}
          {currentScreen === 'cart' && (
            <div className="flex-1 bg-[#FFFDF7] flex flex-col">
              <div className="p-4 border-b border-amber-100/60 flex items-center justify-between bg-white sticky top-0 z-10">
                <button onClick={() => setCurrentScreen('home')} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-black text-base text-slate-800">My Food Tray</h2>
                <span className="text-xs font-bold text-[#FF6B35]">{cart.length} items</span>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-12">
                  <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-3xl mb-4 text-[#FF6B35] border border-orange-100">
                    🛒
                  </div>
                  <h3 className="font-bold text-slate-700 text-lg">Your tray is empty</h3>
                  <button onClick={() => setCurrentScreen('home')} className="mt-6 bg-[#FF6B35] text-white font-extrabold text-sm px-6 py-3 rounded-2xl">
                    Explore menu
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div className="bg-white rounded-3xl border border-amber-100/60 shadow-xs p-3 divide-y divide-amber-50">
                    {cart.map((item) => (
                      <div key={item.id} className="py-3 flex gap-3 first:pt-0 last:pb-0">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-extrabold text-sm text-slate-800">{item.name}</h4>
                              <span className="text-sm font-black text-[#1F2937]">₹{item.price * item.quantity}</span>
                            </div>
                            <p className="text-[10px] text-slate-400">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-sm border border-green-700 bg-white flex items-center justify-center">
                                <span className="w-1 h-1 bg-green-700 rounded-full"></span>
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold">{item.prepTime}</span>
                            </span>

                            <div className="flex items-center bg-[#FF6B35] text-white rounded-xl py-1 px-2.5 gap-2.5 text-xs font-bold">
                              <button onClick={() => removeFromCart(item.id)} className="hover:opacity-75">-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => addToCart(item)} className="hover:opacity-75">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI recommendations */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-4 border border-amber-100/60 shadow-xs">
                    <h4 className="font-bold text-xs text-[#FF6B35] tracking-wide uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Contextual Recommendation
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 mb-3 leading-relaxed">Guests frequently pair their dishes with these:</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {menuItems.filter(m => m.id === 'b1' || m.id === 'v1').map(item => {
                        const inCart = getQuantityInCart(item.id) > 0;
                        return (
                          <div key={item.id} className="bg-white rounded-2xl p-2.5 border border-amber-100/40 flex flex-col justify-between">
                            <div>
                              <h5 className="font-bold text-xs text-slate-800 line-clamp-1">{item.name}</h5>
                              <span className="text-[10px] text-[#FF6B35] font-extrabold block mt-0.5">₹{item.price}</span>
                            </div>
                            <button
                              onClick={() => addToCart(item)}
                              className={`w-full text-center py-1 rounded-lg text-[10px] font-bold mt-2 transition-all ${
                                inCart 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-[#FF6B35]/10 text-[#FF6B35] hover:bg-[#FF6B35]/20'
                              }`}
                            >
                              {inCart ? 'Added' : '+ Add'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-amber-100/60 shadow-xs p-4">
                    <label className="block text-xs font-extrabold text-slate-600 uppercase mb-1.5">👨‍🍳 Cooking Directives</label>
                    <textarea 
                      placeholder="e.g. Please make it low oil / Serve without onions..."
                      value={cartNotes}
                      onChange={(e) => setCartNotes(e.target.value)}
                      className="w-full text-xs bg-[#FFFDF7] border border-amber-200 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] h-16 resize-none"
                    />
                  </div>

                  <div className="bg-white rounded-3xl border border-amber-100/60 shadow-xs p-4 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-bold text-slate-700">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">GST (5%)</span>
                      <span className="font-bold text-slate-700">₹{gstValue}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Service Fee</span>
                      <span className="font-bold text-slate-700">₹{serviceCharge}</span>
                    </div>
                    <hr className="border-amber-50" />
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-slate-800">Grand Total</span>
                      <span className="font-black text-lg text-[#FF6B35]">₹{cartGrandTotal}</span>
                    </div>
                  </div>

                  <button 
                    onClick={triggerCheckout}
                    className="w-full bg-[#FF6B35] hover:bg-[#e05624] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2"
                  >
                    Proceed To Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMER CHECKOUT VIEW */}
          {currentScreen === 'checkout' && (
            <div className="flex-1 bg-[#FFFDF7] flex flex-col pb-10">
              <div className="p-4 border-b border-amber-100/60 flex items-center justify-between bg-white sticky top-0 z-10">
                <button onClick={() => setCurrentScreen('cart')} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-black text-base text-slate-800">Table Dispatch Validation</h2>
                <div className="w-9" />
              </div>

              <div className="p-4 space-y-4">
                <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-sm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl text-[#FF6B35] font-black">
                    {activeTableNumber}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Dispatching to {activeTableLabel}</h3>
                    <p className="text-[11px] text-slate-400">Order automatically links to this table session ID.</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-sm">
                  <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 mb-3">Verification Mode</h4>
                  <div className="p-3 bg-amber-50/50 rounded-2xl border-2 border-[#FF6B35] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Coins className="w-5 h-5 text-[#FF6B35]" />
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-800">Eat Now, Settle Post-Dining</h5>
                        <p className="text-[9px] text-slate-400">Settle your combined table check before exit.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-sm">
                  <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 mb-2">Order Tickets</h4>
                  <div className="space-y-2">
                    {cart.map(i => (
                      <div key={i.id} className="flex justify-between items-center text-xs">
                        <span className="text-slate-600">{i.quantity}x {i.name}</span>
                        <span className="font-bold text-slate-800">₹{i.price * i.quantity}</span>
                      </div>
                    ))}
                    <hr className="border-slate-50 my-2" />
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>GST (5%) + Service Fees</span>
                      <span>₹{gstValue + serviceCharge}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-1">
                      <span className="font-bold text-sm text-slate-800">Total to Dispatch</span>
                      <span className="font-black text-lg text-[#FF6B35]">₹{cartGrandTotal}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={confirmOrder}
                  className="w-full bg-[#FF6B35] text-white font-extrabold text-sm py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  🚀 Submit Ticket to Kitchen
                </button>
              </div>
            </div>
          )}

          {/* CUSTOMER SUCCESS VIEW */}
          {currentScreen === 'confirmed' && (
            <div className="flex-1 bg-white p-5 flex flex-col justify-between">
              <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-3xl mb-4 border-2 border-[#2D6A4F] animate-bounce">
                  ✅
                </div>

                <span className="bg-[#2D6A4F] text-white text-[9px] font-black uppercase px-3 py-1 rounded-full mb-1.5 tracking-widest">
                  Dispatched Successfully
                </span>
                <h2 className="font-black text-2xl text-slate-800 tracking-tight">Order is cooking!</h2>
                
                {/* SYNCED TRACKER TIMELINE */}
                <div className="w-full bg-slate-50 rounded-3xl p-5 border border-slate-100 mt-6 text-left">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200/50">
                    <h4 className="font-extrabold text-[10px] uppercase tracking-widest text-[#FF6B35] flex items-center gap-1">
                      <span className="animate-pulse">🔴</span> Synced Kitchen Feed
                    </h4>
                    <span className="text-[9px] font-bold text-slate-400">Updates as chef acts</span>
                  </div>

                  <div className="space-y-4 relative pl-3">
                    <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-slate-200">
                      <div 
                        className="w-full bg-[#2D6A4F] transition-all duration-700" 
                        style={{ height: `${((latestCustomerOrder?.prepStage || 0) / (PREP_STAGES.length - 1)) * 100}%` }}
                      />
                    </div>

                    {PREP_STAGES.map((stage, idx) => {
                      const currentStage = latestCustomerOrder?.prepStage ?? 0;
                      const isCompleted = idx < currentStage;
                      const isActive = idx === currentStage;

                      return (
                        <div key={idx} className="flex gap-4 items-start relative z-10">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                            isCompleted 
                            ? 'bg-[#2D6A4F] text-white' 
                            : isActive 
                            ? 'bg-[#FF6B35] text-white ring-4 ring-orange-500/20 scale-110 animate-pulse' 
                            : 'bg-white border border-slate-200 text-slate-400'
                          }`}>
                            {isCompleted ? "✓" : stage.icon}
                          </div>

                          <div>
                            <h5 className={`text-xs font-extrabold transition-colors leading-tight ${
                              isActive ? 'text-[#FF6B35]' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                            }`}>
                              {stage.title}
                            </h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{stage.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {latestCustomerOrder && (
                  <div className="w-full bg-amber-50/40 rounded-3xl p-4 border border-amber-200/40 mt-4 text-left">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-2">
                      <span>Receipt ID: {latestCustomerOrder.id}</span>
                      <span>{activeTableLabel}</span>
                    </div>
                    <div className="space-y-1">
                      {latestCustomerOrder.items.map((i: any) => (
                        <div key={i.id} className="flex justify-between items-center text-xs text-slate-600">
                          <span>{i.quantity}x {i.name}</span>
                          <span>₹{i.price * i.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <button 
                  onClick={() => setCurrentScreen('home')}
                  className="w-full bg-[#FF6B35] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md"
                >
                  Back To Menu Selection
                </button>
                <button 
                  onClick={() => setCurrentScreen('orders')}
                  className="w-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-xs py-3 rounded-2xl"
                >
                  View Active Session Totals
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE SESSION SUMMARY */}
          {currentScreen === 'orders' && (
            <div className="flex-1 bg-[#FFFDF7] flex flex-col">
              <div className="p-4 border-b border-amber-100/60 flex items-center justify-between bg-white sticky top-0 z-10">
                <button onClick={() => setCurrentScreen('home')} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-black text-base text-slate-800">On-Table Active Check</h2>
                <span className="text-xs font-bold text-[#2D6A4F]">{activeTableLabel} Session</span>
              </div>

              <div className="p-4 space-y-4">
                {activeTableOrders.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-slate-400 text-xs">No orders dispatched during this dining session yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeTableOrders.map((order, idx, arr) => (
                      <div key={order.id} className="bg-white border border-amber-100/70 rounded-3xl p-4 shadow-xs space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                          <div>
                            <h4 className="font-black text-xs text-slate-800">Dispatch #{arr.length - idx}</h4>
                            <span className="text-[9px] text-slate-400 font-bold block">ID: {order.id}</span>
                          </div>
                          <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full ${
                            order.prepStage === 3 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-orange-50 text-[#FF6B35]'
                          }`}>
                            {order.prepStage === 3 ? "✓ Served" : PREP_STAGES[order.prepStage].title}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {order.items.map(i => (
                            <div key={i.id} className="flex justify-between items-center text-xs text-slate-600">
                              <span>{i.quantity}x {i.name}</span>
                              <span className="font-bold text-slate-700">₹{i.price * i.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Consolidated check */}
                    <div className="bg-[#1F2937] text-white rounded-3xl p-5 shadow-lg space-y-3">
                      <h4 className="font-extrabold text-xs text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span>🧾</span> Table Check Consolidated
                      </h4>
                      <div className="space-y-1.5 text-xs text-white/80">
                        <div className="flex justify-between items-center">
                          <span>Total Items (Combined rounds)</span>
                          <span className="font-bold">₹{activeSessionTotals.subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>GST taxes (5%)</span>
                          <span className="font-bold">₹{activeSessionTotals.gst}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Table Session Surcharge</span>
                          <span className="font-bold">₹{activeSessionTotals.service}</span>
                        </div>
                        <hr className="border-white/10 my-2" />
                        <div className="flex justify-between items-center text-white font-extrabold text-sm">
                          <span>Running Check Total</span>
                          <span className="text-amber-400 font-black text-base">₹{activeSessionTotals.grandTotal}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button 
                          onClick={() => { setWaiterReason("Request Bill"); setWaiterSuccess(false); setWaiterModalOpen(true); }}
                          className="bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs py-2.5 rounded-xl border border-white/5 transition-all text-center"
                        >
                          🛎️ Request Bill Staff
                        </button>
                        <button 
                          onClick={() => {
                            const billText = `${activeTableLabel} Consolidated Bill Check: ₹${activeSessionTotals.grandTotal}`;
                            try {
                              navigator.clipboard.writeText(billText);
                            } catch (e) {
                              // fallback
                            }
                            setWaiterReason("Request Bill Copy");
                            setWaiterSuccess(true);
                            setWaiterModalOpen(true);
                          }}
                          className="bg-[#FF6B35] hover:bg-[#e05624] text-white font-black text-xs py-2.5 rounded-xl transition-all text-center"
                        >
                          Copy Check Summary
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sticky Bottom Navigation */}
          {currentScreen === 'home' && (
            <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto z-30 px-4 pb-4">
              {cart.length > 0 && (
                <div 
                  onClick={() => setCurrentScreen('cart')}
                  className="bg-[#FF6B35] text-white rounded-2xl p-3.5 shadow-xl flex items-center justify-between mb-3 cursor-pointer hover:bg-[#e05624] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-sm font-black">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                    <div>
                      <h5 className="text-xs font-black">Active Food Tray</h5>
                      <p className="text-[10px] opacity-90">Running subtotal: ₹{cartSubtotal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-sm mr-1">View Tray</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              <nav className="bg-white/80 backdrop-blur-md border border-amber-100 rounded-2xl py-2 px-4 shadow-lg flex justify-between items-center">
                <button 
                  onClick={() => { setCurrentScreen('home'); setSelectedCategory('All'); }}
                  className={`flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#FF6B35] transition-colors p-1 ${selectedCategory === 'All' && currentScreen === 'home' ? 'text-[#FF6B35]' : ''}`}
                >
                  <span className="text-lg">🏠</span>
                  <span className="text-[9px] font-bold">Home</span>
                </button>

                <button 
                  onClick={() => { setCurrentScreen('home'); setSelectedCategory('Main Course'); }}
                  className={`flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#FF6B35] transition-colors p-1 ${selectedCategory === 'Main Course' ? 'text-[#FF6B35]' : ''}`}
                >
                  <span className="text-lg">🍲</span>
                  <span className="text-[9px] font-bold">Mains</span>
                </button>

                <button 
                  onClick={() => setCurrentScreen('orders')}
                  className={`flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#FF6B35] transition-colors p-1 relative ${(currentScreen as string) === 'orders' ? 'text-[#FF6B35]' : ''}`}
                >
                  <div className="relative">
                    <span className="text-lg">📋</span>
                    {activeTableOrders.length > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 bg-[#2D6A4F] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border border-white">
                        {activeTableOrders.length}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-bold">My Check</span>
                </button>

                <button 
                  onClick={() => setCurrentScreen('cart')}
                  className={`flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#FF6B35] transition-colors p-1 ${(currentScreen as string) === 'cart' ? 'text-[#FF6B35]' : ''}`}
                >
                  <div className="relative">
                    <span className="text-lg">🛒</span>
                    {cart.length > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-[#FF6B35] text-white text-[8px] font-black px-1 rounded-full border border-white">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-bold">Tray</span>
                </button>
              </nav>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          KITCHEN STAFF ROLE VIEW (KDS MONITOR)
          ========================================== */}
      {role === 'kitchen' && (
        <div className="w-full max-w-6xl bg-slate-950 min-h-screen text-slate-100 flex flex-col p-6 font-sans">
          
          {/* Brand & Stats Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-orange-950/40 relative">
                🍳
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-black text-2xl tracking-tight text-white uppercase">
                    ChefMonitor <span className="text-orange-500">v2.5</span>
                  </h1>
                  <span className="bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Tablet View
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Real-Time Kitchen Display System (KDS) • Sync Active</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">Active Tickets</span>
                <span className="font-black text-2xl text-orange-500">{placedOrders.filter(o => o.prepStage < 3).length}</span>
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">Table Alerts</span>
                <span className={`font-black text-2xl ${activeAlerts.length > 0 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                  {activeAlerts.length}
                </span>
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center shadow-inner relative overflow-hidden group">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">Dispatched</span>
                <span className="font-black text-2xl text-emerald-500">{placedOrders.filter(o => o.prepStage === 3).length}</span>
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>

              {/* Sound Test Panel */}
              <button 
                onClick={playKitchenBell}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-slate-300"
              >
                <Volume2 className="w-4 h-4 text-orange-500 animate-bounce" />
                <span className="text-[10px] font-bold block uppercase tracking-wider">Test Bell</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/60 p-3 rounded-2xl border border-slate-850">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setKdsFilter('active')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  kdsFilter === 'active' 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Active Prep Board ({placedOrders.filter(o => o.prepStage < 3).length})
              </button>

              <button
                onClick={() => setKdsFilter('rush')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  kdsFilter === 'rush' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 animate-pulse' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                🚨 Rush / VIP ({placedOrders.filter(order => order.priority === 'Rush' || order.priority === 'VIP').length})
              </button>

              <button
                onClick={() => setKdsFilter('completed')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  kdsFilter === 'completed' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                ✓ Archive Log ({placedOrders.filter(o => o.prepStage === 3).length})
              </button>

              <button
                onClick={() => setKdsFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  kdsFilter === 'all' 
                  ? 'bg-slate-750 text-white' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Show All Tickets ({placedOrders.length})
              </button>
            </div>

            <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              KDS Station Online & Syncing
            </div>
          </div>

          {/* Grid Layout splits order blocks and service alarms */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            
            {/* LEFT 3 COLUMNS: MAIN ACTIVE ORDERS SCREEN */}
            <div className="xl:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <span>🔥</span> Order Dispatch Grid
                </h3>
                <span className="text-xs text-slate-500 font-semibold">Total Displayed: {filteredKdsOrders.length}</span>
              </div>

              {filteredKdsOrders.length === 0 ? (
                <div className="bg-slate-900/20 border-2 border-dashed border-slate-850 rounded-[32px] p-16 text-center shadow-inner">
                  <Flame className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-pulse" />
                  <h4 className="font-bold text-slate-400 text-base">Kitchen Queue is Clean</h4>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    No active orders match your selected view. Switch to the customer sandbox, add items to your food tray, and dispatch them to the kitchen!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredKdsOrders.map((order) => {
                    const isCompleted = order.prepStage === 3;
                    const itemsList = order.items;

                    return (
                      <div 
                        key={order.id} 
                        className={`bg-slate-900 border rounded-3xl overflow-hidden shadow-xl transition-all relative flex flex-col justify-between ${
                          isCompleted ? 'border-slate-800 opacity-60' : 'border-slate-800'
                        }`}
                      >
                        {/* Priority glowing sidebar indicators */}
                        <div className={`absolute top-0 bottom-0 left-0 w-2.5 ${
                          order.priority === 'VIP' ? 'bg-purple-600 animate-pulse' :
                          order.priority === 'Rush' ? 'bg-red-500 animate-pulse' :
                          'bg-orange-500'
                        }`} />

                        {/* Card body content */}
                        <div className="p-5 pl-7">
                          
                          {/* Card header with monospaced info */}
                          <div className="flex justify-between items-start pb-3 border-b border-slate-800/80 mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-800 border border-slate-700 text-white text-xs font-black px-3 py-1 rounded-lg">
                                  TABLE {order.table}
                                </span>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                                  order.priority === 'VIP' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                                  order.priority === 'Rush' ? 'bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse' :
                                  'bg-slate-800 text-slate-400'
                                }`}>
                                  {order.priority}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-mono block mt-1">Ticket: {order.id}</span>
                              <span className="text-[9px] text-slate-600 font-mono block">Session: {order.sessionId?.slice(0, 8) ?? "none"}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-mono text-slate-400 font-bold block">{order.time}</span>
                              <span className="text-[9px] text-slate-500 block">Round 1</span>
                            </div>
                          </div>

                          {/* Chef Directives Note */}
                          {order.notes && (
                            <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/25 p-3 rounded-2xl text-xs text-[#FF6B35] font-bold mb-4 flex gap-2 items-start">
                              <span className="text-sm">⚠️</span>
                              <div>
                                <span className="text-[10px] uppercase text-orange-400 block tracking-wider mb-0.5">Chef Instruction:</span>
                                "{order.notes}"
                              </div>
                            </div>
                          )}

                          {/* List items checklist */}
                          <div className="space-y-3 mb-5">
                            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">
                              Dish Checklist (Tap item to cross off)
                            </span>
                            {itemsList.map((item, i) => {
                              const itemKey = `${order.id}-${item.id}`;
                              const isItemChecked = order.completedDishes[itemKey];

                              return (
                                <div 
                                  key={i} 
                                  onClick={() => toggleKdsItemPrepped(order.id, itemKey)}
                                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                                    isItemChecked 
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-400' 
                                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-100'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                      isItemChecked 
                                      ? 'bg-emerald-600 border-emerald-500 text-white' 
                                      : 'border-slate-700'
                                    }`}>
                                      {isItemChecked && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={`text-sm font-extrabold ${isItemChecked ? 'line-through opacity-50' : ''}`}>
                                      {item.quantity}x {item.name}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-500 font-bold">{item.prepTime}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Interactive Controls & Ticket Progress */}
                        <div className="bg-slate-950/80 p-5 pt-4 border-t border-slate-800/80 space-y-4 rounded-b-3xl">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Preparation Stage:</span>
                            <span className={`font-black uppercase tracking-wide flex items-center gap-1 ${PREP_STAGES[order.prepStage].color}`}>
                              <span>{PREP_STAGES[order.prepStage].icon}</span>
                              {PREP_STAGES[order.prepStage].title}
                            </span>
                          </div>

                          {/* Dynamic progress loader bar */}
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-700"
                              style={{ width: `${(order.prepStage / (PREP_STAGES.length - 1)) * 100}%` }}
                            />
                          </div>

                          {/* Action flow buttons */}
                          <div className="flex gap-2">
                            {order.prepStage < 3 ? (
                              <button
                                onClick={() => advanceKdsStage(order.id)}
                                className="flex-1 bg-[#2D6A4F] hover:bg-[#224f3b] text-white text-xs font-black py-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20"
                              >
                                <span>🍳</span> Advance to: {PREP_STAGES[order.prepStage + 1].title}
                              </button>
                            ) : (
                              <button
                                onClick={() => dismissKdsOrder(order.id)}
                                className="flex-1 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-black py-3 rounded-2xl transition-all active:scale-95 text-center block border border-slate-800"
                              >
                                Archive Ticket
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT SIDE PANEL: SERVICE ALERTS CONSOLE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <span>🔔</span> Alert console
                </h3>
                <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-bold">
                  Live Feed
                </span>
              </div>

              {activeAlerts.length === 0 ? (
                <div className="bg-slate-900/20 border-2 border-dashed border-slate-850 rounded-[32px] p-8 text-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-slate-700 mx-auto mb-2 animate-bounce" />
                  <h4 className="font-bold text-slate-400 text-xs">Alert Console Clear</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    No active table service alerts. Diner help calls will pop up here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className="bg-red-500/10 border border-red-500/30 p-5 rounded-3xl flex flex-col justify-between shadow-lg relative overflow-hidden animate-pulse border-l-4 border-l-red-500"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                          TABLE {alert.table} Paged
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-bold">{alert.time}</span>
                      </div>
                      
                      <h4 className="text-white font-extrabold text-base mb-4 bg-slate-950/40 p-3 rounded-2xl border border-slate-900">
                        "{alert.reason}"
                      </h4>
                      
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black py-3 rounded-2xl transition-all active:scale-95 shadow-md shadow-red-950/20"
                      >
                        Resolve Alert & Clear
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          MODAL VIEWS: DETAILED DISH SPEC SHEET
          ========================================== */}
      {detailedDish && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-[32px] overflow-hidden max-h-[85vh] flex flex-col shadow-2xl relative animate-slide-up">
            <button 
              onClick={() => setDetailedDish(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-56 bg-slate-100 flex-shrink-0">
              <img src={detailedDish.image} className="w-full h-full object-cover" alt={detailedDish.name} />
              <div className="absolute top-4 left-4 z-10 flex gap-1.5">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  ⭐ {detailedDish.rating} ({detailedDish.reviews})
                </span>
                <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                  {detailedDish.type}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-white font-black text-2xl tracking-tight leading-none">{detailedDish.name}</h3>
                <p className="text-white/80 text-[10px] font-semibold tracking-wider mt-1.5 uppercase">Category: {detailedDish.category}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-1">About Dish</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{detailedDish.description}</p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="bg-amber-50/50 border border-amber-100 p-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Calories</span>
                  <span className="font-black text-xs text-slate-700">{detailedDish.calories}</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 p-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Protein</span>
                  <span className="font-black text-xs text-[#2D6A4F]">{detailedDish.protein}</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 p-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Spice</span>
                  <span className="font-black text-xs text-[#FF6B35]">{detailedDish.spice}</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 p-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Prep Time</span>
                  <span className="font-black text-[10px] text-slate-700">{detailedDish.prepTime}</span>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailedDish.ingredients?.map((ing: string, i: number) => (
                    <span key={i} className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-xl">
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-amber-100 p-4 bg-white flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Calculated Cost</span>
                <span className="font-black text-xl text-slate-800">
                  ₹{detailedDish.price * (getQuantityInCart(detailedDish.id) || 1)}
                </span>
              </div>

              {getQuantityInCart(detailedDish.id) > 0 ? (
                <div className="flex items-center bg-[#FF6B35] text-white rounded-2xl py-2 px-5 gap-5 text-sm font-black shadow-lg shadow-orange-500/20">
                  <button onClick={() => removeFromCart(detailedDish.id)} className="hover:opacity-75 select-none">-</button>
                  <span className="min-w-[15px] text-center">{getQuantityInCart(detailedDish.id)}</span>
                  <button onClick={() => addToCart(detailedDish)} className="hover:opacity-75 select-none">+</button>
                </div>
              ) : (
                <button 
                  onClick={() => { addToCart(detailedDish); }}
                  className="bg-[#FF6B35] hover:bg-[#e05624] text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg flex items-center gap-1.5"
                >
                  Add To Food Tray
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL VIEWS: CALL WAITER PAGING ENGINE
          ========================================== */}
      {waiterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-sm p-6 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setWaiterModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {!waiterSuccess ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛎️</span>
                  <div>
                    <h3 className="font-black text-lg text-slate-800">Call Waiter</h3>
                    <p className="text-xs text-slate-400">Assigned: {activeTableLabel}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-normal mb-4">Select service assistance to ping nearby floor staff:</p>
                
                <div className="space-y-2 mb-6">
                  {["Water Refill", "Extra Cutlery", "Request Fresh Plate", "Request Bill", "General Assistance"].map((reason) => (
                    <div 
                      key={reason}
                      onClick={() => setWaiterReason(reason)}
                      className={`p-3 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex justify-between items-center ${
                        waiterReason === reason 
                        ? 'border-[#FF6B35] bg-orange-50/40 text-[#FF6B35]' 
                        : 'border-slate-100 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{reason}</span>
                      {waiterReason === reason && <span className="text-sm">✔</span>}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleWaiterSubmit}
                  disabled={waiterSubmitting}
                  className="w-full bg-[#FF6B35] hover:bg-[#e05624] text-white font-extrabold text-sm py-3 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-55"
                >
                  {waiterSubmitting ? 'Notifying Floor Staff...' : 'Submit Call Request'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="text-5xl block mb-4 animate-bounce">🔔</span>
                <h3 className="font-black text-lg text-slate-800">Staff Pinned!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mt-2">
                  Your table alert for <strong>"{waiterReason}"</strong> has been pushed to KDS floor hosts. A representative is heading to {activeTableLabel}.
                </p>
                <button 
                  onClick={() => setWaiterModalOpen(false)}
                  className="mt-6 bg-[#2D6A4F] text-white font-extrabold text-xs px-6 py-2.5 rounded-2xl shadow-sm"
                >
                  Got it, Thanks
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded Animations */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <DineFlowApp />
    </CartProvider>
  );
}