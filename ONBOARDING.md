# DineFlow (MenuVerse) Onboarding & Handover Guide
**Author**: Technical Lead / Senior Staff Engineer  
**Target Audience**: Devraj (Branch: `devraj`)  
**Document Classification**: Internal Engineering Onboarding  

Welcome to the **DineFlow** (MenuVerse) team, Devraj! This document is designed to get you fully oriented with the project codebase, system architecture, database models, development processes, and starting tasks. 

Please read this document carefully, complete the setup commands in Section 4, and check out your local `devraj` branch to begin.

---

## 1. PROJECT OVERVIEW

### 1.1 Project Name
**DineFlow** (commercially referred to as **MenuVerse**)

### 1.2 Problem Being Solved
Traditional dine-in ordering involves waiting for servers to bring paper menus, take order requests, and manually submit tickets to the kitchen. This introduces delays, errors during peak hours, slow tableside service, and billing ambiguities. 

### 1.3 Main Idea of the Project
A modern, self-service dining portal that enables guests to scan a table-specific QR code, instantly browse the menu on their mobile browsers, configure and place orders directly to the kitchen, and track preparation statuses in real time. 

Concurrently, the kitchen staff manages orders on a dedicated, highly responsive, high-contrast Kitchen Display System (KDS), and admins configure categories, menus, and table layouts from a management dashboard.

### 1.4 Target Users
1.  **Dine-In Customers**: Guests seated at physical tables browsing and ordering food.
2.  **Kitchen Chefs / Kitchen Staff**: Staff managing incoming ticket queues, preparation checklists, and dish dispatching.
3.  **Waiters / Floor Staff**: Service runners tracking ready dishes and responding to live table help alarms.
4.  **Restaurant Owners / Managers**: Administrators managing menu items, categories, pricing, table seating capacities, and viewing revenue performance.

### 1.5 Main Features
*   **Decoupled Customer View**: A responsive customer portal with category filters, searches, and item detail sheets.
*   **Dedicated KDS Dashboard (`/kds`)**: A Kanban-style screen with automated ticket timelines, priority colors (VIP/Rush), items check-offs, and Web Audio API audio bells.
*   **QR Generator Engine (`/admin/qr`)**: Generates single and bulk table-bound QR codes with redirect mapping URLs.
*   **Admin Panel (`/admin`)**: Operations portal containing Menu CRUD, Table seating configurations, and financial statistics reporting.
*   **Floor Help Alarms**: Simple diners-to-staff alert console permitting table assistance notifications.

### 1.6 Business Goal
*   Decrease customer wait time and increase table turnover rates by 15-20%.
*   Minimize ordering errors by enabling direct-to-kitchen digital submissions.
*   Optimize kitchen staffing overhead using centralized queue monitors.

### 1.7 Current Project Status
The customer-facing menu interface has been completely separated from the kitchen display views. The KDS now lives independently under the `/kds` route. Relational APIs, Prisma client hooks, and the Neon PostgreSQL database connections are fully configured and verified to build cleanly.

---

## 2. HIGH LEVEL ARCHITECTURE

DineFlow is designed as a serverless monorepo utilizing the Next.js App Router paradigm.

```mermaid
graph TD
    subgraph Clients [Client Layer]
        Diner[Customer Mobile Browser /] -->|1. Places Order / Pages Waiter| FE[Next.js Client App]
        KDS[KDS Dashboard /kds] -->|2. Event Sync & Actions| FE
        Admin[Admin Dashboard /admin] -->|3. Configuration CRUD| FE
    end

    subgraph Transport [Communication Protocol]
        FE -->|POST/GET/PATCH HTTP| API[Next.js API routes]
        FE <-->|Real-time Events| BC[HTML5 BroadcastChannel 'dineflow-kds']
    end

    subgraph Server [Compute Layer]
        API -->|Prisma Client| ORM[Prisma Client singleton]
    end

    subgraph Data [Storage Layer]
        ORM -->|Connection Pooler| Neon[(Neon Serverless PostgreSQL)]
    end
```

