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
  const [placedOrders, setPlacedOrders] = useState<KdsOrder[]>([]);
  const fetchOrdersFromDatabase = async () => {
  try {
    const response = await fetch("/api/orders", { cache: "no-store" });
    if (!response.ok) return;

    const orders = await response.json();
    setPlacedOrders(orders);
  } catch (error) {
    console.error("Failed to sync orders:", error);
  }
  };

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
  useEffect(() => {
    fetchOrdersFromDatabase();
    const interval = window.setInterval(fetchOrdersFromDatabase, 5000);
    return () => window.clearInterval(interval);
  }, []);

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

    try {
      const channel = new BroadcastChannel("dineflow-kds");
      channel.postMessage({ type: "NEW_ORDER" });
      channel.close();
    } catch (e) {
      // Ignore BroadcastChannel errors in environments where it's not supported
    }

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

      await response.json();

      try {
        const channel = new BroadcastChannel("dineflow-kds");
        channel.postMessage({ type: "NEW_ALERT" });
        channel.close();
      } catch (e) {
        // Ignore BroadcastChannel errors
      }

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
          CUSTOMER ROLE SCREEN VIEWS
          ========================================== */}
      (
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
                          {item.image ? (
                            <img
                              src={item.image}
                              className="w-full h-full object-cover"
                              alt={item.name}
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                              No image
                            </div>
                          )}
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
                        {item.image ? (
                          <img
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt={item.name}
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                            No image
                          </div>
                        )}
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
      )

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