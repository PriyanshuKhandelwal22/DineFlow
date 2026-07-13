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

### 💼 Restaurant Administration
*   **Interactive Control Panel**: Overview of orders, categories, active tables, and live revenue metrics.
*   **Live Order Dispatcher**: Auto-polls active kitchen tickets every 3 seconds with status-updating controls.
*   **Menu Manager**: Full CRUD (Create, Read, Update, Delete) capability for dishes, including toggle options for item availability.
*   **Table Layout Builder**: Create and configure seating capacities and custom labels.
*   **Staff Alert Resolver**: Real-time listing of active client alerts at tables to ensure prompt service.

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
│   └── seed.ts               # Local seeding scripts for menus
├── public/                   # Static public assets (SVGs, icons)
├── package.json              # Node packages and project scripts
└── tsconfig.json             # TypeScript configurations
```

---

## 🔌 Environment Variables

Create a `.env` file in the root directory and configure the database link:

```env
# Neon / PostgreSQL database connection string
DATABASE_URL="postgresql://username:password@hostname:5432/dbname?sslmode=require"
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
   Seed the default menu and category structure:
   ```bash
   npx prisma db seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) to view the application.*

---

## 📐 Architecture

```mermaid
graph TD
    subgraph Client [Customer View]
        QR[1. Scan QR Code] -->|Redirects to| FE[2. Next.js Frontend]
        FE -->|Context| Cart[Cart & Active Session]
        FE -->|Submit Order| API_O[API Routes: /api/orders]
        FE -->|Call Staff| API_A[API Routes: /api/alerts]
    end

    subgraph Server [Backend App Router]
        API_O --> DB_O[Prisma Client]
        API_A --> DB_A[Prisma Client]
        API_M[API Routes: /api/menu] --> DB_M[Prisma Client]
        API_T[API Routes: /api/tables] --> DB_T[Prisma Client]
        API_Q[API Routes: /api/qr] --> QR_Lib[qrcode library]
    end

    subgraph Database [Storage Layer]
        DB_O --> PG[(PostgreSQL Database)]
        DB_A --> PG
        DB_M --> PG
        DB_T --> PG
    end

    subgraph Admin [Dashboard View]
        AdminFE[Admin Next.js Portal] -->|3. Sec Polling| API_O
        AdminFE -->|Update Order Status| API_O
        AdminFE -->|Manage Items| API_M
        AdminFE -->|Configure Tables| API_T
        AdminFE -->|Generate Code| API_Q
    end
```

---

## 🔄 Project Workflow

```mermaid
flowchart TD
    Scan[Scan Table QR Code] --> Browse[Browse Menu & Filter Categories]
    Browse --> Add[Add Items to Cart & Add Cooking Notes]
    Add --> SelectPriority[Select Ticket Urgency: Normal/Rush/VIP]
    SelectPriority --> Place[Place Order]
    Place --> AdminReceive[Admin Kitchen Dashboard Receives Ticket]
    AdminReceive --> UpdateStatus[Admin Updates Status: Sent ➜ Accepted ➜ Cooking ➜ Dispatched ➜ Served]
    UpdateStatus --> Track[Customer Tracks Status Real-time]
```

---

## 🧠 What I Learned

*   **Next.js 15 Routing Patterns**: Using query parameters (`restaurant` & `table`) routed dynamically from a scan path to initialize context-persistent cart sessions.
*   **Prisma Relational Modeling**: Establishing relational constraints (`OrderItem` mapping to `Order` & `MenuItem`) to maintain data integrity when updates or deletions occur.
*   **State Hydration & Context**: Managing real-time cart counts and price aggregation across server and client boundary structures in Next.js.
*   **API Performance & UX**: Implementing non-blocking UI states, optimistically rendering orders, and setting up clean auto-polling intervals (3000ms) to sync active kitchen tickets without socket overhead.
*   **Data Integrity Protection**: Writing table models with "soft-disable" fields (`active: boolean`) to protect historic transaction records and active customer sessions.

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

---

## 🔮 Future Scope

*   **AI Smart Dish Recommendations**: Suggest complementary dishes (e.g. suggesting desserts or beverages based on selected starters).
*   **Table Reservations**: Pre-book tables and pre-order food to reduce waiting time.
*   **Loyalty Points & Offers**: Reward customers with points redeemable on future visits.
*   **Integrated Payments**: Connect gateways (Stripe, Razorpay, UPI) directly to client checkout views.
*   **Multi-Lingual Menu**: Translate menu listings dynamically for international diners.
*   **Inventory & Stock Alerts**: Auto-disable menu items when stock thresholds run out.

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