### 2.1 Technology Stack
*   **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Framer Motion (Kanban transitions), Lucide React (Icons).
*   **Styling**: Tailwind CSS v4 utilizing CSS variables for theme bindings.
*   **Backend**: Next.js Serverless Route Handlers (`app/api/*`).
*   **Database**: PostgreSQL hosted on **Neon**.
*   **ORM**: Prisma Client.
*   **QR Processing**: Node `qrcode` engine.
*   **Deployment**: Vercel.

### 2.2 Communication Protocol
*   **Data API**: Standard JSON REST APIs over HTTP.
*   **Real-time Syncer**: Tab-to-tab same-origin synchronization is powered by the **HTML5 `BroadcastChannel` API**. Placing a customer order or calling floor staff instantly triggers state refreshes and Web Audio bell playbacks in the KDS dashboard without database polling. This is designed to be easily swappable with WebSockets, Pusher, or Supabase Realtime for production deployment.

---

## 3. REPOSITORY STRUCTURE

```
dineflow/
├── app/                      # Next.js App Router (Pages & APIs)
│   ├── admin/                # Admin Management Sub-pages
│   │   ├── menu/             # Menu Item CRUD Interface
│   │   ├── orders/           # Financial reporting & historical logs
│   │   ├── qr/               # Table QR Code Generation tools
│   │   ├── tables/           # Table Seating Capacity editor
│   │   └── page.tsx          # Portal homepage redirecting to admin modules
│   ├── api/                  # Next.js Route Handlers (REST Endpoints)
│   │   ├── alerts/           # Help Alarm dispatcher
│   │   ├── menu/             # Dish CRUD API
│   │   ├── orders/           # Ticket creation and stage updates
│   │   ├── qr/               # QR Code image payload processor
│   │   ├── sessions/         # Guest Session management
│   │   └── tables/           # Physical seating configurations
│   ├── kds/                  # Kitchen Display System
│   │   ├── ActionButtons.tsx # Contextual task buttons
│   │   ├── EmptyState.tsx    # Idle dashboard screens
│   │   ├── KDSHeader.tsx     # Clock & statistics banner
│   │   ├── KitchenStats.tsx  # Metrics numbers dashboard
│   │   ├── OrderCard.tsx     # Single ticket layout with ticker
│   │   ├── OrderColumn.tsx   # Kanban column view
│   │   ├── OrderItems.tsx    # Interactive checklist
│   │   ├── StatusBadge.tsx   # Urgency tags
│   │   └── page.tsx          # Controller & Broadcast listener
│   ├── r/                    # Redirect routing logic
│   │   └── [restaurant]/     # Scans dynamic table QR urls and redirects
│   │       └── table/        # e.g., /r/demo/table/12 maps to / with params
│   │           └── [table]/
│   ├── globals.css           # Tailwind v4 globals
│   ├── layout.tsx            # Main viewport structure
│   └── page.tsx              # Customer Ordering App page
├── context/                  # Global State Managers
│   └── CartContext.tsx       # Tray quantity, price totals, and priorities
├── data/                     # Fallback Data
│   └── menu.ts               # Local static backup items
├── lib/                      # Reusable Utilities
│   └── db.ts                 # Prisma Client singleton definition
├── prisma/                   # DB Migrations and Schemas
│   ├── schema.prisma         # Models mapping (MenuItem, Order, OrderItem)
│   └── seed.ts               # Seeding script
├── package.json              # NPM manifest
├── tsconfig.json             # TypeScript compile setup
└── next.config.ts            # Next.js configurations
```

### 3.1 Code flow
1.  **Diner Scan**: Diner scans QR code mapping to `/r/demo/table/12`.
2.  **Redirect**: `r/[restaurant]/table/[table]/page.tsx` parses params and redirects to `/?restaurant=demo&table=12`.
3.  **Client Mount**: `app/page.tsx` mounts, stores context parameter inside `localStorage`, and updates `CartContext`.
4.  **Cart Assembly**: User appends items, sets notes, and clicks checkout.
5.  **Checkout POST**: Payload POSTs to `/api/orders` creating db records, and posts a event to the `BroadcastChannel`.
6.  **KDS Render**: The `/kds` tab receives the event, triggers `fetchOrders()`, plays the kitchen buzzer, and adds the ticket to the **New Tickets** column.

