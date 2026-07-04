-- CreateTable
CREATE TABLE "RestaurantTable" (
    "id" TEXT NOT NULL,
    "restaurantSlug" TEXT NOT NULL DEFAULT 'demo',
    "tableNumber" TEXT NOT NULL,
    "label" TEXT,
    "seats" INTEGER NOT NULL DEFAULT 2,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestaurantTable_restaurantSlug_idx" ON "RestaurantTable"("restaurantSlug");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantTable_restaurantSlug_tableNumber_key" ON "RestaurantTable"("restaurantSlug", "tableNumber");
