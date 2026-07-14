# 🍽️ MenuVerse
### AI-Powered QR Restaurant Management & Ordering System

A modern QR-based restaurant management platform that enables customers to browse menus, place orders, and track them in real time while providing restaurant owners with an intuitive admin dashboard.

---

## 🚀 Live Demo

🌐 [https://dineflow.vercel.app](https://dineflow.vercel.app)

---

## 📷 Screenshots

| Customer Home | QR Menu View | Food Details |
| :---: | :---: | :---: |
| ![Home Page](https://via.placeholder.com/400x250?text=Customer+Home) | ![QR Menu](https://via.placeholder.com/400x250?text=QR+Menu) | ![Food Details](https://via.placeholder.com/400x250?text=Food+Details) |

| Cart & Special Notes | Checkout / Priority | Admin Dashboard |
| :---: | :---: | :---: |
| ![Cart](https://via.placeholder.com/400x250?text=Cart) | ![Checkout](https://via.placeholder.com/400x250?text=Checkout) | ![Admin Dashboard](https://via.placeholder.com/400x250?text=Admin+Dashboard) |

*Add your own screenshots inside the `/public/screenshots/` directory and update the links above.*

---

## ✨ Features

### 👤 Customer Experience
*   **QR-Based Dining**: Access menus instantly by scanning table-specific QR codes.
*   **Intuitive Menu Browser**: Filter by categories (Starters, Main Course, Desserts, Beverages) and search for specific items.
*   **Dish Profiles**: View detailed nutritional facts (calories, protein), spice levels, chef recommendations, and ingredients.
*   **Customizable Orders**: Add special cooking instructions/notes for the kitchen.
*   **Priority Tickets**: Choose order urgency (Normal, Rush, VIP) to communicate directly with the kitchen staff.
*   **Live Order Tracking**: Real-time status tracker (Sent ➜ Accepted ➜ Cooking ➜ Dispatched ➜ Served/Archived).
*   **Staff Alerts**: Call for table assistance with a single tap.

### 🍳 Kitchen Display System (KDS)
*   **Dedicated KDS Dashboard** (`/kds`): Completely separated from the customer view — kitchen-only interface.
*   **Kanban Ticket Board**: Orders flow across three columns — New Tickets → Preparing → Ready to Dispatch.
*   **Priority Badges**: VIP, Rush, and Normal urgency labels with distinct color coding.
*   **Interactive Dish Checklists**: Chefs tap individual items to mark them as prepped.
*   **Live Ticker Timers**: Each ticket displays how long it has been active.
*   **Audio Bell Alerts**: Web Audio API bell chimes on new order arrivals.
*   **Real-time Sync**: BroadcastChannel API syncs ticket state instantly across browser tabs.

### 💼 Restaurant Administration
*   **Interactive Control Panel**: Overview of orders, categories, active tables, and live revenue metrics.
*   **Live Order Dispatcher**: Auto-polls active kitchen tickets every 3 seconds with status-updating controls.
*   **Menu Manager**: Full CRUD (Create, Read, Update, Delete) capability for dishes, including toggle options for item availability.
*   **Table Layout Builder**: Create and configure seating capacities and custom labels.
*   **Staff Alert Resolver**: Real-time listing of active client alerts at tables to ensure prompt service.
*   **QR Code Generator**: Single and bulk table-bound QR code generation with download support.

### 🔐 Authentication & Security
*   **Role-Based Access Control**: Two roles — `ADMIN` (full dashboard) and `KITCHEN` (KDS only).
*   **JWT Sessions**: Secure, stateless session tokens signed with `AUTH_SECRET`.
*   **Edge Middleware Protection**: Next.js middleware intercepts every request to `/admin/*` and `/kds/*` — unauthenticated users are redirected to `/login` before any page loads.
*   **Credential Login**: bcrypt-hashed passwords stored in PostgreSQL, verified server-side.
*   **Role Enforcement**: Kitchen staff attempting to access `/admin` are silently redirected back to `/kds`.
*   **Glassmorphic Login Page**: Premium dark-themed login interface at `/login`.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js 15 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & CSS Variables |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Database** | PostgreSQL (hosted on [Neon](https://neon.tech/)) |
| **ORM** | [Prisma ORM](https://www.prisma.io/) |
| **API Architecture** | Next.js API Routes (Serverless) |
| **Authentication** | Auth.js (NextAuth v5) & bcryptjs |
| **QR Code Generation**| `qrcode` Node library |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Folder Structure

```
dineflow/
├── app/                      # Next.js App Router (Pages & APIs)
│   ├── admin/                # Admin Panel pages
│   │   ├── menu/             # Menu CRUD management interface
│   │   ├── orders/           # Live kitchen ticket dashboard
│   │   ├── qr/               # Table QR Code generation tool
│   │   └── tables/           # Seating & Tables layout page
│   ├── api/                  # Serverless API routes
│   │   ├── alerts/           # Staff Alert creation & resolution endpoints
│   │   ├── menu/             # Menu item data management APIs
│   │   ├── orders/           # Customer checkout and ticket management APIs
│   │   ├── qr/               # Base64 QR code image generator
│   │   ├── sessions/         # Table session lifecycle handlers
│   │   └── tables/           # Restaurant table settings APIs
│   ├── kds/                  # Dedicated Kitchen Display System dashboard page
│   ├── login/                # Staff dashboard login page
│   ├── r/                    # Dynamic restaurant table scanner entrypoint
│   │   └── [restaurant]/     # Redirect logic maps to main menu query params
│   ├── globals.css           # Global Tailwind CSS configurations
│   ├── layout.tsx            # HTML layout wrapper
│   └── page.tsx              # Core client menu browsing & checkout page
├── context/                  # State management
│   └── CartContext.tsx       # Global cart and order state context
├── data/                     # Static configurations
│   └── menu.ts               # Default seed/fallback menu definitions
├── lib/                      # Global configurations
│   └── db.ts                 # Database client (Prisma Client singleton)
├── prisma/                   # Database layer
│   ├── schema.prisma         # PostgreSQL data models & connections
│   └── seed.ts               # Local seeding scripts for users
├── public/                   # Static public assets (SVGs, icons)
├── auth.ts                   # Auth.js configuration handler
├── auth.config.ts            # Edge-runtime compatible Auth.js config
├── middleware.ts             # Route protection middleware
├── package.json              # Node packages and project scripts
└── tsconfig.json             # TypeScript configurations
```

---

## 🔌 Environment Variables

Create a `.env` file in the root directory and configure variables:

```env
# Neon / PostgreSQL database connection string
DATABASE_URL="postgresql://username:password@hostname:5432/dbname?sslmode=require"

# NextAuth secret used to encrypt session tokens (e.g. generate with openssl rand -base64 32)
AUTH_SECRET="your-32-character-secret-key-here"
```
> [!IMPORTANT]
> Never commit actual credentials or secrets to version control. Keep `.env` in your `.gitignore` list.

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PriyanshuKhandelwal22/DineFlow.git
   cd DineFlow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up database schemas**:
   Make sure `DATABASE_URL` is set in your `.env` file, then push the schema:
   ```bash
   npx prisma db push
   ```

4. **Seed the database**:
   Seed the default admin/kitchen staff user accounts:
   ```bash
   npx prisma db seed
   ```
   *Seeded credentials:*
   *   **Admin**: `admin@menuverse.com` / `admin123`
   *   **Kitchen**: `kitchen@menuverse.com` / `kitchen123`

5. **Start development server**:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) to view the application.*

---

## 📐 Architecture

```mermaid
graph TD
    subgraph Auth [Authentication Layer]
        Login[/login Page] -->|Credentials| AuthAPI[/api/auth NextAuth]
        AuthAPI -->|bcrypt verify| UserDB[(User Table)]
        AuthAPI -->|JWT Token| MW[Edge Middleware]
        MW -->|role=ADMIN| AdminFE
        MW -->|role=KITCHEN| KDSFE
        MW -->|unauthenticated| Login
    end

    subgraph Client [Customer View — No Auth Required]
        QR[Scan QR Code] -->|Redirects to| FE[Next.js Frontend /]
        FE -->|Submit Order| API_O[/api/orders]
        FE -->|Call Staff| API_A[/api/alerts]
    end

    subgraph Kitchen [Kitchen Display System]
        KDSFE[KDS Dashboard /kds] -->|Fetch tickets| API_O
        KDSFE -->|BroadcastChannel| FE
    end

    subgraph Admin [Admin Dashboard]
        AdminFE[Admin Portal /admin] -->|Manage Items| API_M[/api/menu]
        AdminFE -->|Configure Tables| API_T[/api/tables]
        AdminFE -->|Generate QR| API_Q[/api/qr]
        AdminFE -->|View Orders| API_O
    end

    subgraph Database [Storage Layer — Neon PostgreSQL]
        API_O --> PG[(PostgreSQL)]
        API_A --> PG
        API_M --> PG
        API_T --> PG
        UserDB --> PG
    end
```

---

## 🔄 Project Workflow

```mermaid
flowchart TD
    StaffLogin[Staff Scans Login Page /login] --> Auth{Role?}
    Auth -->|ADMIN| AdminDash[Admin Dashboard /admin]
    Auth -->|KITCHEN| KDSDash[KDS Dashboard /kds]

    Scan[Customer Scans QR Code] --> Browse[Browse Menu & Filter Categories]
    Browse --> Add[Add Items to Cart & Add Notes]
    Add --> SelectPriority[Select Urgency: Normal / Rush / VIP]
    SelectPriority --> Place[Place Order]
    Place --> KDSDash
    KDSDash --> Accept[Chef Accepts Ticket]
    Accept --> Cook[Chef Prepares & Checks Off Items]
    Cook --> Ready[Mark Ready to Dispatch]
    Ready --> Track[Customer Sees Status Update in Real-time]
```

---

## 🧠 What I Learned

*   **Next.js 15 Routing Patterns**: Using query parameters (`restaurant` & `table`) routed dynamically from a scan path to initialize context-persistent cart sessions.
*   **Prisma Relational Modeling**: Establishing relational constraints (`OrderItem` mapping to `Order` & `MenuItem`) to maintain data integrity when updates or deletions occur.
*   **State Hydration & Context**: Managing real-time cart counts and price aggregation across server and client boundary structures in Next.js.
*   **API Performance & UX**: Implementing non-blocking UI states, optimistically rendering orders, and setting up clean auto-polling intervals (3000ms) to sync active kitchen tickets without socket overhead.
*   **Data Integrity Protection**: Writing table models with "soft-disable" fields (`active: boolean`) to protect historic transaction records and active customer sessions.
*   **NextAuth v5 JWT Strategy**: Configuring Auth.js with a credentials provider, Edge-safe split config (`auth.config.ts` vs `auth.ts`), and JWT sessions — learning that `PrismaAdapter` conflicts with `strategy: "jwt"` and must be omitted.
*   **Next.js Edge Middleware**: Implementing role-based route protection at the edge layer using `req.auth` from NextAuth, ensuring protected pages never load before authentication is verified.
*   **SessionProvider Requirement**: Understanding that client-side `signOut()` from `next-auth/react` requires the `SessionProvider` wrapper in `layout.tsx` to communicate with the session cookie.

---

## ⚡ Challenges & Solutions

*   **Session Binding from QR**:
    *   *Challenge*: Ensuring customers scanning a QR code are locked to the correct table without manually typing it.
    *   *Solution*: Implemented custom redirect patterns in `app/r/[restaurant]/table/[table]/page.tsx` that encode inputs and pass them as persistent params to the client homepage to lock the session context.
*   **Cart Synchronization**:
    *   *Challenge*: Synchronizing state across multiple components (Menu Grid, Details modal, Cart Drawer) without code replication.
    *   *Solution*: Created a robust `CartContext` hook that centralizes active cart lists, price aggregations, tax details, and priority configurations.
*   **Active Table Tracking & Relational Deletes**:
    *   *Challenge*: Modifying or deleting menu items or table entries could crash existing client carts or historic order lookups.
    *   *Solution*: Added soft-disable flags for tables and structured Prisma cascades (`onDelete: Cascade` on order lines, distinct client relations) to ensure historic orders are preserved.
*   **Auth Middleware Redirect Loop**:
    *   *Challenge*: Every user — including admins — was being redirected to `/kds` instead of `/admin`, and the logout button was doing nothing.
    *   *Solution*: Identified three root causes: missing `AUTH_SECRET` in `.env` (JWT tokens couldn't be verified), `PrismaAdapter` conflicting with `strategy: "jwt"` (sessions couldn't be read), and missing `SessionProvider` in `layout.tsx` (client-side `signOut()` had no context to operate on). Fixed all three simultaneously.
*   **KDS Fetch Error Overlay on Logout**:
    *   *Challenge*: Clicking "Exit" on the KDS triggered a red error overlay from Next.js dev mode, blocking the logout redirect.
    *   *Solution*: The KDS's visibility change handler fired a `fetch()` call at the exact moment the session was being destroyed, causing an aborted network request. Switching from `console.error` to `console.warn` prevented Next.js from intercepting it as a fatal error.

---

## 🔮 Future Scope

*   **WebSocket / Supabase Realtime**: Replace the current BroadcastChannel (same-browser only) with true multi-device real-time sync for production kitchen environments.
*   **Online Payment Integration**: Connect gateways (Stripe, Razorpay, UPI) directly to the customer checkout flow.
*   **AI Smart Dish Recommendations**: Suggest complementary dishes (e.g. suggesting desserts or beverages based on selected starters).
*   **Admin User Management**: Add a `/admin/users` page to create, edit, and remove staff accounts without touching the database directly.
*   **Table Reservations**: Pre-book tables and pre-order food to reduce waiting time.
*   **Multi-Restaurant Tenancy**: Support multiple restaurants under isolated slugs with separate menus, tables, and order logs.
*   **Inventory & Stock Alerts**: Auto-disable menu items when stock thresholds run out.
*   **Loyalty Points & Offers**: Reward customers with points redeemable on future visits.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to fix bugs, feel free to open a Pull Request:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## ✍️ Author

**Priyanshu Khandelwal**
*   **GitHub**: [@PriyanshuKhandelwal22](https://github.com/PriyanshuKhandelwal22)
*   **LinkedIn**: [Priyanshu Khandelwal](https://www.linkedin.com/in/priyanshu-khandelwal/)
*   **Email**: [priyanshukhandelwal22@gmail.com](mailto:priyanshukhandelwal22@gmail.com)