---

## 4. DEVELOPMENT ENVIRONMENT SETUP

### 4.1 Required Software
*   Node.js: **v20.x or higher** (LTS recommended)
*   NPM: **v10.x or higher**
*   Git

### 4.2 Installation Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/PriyanshuKhandelwal22/DineFlow.git
    cd DineFlow
    ```
2.  **Checkout your branch**:
    ```bash
    git checkout devraj
    ```
3.  **Install project dependencies**:
    ```bash
    npm install
    ```

### 4.3 Environment Configuration
Create a `.env` file in the root directory:
```env
# Neon Serverless PostgreSQL Database Connection String
DATABASE_URL="postgresql://username:password@hostname:5432/dbname?sslmode=require"
```
*(Ask your Technical Lead for dev database credentials, or configure a local PostgreSQL instance).*

### 4.4 Database Handshake & Seeding
Prepare the database tables and populate the default menu items:
```bash
# Push schemas to Neon DB
npx prisma db push

# Generate client typescript typings
npx prisma generate

# Run database seeds
npx prisma db seed
```

### 4.5 Execution Commands
*   **Start Local Dev Server**:
    *   **PowerShell Default**: Due to Script Execution Policies on Windows, run:
        ```powershell
        npm.cmd run dev
        ```
    *   **CMD/Bash**:
        ```bash
        npm run dev
        ```
*   **Compile Build (Verify TS and Next optimization)**:
    ```bash
    npm.cmd run build
    ```

### 4.6 Common Gotchas & Fixes
*   **PowerShell Security Policy Block**: If you receive `UnauthorizedAccess: Running scripts is disabled on this system`, execute commands explicitly targeting node wrappers (e.g. `npm.cmd` rather than `npm`).
*   **Prisma Client Out of Sync**: If you modify `prisma/schema.prisma`, always run `npx prisma db push` followed by `npx prisma generate` to rebuild TypeScript types.

---

## 5. WORKFLOW OF THE APPLICATION

Below is the life cycle of placing an order and completing it:

```
[Customer Tab]                               [PostgreSQL]                                 [KDS Tab]
      │                                           │                                           │
  Add to Cart ────────────────────────────────────┼───────────────────────────────────────────┤
      │                                           │                                           │
  Submit Order (POST /api/orders) ───────────────►│ Writes Order, OrderItems                  │
      │                                           │                                           │
  Broadcasts "NEW_ORDER" ─────────────────────────┼──────────────────────────────────────────►│
      │                                           │                                           │
      │                                           │ Fetch Orders (GET /api/orders) ◄──────────┤
      │                                           │                                           │
      │                                           │◄── Returns active tickets                 │
      │                                           │                                           │
      │                                           │                                       Chime Alert
      │                                           │                                           │
      │                                           │                                      Chef clicks "Accept"
      │                                           │                                           │
      │                                           │ Update Stage = 1 (PATCH /api/orders) ────►│
      │                                           │                                           │
      │                                           │◄── Returns updated ticket                 │
      │                                           │                                           │
      │                                           │                                       Moves card
```

1.  **Tray State**: Customer updates local cart inside `CartContext.tsx`.
2.  **API Post**: `POST /api/orders` is called.
3.  **Database Commit**: Prisma commits details to the PostgreSQL backend tables.
4.  **KDS Polling & Event**: KDS page receives event via `BroadcastChannel`, fetches state, and displays the card.
5.  **Card Checklist**: Chef marks individual checklist items. This performs PATCH updates to `/api/orders` changing `OrderItem.prepped: boolean`.
6.  **Card Stages**: Chef marks order state as Ready. This PATCHes `/api/orders` to `prepStage=3` (Dispatched).
7.  **Order Completion**: Diner UI polls and shows "Dispatched". Chef hits "Complete" archiving the ticket (`prepStage=4`).

---

## 6. DATABASE DESIGN

Prisma ORM is utilized over a relational PostgreSQL engine. 

### 6.1 Database Schema Diagram

```
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  TableSession    │          │      Order       │          │    OrderItem     │
├──────────────────┤          ├──────────────────┤          ├──────────────────┤
│ id (PK)          │◄─────────┤ sessionId (FK)   │◄─────────┤ id (PK)          │
│ restaurantSlug   │          │ id (PK)          │          │ orderId (FK)     │
│ tableNumber      │          │ tableNumber      │          │ menuItemId (FK)  │
│ active (boolean) │          │ grandTotal       │          │ quantity         │
└──────────────────┘          │ prepStage (Int)  │          │ prepped (boolean)│
                              │ priority (String)│          └──────────────────┘
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐          ┌──────────────────┐
                              │    StaffAlert    │          │     MenuItem     │
                              ├──────────────────┤          ├──────────────────┤
                              │ id (PK)          │          │ id (PK)          │
                              │ orderId (FK)     │          │ name             │
                              │ table            │          │ category         │
                              │ reason           │          │ price            │
                              │ resolved(boolean)│          │ available(bool)  │
                              └──────────────────┘          └──────────────────┘
```

### 6.2 Table Model Schema Breakdowns

*   **`MenuItem`**: Stores dishes metadata (calories, rating, description, prepTime, popular tags, availability status).
*   **`Order`**: Parent ticket records storing total payments, table number origins, special chef notes, and prep stages (0 = Sent, 1 = Accepted, 2 = Cooking, 3 = Dispatched, 4 = Archived).
*   **`OrderItem`**: Relational join mapping quantities of `MenuItem` inside a specific `Order`.
*   **`TableSession`**: Tracks active dining groups. A new session is initialized when a new client scans the QR code.
*   **`RestaurantTable`**: Setup helper detailing physical seating counts and active status indicators.
*   **`StaffAlert`**: Alarms log detailing floor service queries (e.g. table help calls).

### 6.3 Unique Constraints & Indexes
*   `RestaurantTable` holds a unique composite index `@@unique([restaurantSlug, tableNumber])` to prevent duplicate tables within the same restaurant slug.
*   `OrderItem` cascade deletes are bound to `Order` constraints: deleting an order cleanly cascades and clears matching order line entries.

---

## 7. API DOCUMENTATION

All REST endpoints are available under the `/api/` base prefix.

### 7.1 `/api/menu`
*   **`GET`**: Retrieve all menu items.
    *   *Query Parameters*: `includeUnavailable=true` (used by Admin views).
    *   *Response*: `Array<MenuItem>`
*   **`POST`**: Create a new menu item.
    *   *Auth Requirement*: Admin privileges (to be implemented).
    *   *Body*: `{ id, name, category, description, price, type, prepTime, image, ingredients }`
*   **`PATCH`**: Toggle availability or modify details.
    *   *Body*: `{ id, available, ...fields }`

### 7.2 `/api/orders`
*   **`GET`**: Retrieve active kitchen dashboard tickets.
    *   *Query Parameters*: `includeArchived=true` (returns `prepStage=4` records), `table`, `sessionId`.
    *   *Response*: `Array<KdsOrder>`
*   **`POST`**: Submit a tray checkout.
    *   *Body*: `{ restaurantSlug, tableNumber, sessionId, items: Array<{ id, quantity }>, notes, subtotal, gst, grandTotal, priority }`
*   **`PATCH`**: Modify order preparation stage.
    *   *Body Options*:
        1.  `{ orderId, prepStage }` (changes overall ticket status, 0-4).
        2.  `{ orderId, itemKey, prepped }` (checks off a single item on the ticket checklist).

### 7.3 `/api/alerts`
*   **`GET`**: Fetch all unresolved helper alarms.
    *   *Response*: `Array<{ id, table, reason, resolved, time }>`
*   **`POST`**: Diner pushes a call for help.
    *   *Body*: `{ table, reason }`
*   **`PATCH`**: Resolve an active floor alarm.
    *   *Body*: `{ alertId, resolved: true }`

### 7.4 `/api/tables`
*   **`GET`**: Fetch active tables configurations.
*   **`POST`**: Create a new seating layout card.
*   **`PATCH`**: Enable/soft-disable tables.

---

## 8. CODEBASE CONVENTIONS

*   **TypeScript**: Every database payload and routing prop must be explicitly typed. Do not bypass compilers with `any` types unless interacting with dynamic unstructured mock data imports.
*   **Routing Layouts**: Component splits must be strictly separated. No customer components should import files from `app/kds/*` and vice versa.
*   **Folder Organization**: Modular widgets belonging to specific screens must live inside sub-components folders under their respective pages (e.g. KDS widgets are nested in `app/kds/`).
*   **CSS Style Tokens**: DineFlow relies on Tailwind CSS v4 variables defined in `app/globals.css`. Standardize on theme classes (e.g. `bg-slate-900 border-slate-800 text-slate-100`) rather than ad-hoc custom RGB styling.
*   **Error Boundaries**: Route handlers must wrap Prisma promises in `try/catch` and return matching HTTP status codes (400 for bad parameters, 404 for missing resources, 500 for backend database failures).
*   **Optimistic UI Updates**: KDS action methods (e.g., ticking off item checklists or resolving alarms) must perform immediate local state updates before awaiting database API resolutions to ensure a highly responsive interface.

---

## 9. GIT WORKFLOW

Devraj, please adhere to our strict git procedures:

```
                  ┌──────────────────────┐
                  │    main (remote)     │
                  └──────────┬───────────┘
                             │
                      [git checkout -b devraj]
                             │
                             ▼
                  ┌──────────────────────┐
                  │    devraj (local)    │
                  └──────────┬───────────┘
                             │
                      [Make modifications]
                      [git commit -m "feat:..."]
                      [git push origin devraj]
                             │
                             ▼
                  ┌──────────────────────┐
                  │    devraj (remote)   │
                  └──────────┬───────────┘
                             │
                     [Open Pull Request]
                     [Build checks pass]
                     [Lead engineer review]
                             │
                             ▼
                  ┌──────────────────────┐
                  │    main (merged)     │
                  └──────────────────────┘
```

1.  **Branch Locking**: You are authorized to work directly on branch **`devraj`**. 
2.  **Commit Conventions**: Commit messages must be structured:
    *   `feat(kds): description` — New functionality.
    *   `fix(customer): description` — Bug fixes.
    *   `refactor(api): description` — Optimizing existing structures.
3.  **Merge Pipeline**:
    *   Push your changes to remote branch `devraj` (`git push origin devraj`).
    *   Open a Pull Request (PR) from `devraj` to `main`.
    *   A Lead Engineer will review and merge. Do not merge your own PRs directly to `main`.

---

## 10. COMPLETED FEATURES

*   **Separation of Customer & KDS Interfaces**: Fully complete.
*   **Kanban Prep columns**: Completed (`/kds`).
*   **Active duration tickers**: Completed.
*   **Menu and Categories CRUD**: Completed (`/admin/menu`).
*   **QR Generator Engine**: Completed (`/admin/qr` and `/api/qr`).
*   **Staff Alerts System**: Completed (`/api/alerts`).
*   **Composite indexes**: Configured in Prisma schema.

---

## 11. CURRENTLY IN PROGRESS FEATURES

*   **Realtime tab sync optimizations**: Enhancing browser local state performance during sudden high-concurrency ordering scenarios.
*   **Unified Admin Dashboard Styling**: Upgrading page styling under `/admin/` routes to match the high-contrast dark theme used in `/kds`.

---

## 12. PENDING FEATURES (FUTURE SCOPE)

*   **Integrated Payment Gateways**: Connect APIs (Stripe, UPI) to checkout triggers.
*   **AI Dish Recommendations**: Implement smart prompt recommendations based on item selections.
*   **Multi-Restaurant Tenancy**: Multi-restaurant support via dynamic admin sub-slug routing.
*   **Printer & KDS Hardware Integrations**: Connect ticket endpoints directly to thermal printers.

---

## 13. KNOWN BUGS AND TECHNICAL DEBT

*   **ESLint Configuration Warning**: During compilation checks, an ESLint warning displays: `nextVitals is not iterable`. This does not block the build execution, but the configuration needs adjustment.
*   **Single-Origin Sync Limit**: The current real-time synchronizer runs via `BroadcastChannel`, meaning real-time tab updates function only when they are run on the same browser/domain. True multi-device real-time sync will require updating `useRealtimeKDS` hooks to implement production WebSockets, SSE, or Pusher.

---

## 14. RECOMMENDED STARTING POINT FOR DEVRAJ

To start contributing, we recommend you follow these steps:

1.  **Read and Understand the Schema**: Open and review [prisma/schema.prisma](file:///c:/dineFlow/prisma/schema.prisma) to understand the relationship models.
2.  **Examine the KDS Controller**: Inspect [app/kds/page.tsx](file:///c:/dineFlow/app/kds/page.tsx) to see how columns and events are managed.
3.  **Suggested Beginner-Friendly Task**:
    *   *Task*: Fix the ESLint config warning `nextVitals is not iterable` within `eslint.config.mjs`.
    *   *Next Task*: Upgrade the admin pages (e.g. [app/admin/page.tsx](file:///c:/dineFlow/app/admin/page.tsx)) to use a dark Slate theme similar to the KDS dashboard.

---

## 15. IMPORTANT THINGS TO REMEMBER & GOTCHAS

*   **Do Not Use Hard Deletes on Tables or Menu Items**: Deleting physical tables or menus breaks active customer carts and historic revenue logs. Always toggle the `active` boolean flag on tables and the `available` flag on menu items (referred to as **soft-disabling**).
*   **Database Constraints**: The database requires a valid Neon PostgreSQL schema setup. Local offline testing requires a local PostgreSQL connection.
*   **Vercel Serverless Window**: API calls must finish within the standard serverless execution window (10-15 seconds). Keep route handlers free of heavy blocking compute code.

---

## 16. QUICK REFERENCE SECTION

### 16.1 Critical Commands
```bash
# Install packages
npm install

# Force schema push to DB
npx prisma db push

# Rebuild ORM typings
npx prisma generate

# Seeding fallback values
npx prisma db seed

# Run Dev Server (Windows PowerShell)
npm.cmd run dev

# Compile Build Validation
npm.cmd run build
```

### 16.2 Critical Files
*   [prisma/schema.prisma](file:///c:/dineFlow/prisma/schema.prisma) — Database layout schemas.
*   [context/CartContext.tsx](file:///c:/dineFlow/context/CartContext.tsx) — Cart and orders state manager.
*   [app/page.tsx](file:///c:/dineFlow/app/page.tsx) — Customer-facing page.
*   [app/kds/page.tsx](file:///c:/dineFlow/app/kds/page.tsx) — KDS dashboard page.

---

## 17. PROJECT MENTAL MODEL

To understand DineFlow in one sentence: **"It is an order transaction pipeline mapped from physical dining tables to kitchen displays."**

Imagine a customer seated at a table. The customer's mobile browser represents the **Producer** of transactions, appending items to their food tray and submitting them. The database receives this transaction queue. The Kitchen Display System (KDS) acts as the **Consumer**, visualizing the queue, dividing tickets into Kanban columns based on their preparation status, and providing interactive checklists for chefs to check off items as they cook them.

The system relies on database state persistence, but synchronizes tab views instantly via local browser event messaging. This keeps the codebase fast, light, and easy to maintain.

---

**Good luck, Devraj! Feel free to reach out to your Tech Lead if you have any questions.**
